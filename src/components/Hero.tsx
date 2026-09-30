import { ArrowDown, ArrowUpRight } from 'lucide-react';
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
              ? '全球制造出海 · 美国市场准入与本土商业代表'
              : es
                ? 'SOURCING GLOBAL & ENTRADA AL MERCADO DE EE. UU.'
                : 'GLOBAL SOURCING & U.S. MARKET ENTRY'}
          </p>
          <h1 id="hero-heading">
            {zh ? (
              <>
                美国市场准入<br />
                <em>&amp; 全美本土商业代表</em>
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
              ? '克服中美时差、语言壁垒与合规鸿沟。为中国优质制造企业与出海品牌提供端到端的美国落地执行：全美商业代表、B2B买家直采对接、FDA/CPSC/FCC法规映射、到岸关税测算及本土3PL海外仓履约协同。'
              : es
                ? 'Ayudamos a empresas estadounidenses a buscar, verificar y fabricar en el extranjero, y ayudamos a fabricantes internacionales a entrar, distribuir y crecer en el mercado de Estados Unidos.'
                : 'We help U.S. companies source and manufacture overseas — and help international manufacturers enter, distribute, and grow in the United States.'}
          </p>
          <div className="hero-actions">
            <CtaLink
              href="#contact"
              location="hero"
              label={zh ? '提交出海需求评估' : es ? 'Reservar una consulta' : 'Book a Sourcing Call'}
              className="editorial-button"
            >
              {zh ? '提交出海需求评估' : es ? 'Reservar una consulta' : 'Book a Sourcing Call'}
              <ArrowUpRight size={18} aria-hidden="true" />
            </CtaLink>
            <CtaLink
              href="#representation"
              location="hero"
              label={zh ? '了解核心能力' : es ? 'Cuéntanos qué buscas' : "Tell Us What You're Looking For"}
              className="editorial-text-link"
            >
              {zh ? '了解核心落地能力' : es ? 'Cuéntanos qué buscas' : "Tell Us What You're Looking For"}
              <ArrowDown size={16} aria-hidden="true" />
            </CtaLink>
          </div>
          <p className="sourcing-launch-note">
            {zh
              ? '美东/美西工作时间即时沟通 · FDA/CPSC/FCC法规映射 · 全美批发商对接 · 10位数HTS税号测算'
              : es
                ? 'Ejecución transparente de compras internacionales y apoyo comercial para empresas en el mercado de EE. UU.'
                : 'Transparent procurement execution and commercial coordination for companies operating in the U.S. market.'}
          </p>
        </div>
        <SourcingOverview locale={locale} />
      </div>
      <div className="editorial-container specialty-strip flex-wrap gap-y-3">
        <span className="specialty-label">{zh ? '服务重点' : es ? 'ÁREAS DE APOYO' : 'AREAS OF SUPPORT'}</span>
        {zh ? (
          <>
            <span>全美商业代表</span><span aria-hidden="true">✳</span>
            <span>B2B渠道直采对接</span><span aria-hidden="true">✳</span>
            <span>FDA / CPSC准入合规</span><span aria-hidden="true">✳</span>
            <span>HTS税号与关税筹划</span><span aria-hidden="true">✳</span>
            <span>Section 301额外关税</span><span aria-hidden="true">✳</span>
            <span>本土3PL海外仓协同</span>
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
