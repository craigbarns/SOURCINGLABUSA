'use client';

import { useState } from 'react';

import { DemoVideo } from '@/components/DemoVideo';
import { Hero } from '@/components/Hero';

interface HeroExperienceProps {
  appHref: string;
}

export function HeroExperience({ appHref }: HeroExperienceProps) {
  const [isSampleOpen, setIsSampleOpen] = useState(false);

  return (
    <>
      <Hero appHref={appHref} onOpenDemo={() => setIsSampleOpen(true)} />
      <DemoVideo
        isOpen={isSampleOpen}
        onClose={() => setIsSampleOpen(false)}
        appHref={appHref}
      />
    </>
  );
}
