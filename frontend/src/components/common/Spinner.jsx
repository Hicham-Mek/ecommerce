import React from "react";

const Spinner = ({ size = "md", className = "" }) => {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4"
  };

  return (
    <div className={`flex justify-center items-center py-10 ${className}`}>
      <div 
        className={`${sizes[size]} border-[var(--border-subtle)] border-t-[var(--color-primary-600)] rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Spinner;
