import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';
import { decodeProtectedHeader, importJWK, jwtVerify } from 'jose';

// Better Auth needs MongoDB connection - get from environment
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'mediqueue';

if (!uri) {
  throw new Error('MONGODB_URI environment variable is required for Better Auth');
}

// Reuse MongoDB connection across Next.js rebuilds
const globalForMongo = globalThis;

if (!globalForMongo.__medicqueueMongoClient) {
  globalForMongo.__medicqueueMongoClient = new MongoClient(uri, {
    maxPoolSize: 10,
    minPoolSize: 2,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 10000,
    tls: true,
    tlsAllowInvalidCertificates: false,
    tlsAllowInvalidHostnames: false,
    retryWrites: true,
    retryReads: true,
    family: 4,
  });
}

const client = globalForMongo.__medicqueueMongoClient;
const db = client.db(dbName);

const googleKeysCache = {
  expiresAt: 0,
  keys: [],
};

const getGooglePublicKey = async (kid) => {
  const now = Date.now();

  if (!googleKeysCache.keys.length || googleKeysCache.expiresAt <= now) {
    const response = await fetch('https://www.googleapis.com/oauth2/v3/certs', {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Google certs request failed with ${response.status}`);
    }

    const cacheControl = response.headers.get('cache-control') || '';
    const maxAgeMatch = cacheControl.match(/max-age=(\d+)/);
    const maxAge = maxAgeMatch ? Number(maxAgeMatch[1]) : 3600;
    const data = await response.json();

    googleKeysCache.keys = data.keys || [];
    googleKeysCache.expiresAt = now + maxAge * 1000;
  }

  const jwk = googleKeysCache.keys.find((key) => key.kid === kid);

  if (!jwk) {
    googleKeysCache.expiresAt = 0;
    throw new Error('Matching Google signing key was not found');
  }

  return importJWK(jwk, jwk.alg);
};

const verifyGoogleIdToken = async (token, nonce) => {
  try {
    const { kid, alg } = decodeProtectedHeader(token);

    if (!kid || !alg) {
      throw new Error('Google token header is missing kid or alg');
    }

    const publicKey = await getGooglePublicKey(kid);

    const { payload } = await jwtVerify(token, publicKey, {
      algorithms: [alg],
      issuer: ['https://accounts.google.com', 'accounts.google.com'],
      audience: process.env.GOOGLE_CLIENT_ID,
      maxTokenAge: '1h',
    });

    if (nonce && payload.nonce !== nonce) {
      throw new Error('Google token nonce mismatch');
    }

    if (!payload.email || payload.email_verified !== true) {
      throw new Error('Google token email is missing or unverified');
    }

    return true;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`Google ID token verification failed: ${error.message}`);
    }

    return false;
  }
};

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
    usePlural: false,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [
    process.env.BETTER_AUTH_URL,
    process.env.NEXT_PUBLIC_APP_URL,
    process.env.CLIENT_URL,
  ].filter(Boolean),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: 'user',
  },
  session: {
    modelName: 'session',
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  account: {
    modelName: 'account',
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      verifyIdToken: verifyGoogleIdToken,
    },
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === 'production',
    defaultCookieAttributes: {
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    },
  },
});
