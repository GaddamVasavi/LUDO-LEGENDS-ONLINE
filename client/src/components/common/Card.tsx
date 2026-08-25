import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverEffect = true }) => {
  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-lg ${
        hoverEffect ? 'hover:border-indigo-500/50 hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-200 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
