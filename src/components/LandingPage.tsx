import { EditorialFooter } from '@/components/EditorialFooter';
import { Hero } from '@/components/Hero';
import { MarketingSections } from '@/components/MarketingSections';
import { Navbar } from '@/components/Navbar';

export function LandingPage({ locale = 'en' }: { locale?: 'en' | 'es' }) {
  return (
    <div
      className="editorial-shell flex min-h-screen flex-col"
      lang={locale === 'es' ? 'es-US' : 'en-US'}
    >
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-lg bg-[#dce7bd] px-4 py-2 font-bold text-[#243a2f] focus:fixed focus:left-4 focus:top-4 focus:not-sr-only"
      >
        {locale === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>
      <Navbar area="marketing" appearance="light" />
      <main id="main-content" className="flex-1">
        <Hero locale={locale} />
        <MarketingSections locale={locale} />
      </main>
      <EditorialFooter locale={locale} />
    </div>
  );
}
