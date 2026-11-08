/**
 * Duty calculator page content, published both on screen and as FAQPage and
 * HowTo structured data from this single source so the markup can never drift
 * from the visible text.
 *
 * Every string below is the wording already shown on /duty-calculator. The
 * answers stay inside the scope set in AGENTS.md: the tool is working
 * research, the rate comes from the official USITC schedule with the date
 * shown, and a licensed customs broker confirms before anyone relies on it.
 */

export const dutyCalculatorFaqs = [
  [
    'Is the rate the tool shows the duty I will pay?',
    'No. It is the HTSUS general rate for the candidate code as published by the USITC on the date shown. Your final duty depends on the confirmed classification, additional tariffs that apply to your origin, entry fees and your broker\'s fee.',
  ],
  [
    'Why does the country of manufacture matter?',
    'Additional tariffs apply by origin, and origin follows where the goods are manufactured — not where they ship from. The base HTS rate can also differ between origins under special programs.',
  ],
  [
    'Does the AI model choose the tariff?',
    'No. The model only proposes candidate classifications. Every rate on this page is fetched from the official USITC schedule, and the date of that lookup is displayed with the result.',
  ],
  [
    'Can Sourcing Lab USA classify my product for customs?',
    'We provide working classification research, subject to confirmation by the importer or customs broker. On request, the working classification is written into your quotation — and a licensed customs broker confirms it.',
  ],
] as const;

export const dutyCalculatorSteps = [
  {
    name: 'The model classifies, it never prices.',
    text: 'GLM, our AI classification model, reads your product description and proposes the most likely HTSUS candidate codes — material, use and composition decide the chapter.',
  },
  {
    name: 'The rate comes from the official schedule.',
    text: 'Each candidate code is looked up in the U.S. International Trade Commission\'s HTS at the moment of your request, and the date of the check is shown with the result.',
  },
  {
    name: 'Additional tariffs stay a layer to verify.',
    text: 'Additional tariffs on Chinese-origin goods — Section 301 among them — are set and changed by government action. They are described, never hard-coded: your customs broker confirms the layers in force for your code and origin.',
  },
  {
    name: 'Before an order, it is confirmed.',
    text: 'A licensed customs broker confirms classification and duty rates. Sourcing Lab USA is not a customs broker and is not the importer of record.',
  },
] as const;
