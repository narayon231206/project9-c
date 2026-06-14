'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Lock, Link as LinkIcon, ArrowRight, Activity } from 'lucide-react';
import Spinner from '@/components/Spinner';

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser, isAuthenticated } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Watch password to validate rules cleanly on-the-fly
  const passwordValue = watch('password', '');

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const res = await registerUser(data.name, data.email, data.photoURL, data.password);
      if (res.success) {
        // Redirect to Login on success
        router.push('/login');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center py-20 px-4 bg-gradient-to-b from-white to-slate-50 dark:from-[#070b19] dark:to-[#0d1117] transition-colors duration-200 relative min-h-screen">
      
      {/* Background glow mesh (only in dark mode) */}
      <div className="hidden dark:block absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/8 blur-3xl rounded-full pointer-events-none" />
      <div className="hidden dark:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/8 blur-3xl rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/60 rounded-2xl overflow-hidden shadow-xl dark:shadow-2xl dark:shadow-black/30 p-10 space-y-8 relative z-10 backdrop-blur-md">
        
        {/* Branding header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-3 group">
            <div className="relative flex items-center justify-center h-12 w-12  text-white transition-all duration-300">
              <img className="h-12 w-12" src="https://i.ibb.co.com/5XMPtPKC/346-removebg-preview.png" alt="MediQueue"/>
            </div>
            <span className="text-slate-900 dark:text-white font-black tracking-tight text-xl">
              Medi<span className="bg-gradient-to-r from-blue-600 to-sky-500 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">Queue</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Create Your Account</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            Join thousands of learners and start your educational journey today.
          </p>
        </div>

        {/* Register form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Full Name input */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest block">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
              <input
                id="fullName"
                type="text"
                placeholder="John Doe"
                {...register('name', { required: 'Full name is required' })}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:focus:ring-blue-500/40 transition-all font-semibold text-sm"
              />
            </div>
            {errors.name && (
              <span className="text-xs text-red-500 font-semibold block mt-1">{errors.name.message}</span>
            )}
          </div>

          {/* Email address input */}
          <div className="space-y-2">
            <label htmlFor="regEmail" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
              <input
                id="regEmail"
                type="email"
                placeholder="you@example.com"
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

          {/* Photo URL input */}
          <div className="space-y-2">
            <label htmlFor="photoURL" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest block">
              Profile Photo URL <span className="text-[10px] text-slate-500 dark:text-slate-500 lowercase font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
              <input
                id="photoURL"
                type="url"
                placeholder="https://example.com/image.jpg"
                {...register('photoURL')}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:focus:ring-blue-500/40 transition-all font-semibold text-sm"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-2">
            <label htmlFor="regPassword" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest block">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
              <input
                id="regPassword"
                type="password"
                placeholder="••••••••"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                  validate: {
                    hasUppercase: (v) => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter',
                    hasLowercase: (v) => /[a-z]/.test(v) || 'Password must contain at least one lowercase letter',
                  }
                })}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-bold text-xs camelCase tracking-wider"
              />
            </div>
            {errors.password && (
              <span className="text-[10px] text-red-500 font-bold block mt-1">{errors.password.message}</span>
            )}
          </div>

          {/* Real-time Password Rules indicators */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl space-y-2 border border-slate-100 dark:border-slate-900/60">
            <p className="text-[9px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">Password Requirements</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="flex items-center space-x-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${passwordValue.length >= 6 ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`} />
                <span className={`text-[10px] font-semibold ${passwordValue.length >= 6 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>6+ Chars</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${/[A-Z]/.test(passwordValue) ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`} />
                <span className={`text-[10px] font-semibold ${/[A-Z]/.test(passwordValue) ? 'text-emerald-650 dark:text-emerald-400' : 'text-slate-500'}`}>1 Uppercase</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${/[a-z]/.test(passwordValue) ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`} />
                <span className={`text-[10px] font-semibold ${/[a-z]/.test(passwordValue) ? 'text-emerald-650 dark:text-emerald-400' : 'text-slate-500'}`}>1 Lowercase</span>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 rounded-2xl shadow-sm active:scale-95 transition-all text-xs uppercase tracking-widest flex items-center justify-center"
          >
            {submitting ? (
              <Spinner size="small" />
            ) : (
              <>
                Register Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Link back to Login */}
        <p className="text-center text-xs text-slate-600 dark:text-slate-400 font-semibold">
          Already have a player account?{' '}
          <Link href="/login" className="text-blue-600 dark:text-sky-400 hover:underline">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}
