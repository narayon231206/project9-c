const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is required for production builds');
}

if (!apiBaseUrl.startsWith('http://') && !apiBaseUrl.startsWith('https://')) {
  throw new Error('NEXT_PUBLIC_API_URL must be an absolute URL that includes the /api path');
}

const normalizedApiBaseUrl = apiBaseUrl.replace(/\/$/, '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: `${normalizedApiBaseUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
