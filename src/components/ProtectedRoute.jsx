'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Spinner from './Spinner';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    // Once auth loading completes, redirect to login if unauthenticated
    if (!loading && !isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, loading, pathname, router]);

  // 1. Show dynamic spinner during auth session lookup
  if (loading) {
    return (
      <div className="flex-grow flex flex-col justify-center items-center py-20 bg-slate-50 dark:bg-slate-950">
        <Spinner size="large" />
        <p className="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-400">Verifying booking session...</p>
      </div>
    );
  }

  // 2. Return null to avoid flash of content before redirect completes
  if (!isAuthenticated) {
    return null;
  }

  // 3. Render children once authenticated successfully
  return <>{children}</>;
};

export default ProtectedRoute;
