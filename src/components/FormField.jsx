'use client';

import React from 'react';

export default function FormField({ label, error, icon: Icon, required, children, helperText }) {
  const childrenArray = React.Children.toArray(children);
  const isSingleChild = childrenArray.length === 1 && React.isValidElement(childrenArray[0]);
  const child = isSingleChild ? childrenArray[0] : null;
  
  const baseInputClasses = "w-full rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white border transition-all text-sm focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const paddingClasses = Icon ? "pl-10 pr-4 py-2.5" : "px-4 py-2.5";
  
  const stateClasses = error 
    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/30 dark:focus:ring-red-500/20" 
    : "border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 dark:focus:ring-blue-500/10";

  let renderedChild = children;

  if (child) {
    renderedChild = React.cloneElement(child, { 
      className: `${baseInputClasses} ${paddingClasses} ${stateClasses} ${child.props.className || ''}`.trim()
    });
  }

  return (
    <div className="space-y-1.5 w-full text-left">
      {label && (
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            <Icon className={`h-4 w-4 transition-colors ${error ? 'text-red-400 dark:text-red-500' : 'text-slate-400 dark:text-slate-500'}`} />
          </div>
        )}
        {renderedChild}
      </div>
      {error && (
        <span className="text-xs text-red-600 dark:text-red-400 font-medium block mt-1">
          {error.message || `${label || 'Field'} is required`}
        </span>
      )}
      {!error && helperText && (
        <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1">
          {helperText}
        </span>
      )}
    </div>
  );
}
