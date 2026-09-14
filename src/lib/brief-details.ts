/** Optional qualification is stored with the brief in both existing delivery channels. */
export const BRIEF_DETAIL_FIELDS = [
  { key: 'budget', en: 'Purchasing budget and currency', es: 'Presupuesto de compra y moneda', placeholder: 'e.g. USD 10,000; say what it includes' },
  { key: 'targetMarket', en: 'Target market / delivery destination', es: 'Mercado / destino de entrega', placeholder: 'e.g. United States, Miami' },
  { key: 'customization', en: 'Customization needed', es: 'Personalización necesaria', placeholder: 'e.g. logo, material, dimensions, finish' },
  { key: 'supplierStatus', en: 'Current supplier or sample status', es: 'Estado del proveedor o muestra', placeholder: 'e.g. no supplier yet; sample available' },
  { key: 'targetTimeline', en: 'Target timeline and flexibility', es: 'Plazo objetivo y flexibilidad', placeholder: 'e.g. target arrival month; flexible or fixed' },
] as const;

export type BriefDetailKey = (typeof BRIEF_DETAIL_FIELDS)[number]['key'];
export type BriefDetails = Record<BriefDetailKey, string>;
export const EMPTY_BRIEF_DETAILS: BriefDetails = {
  budget: '', targetMarket: '', customization: '', supplierStatus: '', targetTimeline: '',
};

export function formatBriefMessage(message: string, details: BriefDetails): string {
  const lines = BRIEF_DETAIL_FIELDS.flatMap(({ key, en }) => {
    const value = details[key].trim();
    return value ? [`${en}: ${value}`] : [];
  });
  return [message.trim(), ...lines].filter(Boolean).join('\n');
}
