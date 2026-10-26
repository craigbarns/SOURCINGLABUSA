import { EditorialFooter } from '@/components/EditorialFooter';
import Image from 'next/image';
import { Hero } from '@/components/Hero';
import { MarketingSections } from '@/components/MarketingSections';
import { Navbar } from '@/components/Navbar';
import { StickyMobileCta } from '@/components/StickyMobileCta';

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
      <Navbar
        area="marketing"
        appearance="light"
        locale={locale}
        contactHref={locale === 'es' ? '/es#contact' : '#contact'}
      />
      <main id="main-content" className="flex-1">
        <Hero locale={locale} />
        <section className="editorial-section" aria-label="Inside a partner factory">
          <div className="editorial-container">
            <figure className="m-0">
              <Image
                src="/images/pages/home-hero.webp"
                alt="Illustrative photo: inside a partner factory in China, rigid boxes produced and stacked on steel racks"
                width={1600}
                height={900}
                priority
                fetchPriority="high"
                sizes="100vw"
                className="w-full h-auto rounded-lg"
              />
            </figure>
          </div>
        </section>
        <MarketingSections locale={locale} />
      </main>
      <EditorialFooter locale={locale} />
      <StickyMobileCta locale={locale} />
    </div>
  );
}
