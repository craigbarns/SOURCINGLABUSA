import type { BriefLocale } from '@/lib/brief-copy';

type QualificationField = 'name' | 'email' | 'company' | 'country' | 'productCategory' | 'objectives' | 'capabilities' | 'exportActivity' | 'targetCustomers' | 'expansionBudget';
interface MarketEntryCopy {
  labels: Record<QualificationField, string>;
  errors: Record<QualificationField, string>;
  intro: string;
  details: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  reset: string;
  privacy: string;
  privacyLink: string;
  failure: string;
  fallback: string;
  emailSubject: string;
  section: { eyebrow: string; title: string; intro: string; steps: { title: string; body: string }[] };
}

export const MARKET_ENTRY_COPY: Record<BriefLocale, MarketEntryCopy> = {
  en: {
    labels: { name: 'Your name', email: 'Professional email', company: 'Company', country: 'Country', productCategory: 'Product category', objectives: 'U.S. commercial objectives', capabilities: 'Manufacturing capabilities', exportActivity: 'Existing export activity', targetCustomers: 'Target American customers', expansionBudget: 'Estimated expansion budget and currency' },
    errors: { name: 'Please enter your name.', email: 'Please enter a valid email address.', company: 'Please enter your company.', country: 'Please enter your country.', productCategory: 'Please describe your product category.', objectives: 'Please describe your U.S. commercial objectives.', capabilities: 'Please keep manufacturing capabilities within 500 characters.', exportActivity: 'Please keep export activity within 400 characters.', targetCustomers: 'Please keep target customers within 400 characters.', expansionBudget: 'Please keep the budget within 160 characters.' },
    intro: 'Tell us about your manufacturing business and U.S. objectives. Fields marked * are required.',
    details: 'Add manufacturing and expansion details (optional)', submit: 'Request a U.S. Market Assessment', submitting: 'Sending…',
    successTitle: 'Market-entry inquiry received.',
    successBody: 'We will review your products, target customers and objectives, then discuss the scope and terms of a possible engagement. An inquiry does not create a representation agreement.',
    reset: 'Send another inquiry', privacy: 'We use these details to respond to your inquiry. Please avoid confidential customer lists and sensitive technical documents.', privacyLink: 'Privacy policy',
    failure: 'We could not confirm receipt. Your details are still here; please try again or send them by email.', fallback: 'Send it by email instead', emailSubject: 'U.S. market-entry inquiry',
    section: { eyebrow: 'For international manufacturers', title: 'Discuss your U.S. market objectives.', intro: 'Share your products, current export activity and target customers. We will assess a potential scope before proposing an engagement.', steps: [
      { title: 'Review the commercial fit', body: 'Clarify your product category, capabilities, export experience and target American customers.' },
      { title: 'Define a practical scope', body: 'Identify the research, sales preparation or distributor outreach needed and any independent specialist support.' },
      { title: 'Agree the engagement', body: 'Confirm deliverables, reporting, contracting entity and commercial terms in writing before work begins.' },
    ] },
  },
  es: {
    labels: { name: 'Su nombre', email: 'Correo profesional', company: 'Empresa', country: 'País', productCategory: 'Categoría de producto', objectives: 'Objetivos comerciales en EE. UU.', capabilities: 'Capacidades de fabricación', exportActivity: 'Actividad exportadora actual', targetCustomers: 'Clientes objetivo en Estados Unidos', expansionBudget: 'Presupuesto estimado de expansión y moneda' },
    errors: { name: 'Indique su nombre, de 2 a 120 caracteres.', email: 'Introduzca un correo electrónico válido.', company: 'Indique su empresa, de 2 a 160 caracteres.', country: 'Indique su país, de 2 a 100 caracteres.', productCategory: 'Describa su categoría de producto, de 2 a 160 caracteres.', objectives: 'Describa sus objetivos comerciales, de 10 a 900 caracteres.', capabilities: 'Use un máximo de 500 caracteres para las capacidades.', exportActivity: 'Use un máximo de 400 caracteres para la actividad exportadora.', targetCustomers: 'Use un máximo de 400 caracteres para los clientes objetivo.', expansionBudget: 'Use un máximo de 160 caracteres para el presupuesto.' },
    intro: 'Cuéntenos sobre su empresa fabricante y sus objetivos en EE. UU. Los campos con * son obligatorios.',
    details: 'Añadir detalles de fabricación y expansión (opcional)', submit: 'Solicitar una evaluación del mercado estadounidense', submitting: 'Enviando…',
    successTitle: 'Consulta de entrada al mercado recibida.', successBody: 'Revisaremos sus productos, clientes objetivo y objetivos antes de definir el alcance y las condiciones de una posible colaboración. Esta consulta no constituye un acuerdo de representación.',
    reset: 'Enviar otra consulta', privacy: 'Usamos estos datos para responder a su consulta. No incluya listas confidenciales de clientes ni documentos técnicos sensibles.', privacyLink: 'Política de privacidad',
    failure: 'No hemos podido confirmar la recepción. Sus datos siguen aquí; inténtelo de nuevo o envíelos por correo.', fallback: 'Enviarlo por correo electrónico', emailSubject: 'Consulta de entrada al mercado estadounidense',
    section: { eyebrow: 'Para fabricantes internacionales', title: 'Hablemos de sus objetivos en EE. UU.', intro: 'Comparta sus productos, actividad exportadora y clientes objetivo. Evaluaremos el alcance antes de proponer una colaboración.', steps: [
      { title: 'Revisar el encaje comercial', body: 'Aclarar productos, capacidades, experiencia exportadora y clientes estadounidenses objetivo.' },
      { title: 'Definir un alcance práctico', body: 'Identificar estudios, preparación comercial, búsqueda de distribuidores y apoyo especializado independiente.' },
      { title: 'Acordar la colaboración', body: 'Confirmar por escrito entregables, seguimiento, entidad contratante y condiciones antes de empezar.' },
    ] },
  },
  zh: {
    labels: { name: '您的姓名', email: '工作邮箱', company: '公司名称', country: '所在国家或地区', productCategory: '产品类别', objectives: '美国市场商业目标', capabilities: '生产制造能力', exportActivity: '现有出口业务', targetCustomers: '目标美国客户', expansionBudget: '预计市场拓展预算及币种' },
    errors: { name: '请输入姓名，长度为 2 至 120 个字符。', email: '请输入有效的邮箱地址。', company: '请输入公司名称，长度为 2 至 160 个字符。', country: '请输入所在国家或地区，长度为 2 至 100 个字符。', productCategory: '请描述产品类别，长度为 2 至 160 个字符。', objectives: '请描述美国市场商业目标，长度为 10 至 900 个字符。', capabilities: '生产制造能力描述不得超过 500 个字符。', exportActivity: '现有出口业务描述不得超过 400 个字符。', targetCustomers: '目标客户描述不得超过 400 个字符。', expansionBudget: '预算说明不得超过 160 个字符。' },
    intro: '请介绍贵公司的制造业务及美国市场目标。标有 * 的字段为必填项。',
    details: '补充制造与市场拓展信息（选填）', submit: '申请美国市场评估', submitting: '正在发送…',
    successTitle: '已收到您的美国市场咨询。', successBody: '我们将了解贵公司的产品、目标客户及商业目标，再讨论潜在合作的范围与条款。提交咨询不构成商业代表协议。',
    reset: '提交另一条咨询', privacy: '这些信息仅用于回复您的咨询。请勿提供保密客户名单或敏感技术文件。', privacyLink: '隐私政策',
    failure: '暂时无法确认是否收到。您填写的信息仍然保留，请重试或通过电子邮件发送。', fallback: '改用电子邮件发送', emailSubject: '美国市场拓展咨询',
    section: { eyebrow: '面向国际制造商', title: '讨论贵公司的美国市场目标。', intro: '请分享产品、现有出口业务及目标客户，我们会先评估适合的合作范围。', steps: [
      { title: '了解商业匹配度', body: '明确产品类别、制造能力、出口经验及目标美国客户。' },
      { title: '确定实际工作范围', body: '明确所需的市场研究、销售准备、分销商联络及独立专业机构支持。' },
      { title: '书面确认合作', body: '开始工作前，确认交付内容、汇报安排、签约主体及商业条款。' },
    ] },
  },
};
