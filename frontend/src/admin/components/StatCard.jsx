import React from 'react';

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm rounded-2xl p-6 flex flex-col justify-between h-full transition-all hover:shadow-md hover:border-[var(--color-primary-200)]">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider">{title}</h3>
      {Icon && (
        <div className="p-2.5 bg-[var(--color-primary-50)] text-[var(--color-primary-600)] rounded-lg">
          <Icon size={20} strokeWidth={2.5} />
        </div>
      )}
    </div>

    <div>
      <p className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">{value}</p>
      {trend && (
        <p className={`text-sm mt-2 font-medium ${trend > 0 ? 'text-[var(--status-success)]' : 'text-[var(--status-error)]'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
        </p>
      )}
    </div>
  </div>
);

export default StatCard;
