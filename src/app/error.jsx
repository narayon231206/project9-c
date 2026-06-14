'use client';

import Link from 'next/link';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function Error({ error, reset }) {
  return (
    <div className="flex-grow flex flex-col justify-center items-center py-20 px-4 text-center bg-slate-55 dark:bg-[#070b19] min-h-[70vh]">
      <div className="p-4 bg-red-100 dark:bg-red-950/30 text-red-650 dark:text-red-400 rounded-full shadow-md">
        <AlertCircle className="h-12 w-12" />
      </div>
      <h2 className="mt-6 text-2xl font-extrabold text-slate-900 dark:text-white">Something went wrong!</h2>
      <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-md">
        {error?.message || 'An unexpected error occurred while processing this page. Please try again or return home.'}
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => reset()}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-sm active:scale-95 transition-all"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Try again
        </button>
        <Link
          href="/"
          className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-6 py-2.5 rounded-xl font-semibold transition-all"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
