'use client';

import React from 'react';
import Link from 'next/link';
import { HelpCircle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-grow flex flex-col justify-center items-center py-20 px-4 text-center bg-slate-55 dark:bg-[#070b19] min-h-[70vh]">
      <div className="p-4 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 rounded-full shadow-inner">
        <HelpCircle className="h-16 w-16 text-blue-600 dark:text-sky-400 animate-bounce" />
      </div>
      <span className="mt-6 text-blue-600 dark:text-sky-400 font-extrabold text-sm uppercase tracking-widest">Error 404</span>
      <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">Page Not Found</h2>
      <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-md">
        The sports court or booking details page you are searching for does not exist or has been relocated by the host.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-sm active:scale-95 transition-all"
        >
          <ArrowLeft className="h-4.5 w-4.5 mr-2" />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
