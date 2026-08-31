import { Footer } from '@/components/Footer';
import { HeroExperienceES } from './HeroExperienceES';
import { MarketingSectionsES } from './MarketingSectionsES';
import { Navbar } from '@/components/Navbar';

export function LandingPageES() {
  return (
    <div className="marketing-shell flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-lg bg-[#c7ff6b] px-4 py-2 font-bold text-[#0a0d0b] focus:fixed focus:left-4 focus:top-4 focus:not-sr-only"
      >
        Saltar al contenido
      </a>
      <Navbar area="marketing" />

      <main id="main-content" className="flex-1">
        <HeroExperienceES />
        <MarketingSectionsES />
      </main>

      <Footer />
    </div>
  );
}
