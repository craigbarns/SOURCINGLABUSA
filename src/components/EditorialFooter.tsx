import Link from 'next/link';
import { Logo } from './Logo';

export function EditorialFooter({
  locale = 'en',
  linkPrefix = '',
}: {
  locale?: 'en' | 'es';
  linkPrefix?: string;
}) {
  const es = locale === 'es';
  const home = `${linkPrefix}${es ? '/es' : '/'}`;
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
                ? 'Sourcing y suministro de productos desde China. Prendas y empaques como especialidades; otros productos bajo pedido. Lanzamiento previsto en Miami para 2027.'
                : 'China sourcing and product supply. Clothing and packaging as core specialties, with other products on request. U.S. launch planned for Miami in 2027.'}
            </p>
          </div>
          <nav aria-label={es ? 'Servicios' : 'Service links'}>
            <span>{es ? 'LAS POSIBILIDADES' : 'THE POSSIBILITIES'}</span>
            <ul>
              <li>
                <Link href={`${linkPrefix}/custom-packaging`}>
                  {es ? 'Empaques personalizados' : 'Custom packaging'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/custom-textile`}>
                  {es ? 'Prendas y textiles' : 'Clothing & textiles'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/private-label-packaging`}>
                  {es ? 'Empaques de marca privada' : 'Private label packaging'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/china-to-us-procurement`}>
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
                <Link href={`${linkPrefix}/about`}>
                  {es ? 'Sobre Sourcing Lab USA' : 'About Sourcing Lab USA'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/blog`}>
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
          <Link href={`${linkPrefix}/privacy`}>
            {es ? 'Privacidad' : 'Privacy notice'}
          </Link>
        </div>
      </div>
    </footer>
  );
}
