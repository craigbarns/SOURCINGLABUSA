'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { DemoVideo } from '@/components/DemoVideo';
import { WaitlistSection } from '@/components/WaitlistSection';
import { PricingSection } from '@/components/PricingSection';
import { AppDashboard } from '@/components/AppDashboard';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'landing' | 'app'>('landing');
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const handleScrollToWaitlist = () => {
    setActiveTab('landing');
    setTimeout(() => {
      const el = document.getElementById('waitlist');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08090d]">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === 'landing' ? (
        <main className="flex-1">
          <Hero
            onLaunchApp={() => setActiveTab('app')}
            onScrollToWaitlist={handleScrollToWaitlist}
            onOpenDemo={() => setIsDemoOpen(true)}
          />

          <WaitlistSection />

          <PricingSection
            onSelectPlan={() => {
              handleScrollToWaitlist();
            }}
          />

          <Footer
            onLaunchApp={() => setActiveTab('app')}
            onScrollToWaitlist={handleScrollToWaitlist}
          />
        </main>
      ) : (
        <AppDashboard onBackToLanding={() => setActiveTab('landing')} />
      )}

      {/* Modals */}
      <DemoVideo
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onLaunchApp={() => setActiveTab('app')}
      />
    </div>
  );
}
