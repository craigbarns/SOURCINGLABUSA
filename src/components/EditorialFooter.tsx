import Link from 'next/link';

import { Logo } from './Logo';
import { PROMISE } from '@/lib/positioning';

type FooterLink = { href: string; en: string; es: string; zh?: string };

/**
 * Footer columns follow the scope of a supply: what is supplied, what is added
 * only when written into the quotation (and the pages that state our limits),
 * and the company. The tagline is the promise from src/lib/positioning.ts.
 */
const columns: Array<{ label: { en: string; es: string; zh: string }; links: FooterLink[] }> = [
  {
    label: { en: 'WHAT WE SUPPLY', es: 'LO QUE SUMINISTRAMOS', zh: '供货内容' },
    links: [
      { href: '/custom-packaging', en: 'Custom packaging', es: 'Packaging a medida', zh: '定制包装' },
      { href: '/private-label-packaging', en: 'Private label packaging', es: 'Packaging de marca privada', zh: '自有品牌包装' },
      { href: '/custom-textile', en: 'Clothing and textiles', es: 'Ropa y textiles', zh: '服装与纺织品' },
      { href: '/sportswear-sourcing', en: 'Sportswear', es: 'Ropa deportiva', zh: '运动服' },
      { href: '/product-sourcing', en: 'Other products', es: 'Otros productos', zh: '其他产品' },
      { href: '/china-sourcing-agent', en: 'Agent or supplier?', es: '¿Agente o proveedor?', zh: '代理还是供应商？' },
    ],
  },
  {
    label: { en: 'ON REQUEST & LIMITS', es: 'BAJO PETICIÓN Y LÍMITES', zh: '按需服务与边界' },
    links: [
      { href: '/factory-verification', en: 'Factory checks', es: 'Comprobación de fábricas', zh: '工厂核查' },
      { href: '/quality-control-china', en: 'Inspections', es: 'Inspecciones', zh: '验货' },
      { href: '/hs-code-consulting', en: 'HS code classification', es: 'Clasificación HS', zh: 'HS税号归类' },
      { href: '/landed-cost-analysis', en: 'Landed-cost model', es: 'Modelo de coste en destino', zh: '到岸成本模型' },
      { href: '/freight-logistics', en: 'Freight and customs: our limits', es: 'Flete y aduanas: nuestros límites', zh: '运输与清关：我们的边界' },
      { href: '/us-market-entry', en: 'Selling in the U.S.', es: 'Vender en EE. UU.', zh: '在美国销售' },
    ],
  },
  {
    label: { en: 'COMPANY', es: 'EMPRESA', zh: '公司' },
    links: [
      { href: '/how-we-work', en: 'How we work', es: 'Cómo trabajamos', zh: '合作流程' },
      { href: '/about', en: 'About Sourcing Lab', es: 'Sobre nosotros', zh: '关于我们' },
      { href: '/case-studies', en: 'Case studies', es: 'Casos documentados', zh: '案例' },
      { href: '/resources', en: 'Templates & guides', es: 'Recursos y plantillas', zh: '模板与指南' },
      { href: '/contact-us', en: 'Start a project', es: 'Contacto', zh: '联系我们' },
    ],
  },
];

export function EditorialFooter({
  locale = 'en',
  linkPrefix = '',
}: {
  locale?: 'en' | 'es' | 'zh';
  linkPrefix?: string;
}) {
  const es = locale === 'es';
  const zh = locale === 'zh';
  const home = `${linkPrefix}${zh ? '/zh' : es ? '/es' : '/'}`;
  const text = (item: { en: string; es: string; zh?: string }) =>
    zh ? (item.zh ?? item.en) : es ? item.es : item.en;

  return (
    <footer className="editorial-footer">
      <div className="editorial-container">
        <div className="editorial-footer-top">
          <div>
            <Link href={home}>
              <Logo appearance="light" />
            </Link>
            <p>{PROMISE[locale]}</p>
          </div>
          {columns.map((column) => (
            <nav key={column.label.en} aria-label={text(column.label)}>
              <span>{text(column.label)}</span>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={`${linkPrefix}${link.href}`}>{text(link)}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="editorial-footer-wordmark" aria-hidden="true">
          SourcingLab.
        </div>
        <div className="editorial-footer-bottom">
          <p>
            © {new Date().getFullYear()} Sourcing Lab USA.{' '}
            {zh ? '保留所有权利。' : es ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
          <p>
            {zh
              ? '包装。纺织品。按合同供货。'
              : es
                ? 'Packaging. Textiles. Bajo contrato.'
                : 'Packaging. Textiles. Under contract.'}
          </p>
          <a href="mailto:contact@sourcinglabusa.com">contact@sourcinglabusa.com ↗</a>
          <Link href={`${linkPrefix}/privacy`}>
            {zh ? '隐私政策' : es ? 'Privacidad' : 'Privacy notice'}
          </Link>
        </div>
      </div>
    </footer>
  );
}
