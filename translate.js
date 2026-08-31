const fs = require('fs');
let content = fs.readFileSync('src/components/es/MarketingSectionsES.tsx', 'utf8');

const translations = {
  "Your brand's physical touchpoints": "Los puntos de contacto físicos de su marca",
  "Custom products, sourced directly": "Productos personalizados, sourcing directo",
  "We bridge the gap between U.S. design expectations and China's manufacturing capabilities.": "Cerramos la brecha entre las expectativas de diseño en EE.UU. y las capacidades de fabricación de China.",
  "Custom Packaging Sourcing": "Sourcing de Empaques Personalizados",
  "Custom Textile Sourcing": "Sourcing de Textiles Personalizados",
  "Direct from manufacturer": "Directo del fabricante",
  "Quality control included": "Control de calidad incluido",
  "Built to specification": "Fabricado según especificaciones",
  "The Sourcing Process": "El Proceso de Sourcing",
  "How we work": "Cómo trabajamos",
  "Our approach is built on transparency and strict quality control.": "Nuestro enfoque se basa en la transparencia y un estricto control de calidad.",
  "Share your design, specs, and quantities. We analyze feasibility and identify the right factory profile.": "Comparta su diseño, especificaciones y cantidades. Analizamos la viabilidad e identificamos el perfil de fábrica adecuado.",
  "We leverage our network to provide a landed quote and produce a pre-production sample for your approval.": "Utilizamos nuestra red para proporcionar una cotización DDP y producimos una muestra de preproducción para su aprobación.",
  "Our local team monitors production and performs a strict quality inspection before goods are cleared for shipment.": "Nuestro equipo local supervisa la producción y realiza una estricta inspección de calidad antes del envío.",
  "We handle the export, freight, and U.S. customs clearance, delivering directly to your door.": "Gestionamos la exportación, el flete y el despacho de aduanas en EE.UU., entregando directamente a su puerta.",
  "Why Sourcing Lab USA": "Por qué Sourcing Lab USA",
  "The right partners": "Los socios adecuados",
  "We don't just find factories; we manage them.": "No solo encontramos fábricas; las gestionamos.",
  "Start with your brief": "Comience con su briefing",
  "Ready to develop your next product?": "¿Listo para desarrollar su próximo producto?",
  "Send us the product, quantity, design references, destination, and timing. We will review the project and come back with the right next step.": "Envíenos el producto, cantidad, referencias de diseño, destino y cronograma. Revisaremos el proyecto y le daremos el siguiente paso adecuado.",
  "Or contact us directly": "O contáctenos directamente",
  "Frequently asked questions": "Preguntas frecuentes",
  "Everything you need to know about our sourcing services.": "Todo lo que necesita saber sobre nuestros servicios de sourcing.",
  "Do you only source packaging?": "¿Solo realizan sourcing de empaques?",
  "No. Our initial focus is custom packaging and textile products for brands, e-commerce businesses, and companies.": "No. Nuestro enfoque inicial son los empaques y productos textiles personalizados para marcas y empresas de comercio electrónico.",
  "Where are you based?": "¿Dónde están ubicados?",
  "Sourcing Lab USA is preparing its U.S. market launch from Miami for 2027, supported by an established China sourcing partnership.": "Sourcing Lab USA está preparando su lanzamiento en EE.UU. desde Miami para 2027, respaldado por una alianza establecida de sourcing en China.",
  "Can you work from an existing design or sample?": "¿Pueden trabajar a partir de un diseño o muestra existente?",
  "Yes. Send your brief, reference images, dimensions, quantity, and target timing. We will confirm what can be quoted and sampled.": "Sí. Envíe su briefing, imágenes de referencia, dimensiones, cantidad y cronograma. Confirmaremos lo que se puede cotizar y muestrear.",
  "Who handles compliance and import requirements?": "¿Quién gestiona los requisitos de cumplimiento e importación?",
  "Requirements depend on the exact product and destination. Product specifications, certificates, shipping terms, and importer responsibilities are confirmed for each order before production and shipment.": "Los requisitos dependen del producto exacto y el destino. Las especificaciones, certificados y términos de envío se confirman antes de la producción."
};

for (const [en, es] of Object.entries(translations)) {
  content = content.replace(en, es);
}

// Also change component name
content = content.replace(/export function MarketingSections/g, 'export function MarketingSectionsES');

fs.writeFileSync('src/components/es/MarketingSectionsES.tsx', content);
