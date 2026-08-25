import React from 'react';

export interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isOnline?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', isOnline }) => {
  const dimensions = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-2xl',
  };

  const initials = name.slice(0, 2).toUpperCase();

  return (
    <div className="relative inline-block">
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${dimensions[size]} rounded-full object-cover ring-2 ring-indigo-500/40`}
        />
      ) : (
        <div
          className={`${dimensions[size]} rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-white shadow-md ring-2 ring-indigo-500/40`}
        >
          {initials}
        </div>
      )}

      {isOnline !== undefined && (
        <span
          className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
            isOnline ? 'bg-emerald-500' : 'bg-slate-500'
          }`}
        />
      )}
    </div>
  );
};
