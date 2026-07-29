import { Footer } from '@/components/Footer';
import { HeroExperience } from '@/components/HeroExperience';
import { MarketingSections } from '@/components/MarketingSections';
import { Navbar } from '@/components/Navbar';
import { PricingSection } from '@/components/PricingSection';
import { WaitlistSection } from '@/components/WaitlistSection';

const APP_ENTRY_PATH = '/app';

export function LandingPage() {
  return (
    <div className="marketing-shell flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-lg bg-[#c7ff6b] px-4 py-2 font-bold text-[#0a0d0b] focus:fixed focus:left-4 focus:top-4 focus:not-sr-only"
      >
        Skip to content
      </a>
      <Navbar area="marketing" />

      <main id="main-content" className="flex-1">
        <HeroExperience appHref={APP_ENTRY_PATH} />

        <MarketingSections />

        <PricingSection appHref={APP_ENTRY_PATH} />

        <WaitlistSection />
      </main>

      <Footer appHref={APP_ENTRY_PATH} />
    </div>
  );
}
