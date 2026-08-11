import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[var(--color-primary-600)] text-white hover:bg-[var(--color-primary-700)] focus:ring-[var(--color-primary-500)]",
    secondary: "bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-strong)] hover:bg-[var(--bg-main)] focus:ring-[var(--color-primary-500)]",
    outline: "border border-[var(--color-primary-600)] text-[var(--color-primary-600)] hover:bg-[var(--color-primary-50)] focus:ring-[var(--color-primary-500)]",
    ghost: "text-[var(--text-secondary)] hover:bg-[var(--bg-main)] hover:text-[var(--text-primary)] focus:ring-[var(--border-strong)]",
    danger: "bg-[var(--status-error)] text-white hover:bg-red-600 focus:ring-red-500",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
