import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default', 
  status,
  className = '',
  ...props 
}) => {
  let resolvedVariant = variant;
  
  if (status !== undefined && status !== null) {
    const s = String(status).toLowerCase();
    if (['pending'].includes(s)) resolvedVariant = 'warning';
    else if (['processing'].includes(s)) resolvedVariant = 'info';
    else if (['shipped'].includes(s)) resolvedVariant = 'indigo';
    else if (['delivered', 'completed', 'active', '1', 'true'].includes(s)) resolvedVariant = 'success';
    else if (['cancelled', 'inactive', '0', 'false'].includes(s)) resolvedVariant = 'danger';
    else if (['low stock'].includes(s)) resolvedVariant = 'warning';
  }

  const baseStyles = "inline-flex items-center justify-center px-2.5 py-1 text-xs font-bold rounded-full border capitalize transition-colors";
  
  const variants = {
    default: "bg-[var(--bg-main)] text-[var(--text-secondary)] border-[var(--border-subtle)]",
    success: "bg-green-100 text-green-700 border-green-200",
    warning: "bg-amber-100 text-amber-700 border-amber-200",
    info: "bg-blue-100 text-blue-700 border-blue-200",
    indigo: "bg-indigo-100 text-indigo-700 border-indigo-200",
    danger: "bg-red-100 text-red-700 border-red-200",
  };

  const displayText = children !== undefined ? children : (
    status === 1 || status === true || status === '1' ? 'Active' :
    status === 0 || status === false || status === '0' ? 'Inactive' :
    status
  );

  return (
    <span className={`${baseStyles} ${variants[resolvedVariant] || variants.default} ${className}`} {...props}>
      {displayText}
    </span>
  );
};

export default Badge;
