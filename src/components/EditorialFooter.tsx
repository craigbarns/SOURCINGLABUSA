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
            <Link href={home}>
              <Logo appearance="light" />
            </Link>
            <p>
              {es
                ? 'Sourcing global, gestión de fabricación internacional y ejecución de entrada al mercado estadounidense. Verificación de fábricas, control de calidad y representación comercial.'
                : 'Global sourcing, overseas manufacturing management, and U.S. market-entry execution. Direct factory audits, AQL 2.5 quality control, tariffs, and U.S. commercial representation.'}
            </p>
          </div>
          <nav aria-label={es ? 'Sourcing y fabricación' : 'Sourcing & Manufacturing'}>
            <span>{es ? 'SOURCING Y FÁBRICAS' : 'GLOBAL SOURCING'}</span>
            <ul>
              <li>
                <Link href={`${linkPrefix}/product-sourcing`}>
                  {es ? 'Sourcing de producto' : 'Product sourcing'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/china-sourcing`}>
                  {es ? 'Sourcing en China' : 'China sourcing'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/china-sourcing-agent`}>
                  {es ? 'Agente de sourcing China' : 'China sourcing agent'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/factory-verification`}>
                  {es ? 'Verificación de fábricas' : 'Factory verification'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/supplier-audit-china`}>
                  {es ? 'Auditoría de proveedores' : 'Supplier audit China'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/quality-control-china`}>
                  {es ? 'Control de calidad AQL' : 'Quality control China'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/private-label-manufacturing`}>
                  {es ? 'Marca privada' : 'Private label sourcing'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/product-development`}>
                  {es ? 'Desarrollo de producto' : 'Product development'}
                </Link>
              </li>
            </ul>
          </nav>
          <nav aria-label={es ? 'Comercio y aduanas' : 'Trade & Logistics'}>
            <span>{es ? 'COMERCIO Y ADUANAS' : 'TRADE & LOGISTICS'}</span>
            <ul>
              <li>
                <Link href={`${linkPrefix}/china-to-us-procurement`}>
                  {es ? 'Compras China a EE. UU.' : 'China-to-U.S. procurement'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/import-from-china`}>
                  {es ? 'Importar de China' : 'Import from China'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/freight-logistics`}>
                  {es ? 'Fletes y logística' : 'Freight & logistics'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/hs-code-consulting`}>
                  {es ? 'Códigos HS y aranceles' : 'HS code consulting'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/landed-cost-analysis`}>
                  {es ? 'Coste puesto en destino' : 'Landed cost analysis'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/us-market-entry`}>
                  {es ? 'Entrada al mercado EE. UU.' : 'U.S. market entry'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/us-sales-representation`}>
                  {es ? 'Representación comercial' : 'U.S. sales representation'}
                </Link>
              </li>
            </ul>
          </nav>
          <nav aria-label={es ? 'Empresa e industrias' : 'Industries & Company'}>
            <span>{es ? 'INDUSTRIAS Y EMPRESA' : 'INDUSTRIES & ABOUT'}</span>
            <ul>
              <li>
                <Link href={`${linkPrefix}/industries/packaging`}>
                  {es ? 'Industria de packaging' : 'Packaging industry'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/industries/textiles`}>
                  {es ? 'Textiles y confección' : 'Textile & apparel'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/industries/consumer-products`}>
                  {es ? 'Bienes de consumo' : 'Consumer products'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/how-we-work`}>
                  {es ? 'Cómo funciona' : 'How it works'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/about`}>
                  {es ? 'Sobre nosotros' : 'About Sourcing Lab'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/resources`}>
                  {es ? 'Recursos y plantillas' : 'Templates & guides'}
                </Link>
              </li>
              <li>
                <Link href={`${linkPrefix}/contact-us`}>
                  {es ? 'Contacto' : 'Start a project'}
                </Link>
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
