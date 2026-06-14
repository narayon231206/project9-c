'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import Spinner from '@/components/Spinner';

const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 4 3.47 2.18 7.06L5.84 9.9C6.71 7.3 9.14 5.38 12 5.38z" />
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const { loginUser, googleLoginUser, isAuthenticated } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectUrl);
    }
  }, [isAuthenticated, redirectUrl, router]);

  const handleGoogleSignIn = async () => {
    try {
      setGoogleSubmitting(true);
      await googleLoginUser(redirectUrl);
    } finally {
      setGoogleSubmitting(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const res = await loginUser(data.email, data.password);
      if (res.success) {
        router.push(redirectUrl);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center py-20 px-4 bg-gradient-to-b from-white to-slate-50 dark:from-[#070b19] dark:to-[#0d1117] transition-colors duration-200 relative min-h-[85vh]">
      
      {/* Background glow mesh (only in dark mode) */}
      <div className="hidden dark:block absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/8 blur-3xl rounded-full pointer-events-none" />
      <div className="hidden dark:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/8 blur-3xl rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/60 rounded-2xl overflow-hidden shadow-xl dark:shadow-2xl dark:shadow-black/30 p-10 space-y-8 relative z-10 backdrop-blur-md">
        
        {/* Branding header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-3 group">
            <div className="relative flex items-center justify-center h-12 w-12  text-white transition-all duration-300">
              <img className="h-12 w-12" src="https://i.ibb.co.com/5XMPtPKC/346-removebg-preview.png" alt="MediQueue"/>
            </div>
            <span className="text-slate-900 dark:text-white font-black tracking-tight text-xl">
              Medi<span className="bg-gradient-to-r from-blue-600 to-sky-500 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">Queue</span>
            </span>
          </Link>
          {/* <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Welcome Back!</h2> */}
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            Sign in to book tutoring sessions and manage your learning journey.
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Email input field */}
          <div className="space-y-2">
            <label htmlFor="loginEmail" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
              <input
                id="loginEmail"
                type="email"
                placeholder="you@email.com"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:focus:ring-blue-500/40 transition-all font-semibold text-sm"
              />
            </div>
            {errors.email && (
              <span className="text-xs text-red-500 font-semibold block mt-1">{errors.email.message}</span>
            )}
          </div>

          {/* Password input field */}
          <div className="space-y-2">
            <label htmlFor="loginPassword" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest block">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
              <input
                id="loginPassword"
                type="password"
                placeholder="••••••••"
                {...register('password', { 
                  required: 'Password is required',
                })}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:focus:ring-blue-500/40 transition-all font-semibold text-sm"
              />
            </div>
            {errors.password && (
              <span className="text-xs text-red-500 font-semibold block mt-1">{errors.password.message}</span>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-500/20 active:scale-95 transition-all text-sm uppercase tracking-wider flex items-center justify-center"
          >
            {submitting ? (
              <Spinner size="small" />
            ) : (
              <>
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider line */}
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
          <span className="flex-shrink mx-4 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">Or Continue With</span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleSubmitting}
          className="w-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-70 text-slate-700 dark:text-slate-300 font-bold py-3.5 rounded-2xl transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 shadow-sm"
        >
          <GoogleIcon />
          {googleSubmitting ? <Spinner size="small" /> : 'Continue with Google'}
        </button>

        {/* Link to Register */}
        <p className="text-center text-xs text-slate-600 dark:text-slate-400 font-semibold ">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-600 dark:text-sky-400 hover:underline">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}
