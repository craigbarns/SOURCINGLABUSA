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
                ? 'SOURCING GLOBAL & ENTRADA AL MERCADO DE EE. UU.'
                : 'GLOBAL SOURCING & U.S. MARKET ENTRY'}
          </p>
          <h1 id="hero-heading">
            {zh ? (
              <>
                美国市场准入<br />
                <em>&amp; 美国商业代表</em>
              </>
            ) : es ? (
              <>
                Sourcing global<br />
                <em>&amp; entrada al mercado de EE. UU.</em>
              </>
            ) : (
              <>
                Global Sourcing<br />
                <em>&amp; Market Entry for the U.S.</em>
              </>
            )}
          </h1>
          <p className="hero-description">
            {zh
              ? '帮助国际制造企业准备美国市场拓展：研究目标客户、准备商业资料、识别潜在分销商并按约定范围开展买家联络。'
              : es
                ? 'Ayudamos a empresas estadounidenses a buscar, verificar y fabricar en el extranjero, y ayudamos a fabricantes internacionales a entrar, distribuir y crecer en el mercado de Estados Unidos.'
                : 'We help U.S. companies source and manufacture overseas — and help international manufacturers enter, distribute, and grow in the United States.'}
          </p>
          <div className="hero-actions">
            <CtaLink
              href={zh ? '#contact' : '/product-sourcing'}
              location="hero"
              label={zh ? '提交出海需求评估' : es ? 'Necesito un fabricante' : 'I need a manufacturer'}
              className="editorial-button"
            >
              {zh ? '提交出海需求评估' : es ? 'Necesito un fabricante' : 'I need a manufacturer'}
              <ArrowUpRight size={18} aria-hidden="true" />
            </CtaLink>
            <CtaLink
              href={zh ? '#representation' : '/us-market-entry'}
              location="hero"
              label={zh ? '了解核心能力' : es ? 'Quiero vender en EE. UU.' : 'I want to enter the U.S. market'}
              className="editorial-text-link"
            >
              {zh ? '了解核心落地能力' : es ? 'Quiero vender en EE. UU.' : 'I want to enter the U.S. market'}
              <ArrowUpRight size={16} aria-hidden="true" />
            </CtaLink>
          </div>
          <p className="sourcing-launch-note">
            {zh
              ? '当前通过法国或中国公司签约和开票 · 迈阿密扩展计划于2027年开展'
              : es
                ? 'Proyectos disponibles ahora desde Francia o China · Expansión en Miami prevista para 2027.'
                : 'Projects available now through France or China · Miami expansion planned for 2027.'}
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
            <span>{es ? 'Entrada al mercado de EE. UU.' : 'U.S. market entry'}</span>
          </>
        )}
      </div>
    </section>
  );
}
