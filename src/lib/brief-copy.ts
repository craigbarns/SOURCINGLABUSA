import {
  PROJECT_TYPE_LABELS,
  QUANTITY_RANGE_LABELS,
  type ProjectType,
  type QuantityRange,
} from '@/lib/validation/contact';

export type BriefLocale = 'en' | 'es';

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

export const BRIEF_FORM_COPY: Record<BriefLocale, BriefFormCopy> = {
  en: englishForm,
  es: spanishForm,
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
};
