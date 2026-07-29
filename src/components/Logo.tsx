'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showBadge = true }) => {
  const iconSizeClass = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl',
  }[size];

  const textSizeClass = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl sm:text-3xl',
  }[size];

  return (
    <div className="flex items-center gap-3 select-none group">
      {/* Emblem Frame with Glassmorphism & Neon Glow */}
      <div className={`relative ${iconSizeClass} bg-gradient-to-tr from-blue-600 via-indigo-500 to-emerald-400 p-[1.5px] shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 group-hover:scale-105 transition-all duration-300`}>
        <div className="w-full h-full bg-slate-950 rounded-[inherit] flex items-center justify-center overflow-hidden relative">
          {/* Hexagonal Isometric Vector Sourcing Emblem */}
          <svg
            viewBox="0 0 40 40"
            className="w-3/4 h-3/4 text-blue-400 group-hover:scale-110 transition-transform duration-300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 4L34 12V28L20 36L6 28V12L20 4Z"
              stroke="url(#blue_emerald_grad)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M20 4V20M34 12L20 20M6 12L20 20"
              stroke="url(#blue_emerald_grad)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="20" cy="20" r="3" fill="#10b981" />
            <defs>
              <linearGradient id="blue_emerald_grad" x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#60A5FA" />
                <stop offset="0.5" stopColor="#3B82F6" />
                <stop offset="1" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Brand Typography */}
      <div>
        <div className="flex items-center gap-1.5">
          <span className={`${textSizeClass} font-black tracking-tight text-white font-mono`}>
            SOURCING<span className="text-blue-500">LAB</span>
          </span>
          {showBadge && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-extrabold border border-emerald-500/30 uppercase tracking-widest shadow-sm">
              USA
            </span>
          )}
        </div>
        <p className="text-[10px] text-gray-400 -mt-1 tracking-wider uppercase font-semibold flex items-center gap-1">
          <span>AI Sourcing Copilot</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </p>
      </div>
    </div>
  );
};
