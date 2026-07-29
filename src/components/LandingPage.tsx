'use client';

import { useState } from 'react';

import { DemoVideo } from '@/components/DemoVideo';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import { PricingSection } from '@/components/PricingSection';
import { WaitlistSection } from '@/components/WaitlistSection';

const APP_ENTRY_PATH = '/app';

export function LandingPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const handleScrollToWaitlist = () => {
    document
      .getElementById('waitlist')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08090d]">
      <Navbar area="marketing" />

      <main className="flex-1">
        <Hero
          appHref={APP_ENTRY_PATH}
          onScrollToWaitlist={handleScrollToWaitlist}
          onOpenDemo={() => setIsDemoOpen(true)}
        />

        <WaitlistSection />

        <PricingSection onSelectPlan={handleScrollToWaitlist} />

        <Footer
          appHref={APP_ENTRY_PATH}
          onScrollToWaitlist={handleScrollToWaitlist}
        />
      </main>

      <DemoVideo
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        appHref={APP_ENTRY_PATH}
      />
    </div>
  );
}
