import React from "react";

const EmptyState = ({ title, description, icon: Icon, action }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] shadow-sm">
    {Icon && (
      <div className="w-16 h-16 mb-4 rounded-full bg-[var(--bg-main)] flex items-center justify-center text-[var(--text-muted)]">
        <Icon size={32} />
      </div>
    )}
    <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">{title}</h3>
    {description && (
      <p className="text-[var(--text-secondary)] max-w-sm mx-auto mb-6">
        {description}
      </p>
    )}
    {action && <div>{action}</div>}
  </div>
);

export default EmptyState;
