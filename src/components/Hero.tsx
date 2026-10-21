import { ArrowUpRight } from 'lucide-react';
import { CtaLink } from './CtaLink';
import { SourcingOverview } from './SourcingOverview';

export function Hero({ locale = 'en' }: { locale?: 'en' | 'es' | 'zh' }) {
  const es = locale === 'es';
  const zh = locale === 'zh';
  return (
    <section className="editorial-hero" aria-labelledby="hero-heading">
      <div className="editorial-container hero-layout sourcing-hero">
        <div className="hero-copy animate-rise">
          <p className="editorial-kicker">
            <span className="launch-dot" aria-hidden="true" />
            {zh
              ? '全球制造出海 · 美国市场准入与商业代表'
              : es
                ? 'SOURCING Y SUMINISTRO DE PRODUCTOS'
                : 'CHINA SOURCING & PRODUCT SUPPLY'}
          </p>
          <h1 id="hero-heading">
            {zh ? (
              <>
                美国市场准入<br />
                <em>&amp; 美国商业代表</em>
              </>
            ) : es ? (
              <>
                Encuentra y fabrica<br />
                <em>tu próximo producto.</em>
              </>
            ) : (
              <>
                Source and manufacture<br />
                <em>your next product.</em>
              </>
            )}
          </h1>
          <p className="hero-description">
            {zh
              ? '帮助国际制造企业准备美国市场拓展：研究目标客户、准备商业资料、识别潜在分销商并按约定范围开展买家联络。'
              : es
                ? 'Ayudamos a marcas, comercios y compradores profesionales a encontrar fabricantes en China, desarrollar muestras y coordinar la producción. Especificaciones claras, presupuestos comparables y condiciones de suministro por escrito.'
                : 'We help brands, retailers and business buyers source from China, develop samples and coordinate manufacturing. Clear specifications, comparable quotations and agreed supply terms for your next order.'}
          </p>
          <div className="hero-actions">
            <CtaLink
              href="#contact"
              location="hero"
              label={zh ? '提交出海需求评估' : es ? 'Solicitar presupuesto' : 'Request a sourcing quote'}
              className="editorial-button"
            >
              {zh ? '提交出海需求评估' : es ? 'Solicitar presupuesto' : 'Request a sourcing quote'}
              <ArrowUpRight size={18} aria-hidden="true" />
            </CtaLink>
            <CtaLink
              href={zh ? '#representation' : '#how-it-works'}
              location="hero"
              label={zh ? '了解核心能力' : es ? 'Cómo trabajamos' : 'See how we work'}
              className="editorial-text-link"
            >
              {zh ? '了解核心落地能力' : es ? 'Cómo trabajamos' : 'See how we work'}
              <ArrowUpRight size={16} aria-hidden="true" />
            </CtaLink>
          </div>
          <p className="sourcing-launch-note">
            {zh
              ? '当前通过法国或中国公司签约和开票 · 迈阿密扩展计划于2027年开展'
              : es
                ? 'Comparte tu producto, cantidad y destino. Proyectos disponibles ahora desde Francia o China.'
                : 'Start with your product, quantity and destination. Projects available now through France or China.'}
          </p>
        </div>
        <SourcingOverview locale={locale} />
      </div>
      <div className="editorial-container specialty-strip flex-wrap gap-y-3">
        <span className="specialty-label">{zh ? '服务重点' : es ? 'ÁREAS DE APOYO' : 'AREAS OF SUPPORT'}</span>
        {zh ? (
          <>
            <span>商业代表合作</span><span aria-hidden="true">✳</span>
            <span>B2B渠道直采对接</span><span aria-hidden="true">✳</span>
            <span>产品准备与证据</span><span aria-hidden="true">✳</span>
            <span>成本假设分析</span><span aria-hidden="true">✳</span>
            <span>市场与渠道研究</span>
          </>
        ) : (
          <>
            <span>{es ? 'Búsqueda de proveedores' : 'Supplier sourcing'}</span><span aria-hidden="true">✳</span>
            <span>{es ? 'Verificación de fábricas' : 'Factory verification'}</span><span aria-hidden="true">✳</span>
            <span>{es ? 'Negociación de precios' : 'Contract negotiation'}</span><span aria-hidden="true">✳</span>
            <span>{es ? 'Desarrollo de producto' : 'Product development'}</span><span aria-hidden="true">✳</span>
            <span>{es ? 'Control de calidad' : 'Quality inspection'}</span><span aria-hidden="true">✳</span>
            <span>{es ? 'Logística y aranceles' : 'Logistics & tariffs'}</span><span aria-hidden="true">✳</span>
            <span>{es ? 'Suministro de productos' : 'Product supply'}</span>
          </>
        )}
      </div>
    </section>
  );
}
