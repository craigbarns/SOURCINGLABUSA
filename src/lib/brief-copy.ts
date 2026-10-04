import {
  PROJECT_TYPE_LABELS,
  QUANTITY_RANGE_LABELS,
  type ProjectType,
  type QuantityRange,
} from '@/lib/validation/contact';

export type BriefLocale = 'en' | 'es' | 'zh';

export const BRIEF_CONTACT_EMAIL = 'contact@sourcinglabusa.com';

export interface BriefFormCopy {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  companyLabel: string;
  companyOptional: string;
  companyPlaceholder: string;
  projectTypeLabel: string;
  projectTypePlaceholder: string;
  quantityLabel: string;
  messageLabel: string;
  messageOptional: string;
  messagePlaceholder: string;
  messageHint: string;
  submit: string;
  submitting: string;
  privacy: string;
  privacyLink: string;
  successTitle: string;
  successBody: string;
  successSteps: string[];
  successReset: string;
  genericError: string;
  fallbackIntro: string;
  fallbackCta: string;
  fallbackSubject: string;
  fieldErrors: Record<
    'name' | 'email' | 'company' | 'projectType' | 'quantityRange' | 'message',
    string
  >;
  projectTypeOptions: Record<ProjectType, string>;
  quantityOptions: Record<QuantityRange, string>;
}

export interface BriefSectionCopy {
  eyebrow: string;
  title: string;
  intro: string;
  stepsTitle: string;
  steps: Array<{ title: string; body: string }>;
  directLabel: string;
  form: BriefFormCopy;
}

const englishForm: BriefFormCopy = {
  nameLabel: 'Your name',
  namePlaceholder: 'Jane Doe',
  emailLabel: 'Work email',
  emailPlaceholder: 'you@company.com',
  companyLabel: 'Company',
  companyOptional: 'optional',
  companyPlaceholder: 'Brand or company name',
  projectTypeLabel: 'What do you need?',
  projectTypePlaceholder: 'Select a product type',
  quantityLabel: 'Approximate quantity',
  messageLabel: 'Your brief',
  messageOptional: 'optional',
  messagePlaceholder:
    'Product, dimensions, material or finish, references, destination, target timing…',
  messageHint:
    'The more specific the brief, the more precise the first answer. You can also send details later.',
  submit: 'Send my project brief',
  submitting: 'Sending…',
  privacy:
    'Your brief is used only to answer your request. No newsletter, no sales sequence.',
  privacyLink: 'How we handle your details',
  successTitle: 'Brief received.',
  successBody: 'We have your request and will reply by email.',
  successSteps: [
    'We read your brief and confirm what can be quoted and sampled.',
    'We come back to you by email with the questions or the next step.',
    'If the project fits, we prepare supplier options, pricing, and sampling.',
  ],
  successReset: 'Send another brief',
  genericError: 'Something went wrong while sending your brief.',
  fallbackIntro: 'Nothing is lost — you can send the same brief by email:',
  fallbackCta: 'Send it by email instead',
  fallbackSubject: 'Product sourcing and supply project',
  fieldErrors: {
    name: 'Please enter your name.',
    email: 'Please enter a valid work email address.',
    company: 'This company name is too long.',
    projectType: 'Select the type of product you need.',
    quantityRange: 'Select an approximate quantity.',
    message: 'The brief must not exceed 4,000 characters.',
  },
  projectTypeOptions: PROJECT_TYPE_LABELS,
  quantityOptions: QUANTITY_RANGE_LABELS,
};

const spanishForm: BriefFormCopy = {
  nameLabel: 'Su nombre',
  namePlaceholder: 'Nombre y apellido',
  emailLabel: 'Email profesional',
  emailPlaceholder: 'usted@empresa.com',
  companyLabel: 'Empresa',
  companyOptional: 'opcional',
  companyPlaceholder: 'Nombre de la marca o empresa',
  projectTypeLabel: '¿Qué necesita?',
  projectTypePlaceholder: 'Seleccione un tipo de producto',
  quantityLabel: 'Cantidad aproximada',
  messageLabel: 'Su proyecto',
  messageOptional: 'opcional',
  messagePlaceholder:
    'Producto, dimensiones, material o acabado, referencias, destino, plazo objetivo…',
  messageHint:
    'Cuanto más preciso sea el brief, más precisa será la primera respuesta. También puede enviar los detalles más tarde.',
  submit: 'Enviar mi proyecto',
  submitting: 'Enviando…',
  privacy:
    'Su información se utiliza únicamente para responder a su solicitud. Sin newsletter ni secuencia comercial.',
  privacyLink: 'Cómo tratamos sus datos',
  successTitle: 'Proyecto recibido.',
  successBody: 'Hemos recibido su solicitud y le responderemos por email.',
  successSteps: [
    'Leemos su brief y confirmamos qué se puede cotizar y muestrear.',
    'Le respondemos por email con las preguntas o el siguiente paso.',
    'Si el proyecto encaja, preparamos opciones de proveedor, precios y muestras.',
  ],
  successReset: 'Enviar otro proyecto',
  genericError: 'Ocurrió un problema al enviar su proyecto.',
  fallbackIntro:
    'No se ha perdido nada: puede enviarnos el mismo brief por email:',
  fallbackCta: 'Enviarlo por email',
  fallbackSubject: 'Proyecto de sourcing y suministro de productos',
  fieldErrors: {
    name: 'Indique su nombre.',
    email: 'Indique un email profesional válido.',
    company: 'El nombre de la empresa es demasiado largo.',
    projectType: 'Seleccione el tipo de producto que necesita.',
    quantityRange: 'Seleccione una cantidad aproximada.',
    message: 'El brief no debe superar los 4.000 caracteres.',
  },
  projectTypeOptions: {
    packaging: 'Packaging, cajas y etiquetas',
    textile: 'Prendas, ropa deportiva y técnica',
    both: 'Packaging y textil',
    other: 'Otros productos / consultar un proyecto',
  },
  quantityOptions: {
    under_500: 'Menos de 500 unidades',
    from_500_to_2000: '500 – 2.000 unidades',
    from_2000_to_10000: '2.000 – 10.000 unidades',
    over_10000: 'Más de 10.000 unidades',
    not_sure: 'Aún sin definir',
  },
};

const chineseForm: BriefFormCopy = {
  nameLabel: '您的姓名',
  namePlaceholder: '张经理 / 李总',
  emailLabel: '企业工作邮箱',
  emailPlaceholder: 'you@company.com',
  companyLabel: '企业 / 工厂名称',
  companyOptional: '选填',
  companyPlaceholder: '例如：XX智能制造 / XX实业有限公司',
  projectTypeLabel: '出海产品类别',
  projectTypePlaceholder: '请选择您的核心产品领域',
  quantityLabel: '预估合作规模 / 年出口量',
  messageLabel: '出海需求与合作说明',
  messageOptional: '选填',
  messagePlaceholder:
    '请简要介绍您的主营产品、目前出口或内销情况、目标美国买家类型（B2B批发商/品牌代工/连锁零售）、微信号或需重点协助事项（如法规合规、商业代表、海外仓等）…',
  messageHint:
    '信息越具体，我们的初步分析与评估将越有针对性。您也可以在后续对接中补充详细资料。',
  submit: '提交出海需求评估',
  submitting: '正在提交…',
  privacy:
    '我们严格保护您的商业与产品信息，所有提交仅用于评估美国市场合作可行性，绝不外泄。',
  privacyLink: '了解隐私政策',
  successTitle: '出海需求已成功提交。',
  successBody: '我们已收到您的项目信息，专业团队将尽快通过邮件或电话与您取得联系。',
  successSteps: [
    '我们仔细审阅您的产品与企业背景，评估美国市场准入可行性与渠道匹配度。',
    '我们将通过工作邮箱与您取得联络，沟通具体细节或安排初步线上沟通。',
    '若项目契合，我们将为您定制美国本土商业拓展方案、渠道推介与合规路线。',
  ],
  successReset: '提交另一项需求',
  genericError: '提交需求时出现异常，请稍后再试。',
  fallbackIntro: '您也可以直接通过电子邮件发送项目资料：',
  fallbackCta: '通过邮件直接发送',
  fallbackSubject: '中国工厂出海美国市场合作意向',
  fieldErrors: {
    name: '请填写您的姓名。',
    email: '请填写有效的企业工作邮箱。',
    company: '公司名称过长。',
    projectType: '请选择您的出海产品类别。',
    quantityRange: '请选择预估合作规模。',
    message: '需求说明不能超过4,000个字符。',
  },
  projectTypeOptions: {
    packaging: '定制包装、礼盒与标签 (Packaging)',
    textile: '成衣制造、运动服饰与功能性纺织品 (Textiles)',
    both: '包装与纺织综合制造 (Packaging & Textiles)',
    other: '硬制品/消费品/其他品类洽谈 (Other Products)',
  },
  quantityOptions: {
    under_500: '首期小批量试单（500件以内）',
    from_500_to_2000: '常规批量订单（500 – 2,000件）',
    from_2000_to_10000: '规模化量产（2,000 – 10,000件）',
    over_10000: '大型采购 / 持续集装箱供货（10,000件以上）',
    not_sure: '尚在规划 / 需根据买家需求确定',
  },
};

export const BRIEF_FORM_COPY: Record<BriefLocale, BriefFormCopy> = {
  en: englishForm,
  es: spanishForm,
  zh: chineseForm,
};

export const BRIEF_SECTION_COPY: Record<BriefLocale, BriefSectionCopy> = {
  en: {
    eyebrow: 'Start with your brief',
    title: 'Ready to develop your next product?',
    intro:
      'Send the product, quantity, design references, destination, and timing. We review the project and come back with the right next step.',
    stepsTitle: 'What happens after you send it',
    steps: [
      {
        title: 'We read the brief',
        body: 'We confirm what can be quoted and sampled for your product.',
      },
      {
        title: 'We reply by email',
        body: 'With the missing information we need, or the next step for the project.',
      },
      {
        title: 'You get concrete options',
        body: 'Supplier options, pricing, sampling, and production timing for your review.',
      },
    ],
    directLabel: 'Or contact us directly',
    form: englishForm,
  },
  es: {
    eyebrow: 'Empiece con su proyecto',
    title: '¿Listo para desarrollar su próximo producto?',
    intro:
      'Envíenos el producto, la cantidad, las referencias de diseño, el destino y el plazo. Revisamos el proyecto y volvemos con el siguiente paso adecuado.',
    stepsTitle: 'Qué ocurre después de enviarlo',
    steps: [
      {
        title: 'Leemos su brief',
        body: 'Confirmamos qué se puede cotizar y muestrear para su producto.',
      },
      {
        title: 'Le respondemos por email',
        body: 'Con la información que falta o el siguiente paso del proyecto.',
      },
      {
        title: 'Recibe opciones concretas',
        body: 'Opciones de proveedor, precios, muestras y plazos de producción.',
      },
    ],
    directLabel: 'O contáctenos directamente',
    form: spanishForm,
  },
  zh: {
    eyebrow: '开启美国本土市场拓展',
    title: '准备好开拓美国高价值买家了吗？',
    intro:
      '请提交您的主营产品、产能优势与目标规划。我们的美国本土团队将进行准入与渠道评估，并在1-2个工作日内与您取得联系。',
    stepsTitle: '提交需求后的后续流程',
    steps: [
      {
        title: '需求与产品初审',
        body: '我们审阅您的工厂实力、产品资质与美国市场竞争潜力。',
      },
      {
        title: '专业团队跟进',
        body: '针对准入法规、税号归类与渠道策略与您进行深度沟通。',
      },
      {
        title: '定制落地拓展方案',
        body: '提供美国市场商业代表、买家对接方案与合规落地执行路径。',
      },
    ],
    directLabel: '或直接与我们的顾问联络',
    form: chineseForm,
  },
};
