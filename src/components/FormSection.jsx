'use client';

import React from 'react';

export default function FormSection({ title, description, icon: Icon, children, className = '' }) {
  return (
    <div className={`rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 space-y-4 ${className}`}>
      {(title || Icon) && (
        <div className="flex items-start gap-3">
          {Icon && (
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5">
              <Icon className="h-5 w-5" />
            </div>
          )}
          <div className="min-w-0">
            {title && (
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                {description}
              </p>
            )}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}
