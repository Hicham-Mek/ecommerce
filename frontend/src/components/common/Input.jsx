import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  error, 
  className = '', 
  id,
  ...props 
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-[var(--text-secondary)] mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className={`w-full px-4 py-2 bg-[var(--bg-surface)] border rounded-md text-[var(--text-primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:bg-[var(--bg-main)] ${
          error 
            ? 'border-[var(--status-error)] focus:border-[var(--status-error)] focus:ring-[var(--status-error)]' 
            : 'border-[var(--border-strong)] focus:border-[var(--border-focus)] focus:ring-[var(--border-focus)]'
        }`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-[var(--status-error)]">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
