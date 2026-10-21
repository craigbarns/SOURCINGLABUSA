import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/** Product scope in plain text, without illustrative products or stock imagery. */
export function SourcingOverview({ locale = 'en' }: { locale?: 'en' | 'es' | 'zh' }) {
  const es = locale === 'es';
  const zh = locale === 'zh';
  const categories = zh ? [
    ['#representation', '01', '商业代表与买家联络', '目标客户研究、商业资料和按约定范围跟进。'],
    ['#compliance', '02', '产品证据与专业审查', '梳理资料缺项，将具体问题交由合适专业人士审查。'],
    ['#landed-cost', '03', '到岸成本情景分析', '使用明确的用户输入和经核实的成本假设。'],
    ['#fulfillment', '04', '订单与交付责任', '明确运输、进口、售后和渠道各方责任。'],
  ] : es ? [
    ['/product-sourcing', '01', 'Sourcing de productos', 'Proveedores, presupuestos y coordinación desde un brief claro.'],
    ['/custom-packaging', '02', 'Packaging a medida', 'Cajas, bolsas, etiquetas e insertos para tu producto.'],
    ['/custom-textile', '03', 'Prendas y textiles', 'Materiales, tallas, acabados y muestras antes de fabricar.'],
    ['/private-label-manufacturing', '04', 'Tu propia marca', 'Producto, personalización y packaging acordados para el pedido.'],
  ] : [
    ['/product-sourcing', '01', 'Product sourcing', 'Supplier options, comparable quotes and production coordination.'],
    ['/custom-packaging', '02', 'Custom packaging', 'Boxes, bags, labels and inserts built around your product.'],
    ['/custom-textile', '03', 'Apparel and textiles', 'Materials, sizing, construction and sample approvals.'],
    ['/private-label-manufacturing', '04', 'Private label products', 'Your product specification, branding and packaging.'],
  ];
  return (
    <aside className="sourcing-overview" aria-label={zh ? '核心落地能力' : es ? 'Proyectos de sourcing' : 'Sourcing projects'}>
      <p className="editorial-kicker">SOURCING LAB USA / {zh ? '核心落地能力' : es ? 'TU PRODUCTO' : 'YOUR PRODUCT'}</p>
      <h2>{zh ? '您的出海核心目标是什么？' : es ? '¿Qué producto quieres fabricar?' : 'What would you like to source?'}</h2>
      <div>{categories.map(([href, number, title, body]) => (
        <Link href={href} key={number} className="sourcing-category">
          <span className="sourcing-category-number">{number}</span>
          <div><h3>{title}</h3><p>{body}</p></div>
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      ))}</div>
      <p className="sourcing-overview-note">{zh ? '当前通过法国或中国公司签约 · 迈阿密扩展计划于2027年开展' : es ? 'Packaging y textiles son nuestras especialidades. Otros productos, según viabilidad.' : 'Packaging and textiles are our deepest specialties. Other products are assessed for feasibility.'}</p>
    </aside>
  );
}
