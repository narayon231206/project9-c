'use client';

import React from 'react';

const Spinner = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: {
      wrap: 'h-5 w-5',
      ring: 'border-2',
      dot: 'h-1.5 w-1.5',
    },
    medium: {
      wrap: 'h-10 w-10',
      ring: 'border-[3px]',
      dot: 'h-2.5 w-2.5',
    },
    large: {
      wrap: 'h-16 w-16',
      ring: 'border-4',
      dot: 'h-3.5 w-3.5',
    },
  };
  const currentSize = sizeClasses[size] || sizeClasses.medium;

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`relative ${currentSize.wrap}`}
        role="status"
        aria-label="Loading"
      >
        <div className={`absolute inset-0 rounded-full ${currentSize.ring} border-slate-200 dark:border-slate-800`} />
        <div className={`absolute inset-0 animate-spin rounded-full ${currentSize.ring} border-transparent border-t-blue-600 border-r-blue-600/70 dark:border-t-sky-400 dark:border-r-sky-400/70`} />
        <div className={`absolute left-1/2 top-1/2 ${currentSize.dot} -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-blue-600/80 shadow-[0_0_18px_rgba(37,99,235,0.45)] dark:bg-sky-400/90 dark:shadow-[0_0_18px_rgba(56,189,248,0.45)]`} />
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
};

export default Spinner;
