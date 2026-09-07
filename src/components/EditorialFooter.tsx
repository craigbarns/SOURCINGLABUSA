import Link from 'next/link';
import { Logo } from './Logo';

export function EditorialFooter({ locale = 'en' }: { locale?: 'en' | 'es' }) {
  const es = locale === 'es';
  const home = es ? '/es' : '/';
  return (
    <footer className="editorial-footer">
      <div className="editorial-container">
        <div className="editorial-footer-top">
          <div>
            <Link href={home} aria-label="SourcingLab USA home">
              <Logo appearance="light" />
            </Link>
            <p>
              {es
                ? 'Empaques y textiles personalizados para marcas con una visión. Lanzamiento previsto en Miami para 2027.'
                : 'Custom packaging and textiles for brands with a point of view. Preparing our U.S. market launch in Miami for 2027.'}
            </p>
          </div>
          <nav aria-label={es ? 'Servicios' : 'Service links'}>
            <span>{es ? 'LAS POSIBILIDADES' : 'THE POSSIBILITIES'}</span>
            <ul>
              <li>
                <Link href="/custom-packaging">
                  {es ? 'Empaques personalizados' : 'Custom packaging'}
                </Link>
              </li>
              <li>
                <Link href="/custom-textile">
                  {es ? 'Textiles personalizados' : 'Custom textiles'}
                </Link>
              </li>
              <li>
                <Link href="/private-label-packaging">
                  {es ? 'Empaques de marca privada' : 'Private label packaging'}
                </Link>
              </li>
              <li>
                <Link href="/china-to-us-procurement">
                  {es
                    ? 'Compras de China a EE. UU.'
                    : 'China-to-U.S. procurement'}
                </Link>
              </li>
            </ul>
          </nav>
          <nav aria-label={es ? 'Empresa' : 'Company links'}>
            <span>{es ? 'CONOCE SOURCING LAB' : 'GET TO KNOW US'}</span>
            <ul>
              <li>
                <a href={`${home}#how-it-works`}>
                  {es ? 'Cómo funciona' : 'How it works'}
                </a>
              </li>
              <li>
                <a href={`${home}#experience`}>
                  {es ? 'Nuestra visión' : 'Our approach'}
                </a>
              </li>
              <li>
                <Link href="/blog">
                  {es ? 'Recursos y guías' : 'Insights & guides'}
                </Link>
              </li>
              <li>
                <a href={`${home}#contact`}>
                  {es ? 'Cuéntanos tu proyecto' : 'Start a conversation'}
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="editorial-footer-wordmark" aria-hidden="true">
          SourcingLab.
        </div>
        <div className="editorial-footer-bottom">
          <p>
            © {new Date().getFullYear()} Sourcing Lab USA.{' '}
            {es ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
          <p>
            {es
              ? 'Empaques. Textiles. Posibilidades.'
              : 'Packaging. Textiles. Possibilities.'}
          </p>
          <a href="mailto:contact@sourcinglabusa.com">
            contact@sourcinglabusa.com ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
