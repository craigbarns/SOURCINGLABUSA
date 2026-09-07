'use client';

import { trackCtaClick } from '@/lib/analytics';

interface CtaLinkProps {
  href: string;
  /** Where the call to action sits, reported with the click event. */
  location: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Anchor that reports its click to analytics. Same-page anchors stay plain
 * anchors so the browser handles the hash and the back button natively.
 */
export function CtaLink({ href, location, label, className, children }: CtaLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => trackCtaClick(location, label)}
    >
      {children}
    </a>
  );
}
