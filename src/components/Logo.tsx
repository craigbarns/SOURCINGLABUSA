'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
  compactOnMobile?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showBadge = true,
  compactOnMobile = false,
}) => {
  const iconSizeClass = {
    sm: 'h-8 w-8 rounded-[10px]',
    md: 'h-9 w-9 rounded-xl',
    lg: 'h-11 w-11 rounded-[14px]',
  }[size];

  const textSizeClass = {
    sm: 'text-[15px]',
    md: 'text-[17px]',
    lg: 'text-xl',
  }[size];

  return (
    <div className="group flex select-none items-center gap-2.5">
      <div
        className={`${iconSizeClass} relative grid shrink-0 place-items-center overflow-hidden border border-white/10 bg-[#151d19] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-transform duration-200 group-hover:-rotate-3`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(199,255,107,0.25),transparent_55%)]" />
        <svg viewBox="0 0 32 32" className="relative h-6 w-6" fill="none">
          <path
            d="M7.2 9.1 16 4l8.8 5.1v10.2L16 24.4l-8.8-5.1V9.1Z"
            stroke="#C7FF6B"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="m7.2 9.1 8.8 5.1 8.8-5.1M16 14.2v10.2"
            stroke="#70E1B2"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M10.5 24.6 16 27.8l5.5-3.2"
            stroke="#7E9CFF"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`${textSizeClass} font-extrabold tracking-[-0.035em] text-[#F4F8F5]`}>
            SourcingLab
          </span>
          {showBadge && (
            <span
              className={`rounded-md border border-[#c7ff6b]/20 bg-[#c7ff6b]/8 px-1.5 py-1 text-[8px] font-black tracking-[0.16em] text-[#dfffab] ${
                compactOnMobile ? 'hidden min-[400px]:inline-flex' : ''
              }`}
            >
              USA
            </span>
          )}
        </div>
        <p
          className={`mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#7d8b83] ${
            compactOnMobile ? 'hidden min-[480px]:block' : ''
          }`}
        >
          Custom supply
        </p>
      </div>
    </div>
  );
};
