import type { ProductIllustrationKind } from '@/lib/product-media';

/**
 * Drawn product figures used until a real photograph or render exists for a
 * product. They are deliberately illustrations, not simulated photography: the
 * site must never imply it is showing a finished job it cannot document.
 * ProductMedia swaps each one out as soon as the manifest carries a file.
 */

const PAPER_LIGHT = '#efe4d0';
const PAPER_MID = '#d3c0a1';
const PAPER_DARK = '#a8927a';
const CLOTH_LIGHT = '#e2e9e5';
const CLOTH_MID = '#b7c5bd';
const CLOTH_DARK = '#8b9c94';
const EDGE = 'rgba(10,14,12,0.28)';

function Ground({ id }: { id: string }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-glow`} cx="50%" cy="42%" r="58%">
          <stop offset="0%" stopColor="#8b9c76" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#8b9c76" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-shadow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-glow)`} />
      <ellipse cx="205" cy="272" rx="118" ry="16" fill={`url(#${id}-shadow)`} />
    </>
  );
}

function RigidBox({ id }: { id: string }) {
  return (
    <>
      <Ground id={id} />
      {/* Base, with the open cavity showing just under the rim */}
      <path d="M200 150L283.1 198L217.3 236L134.2 188Z" fill={PAPER_LIGHT} />
      <path d="M200 152L272.7 194L217.3 226L144.6 184Z" fill="#0a0e0c" opacity="0.55" />
      <path d="M144.6 186L217.3 228L217.3 226L144.6 184Z" fill="#0a0e0c" opacity="0.7" />
      <path d="M283.1 238L217.3 276L217.3 236L283.1 198Z" fill={PAPER_MID} />
      <path d="M134.2 228L217.3 276L217.3 236L134.2 188Z" fill={PAPER_DARK} />
      {/* Lid, lifted just clear of the base */}
      <path d="M197 95L287.1 147L214.3 189L124.3 137Z" fill={PAPER_LIGHT} />
      <path d="M287.1 160L214.3 202L214.3 189L287.1 147Z" fill={PAPER_MID} />
      <path d="M124.3 150L214.3 202L214.3 189L124.3 137Z" fill={PAPER_DARK} />
      {/* Foil-stamped brand mark on the lid */}
      <path d="M181 136L215 156L197 166L163 146Z" fill="#8b9c76" opacity="0.85" />
      <g stroke={EDGE} strokeWidth="1.2" fill="none">
        <path d="M197 95L287.1 147L214.3 189L124.3 137Z" />
        <path d="M200 150L283.1 198L217.3 236L134.2 188Z" />
      </g>
    </>
  );
}

function MailerCarton({ id }: { id: string }) {
  return (
    <>
      <Ground id={id} />
      <path d="M200 88L295.3 143L219.1 187L123.8 132Z" fill={PAPER_LIGHT} />
      <path d="M295.3 205L219.1 249L219.1 187L295.3 143Z" fill={PAPER_MID} />
      <path d="M123.8 194L219.1 249L219.1 187L123.8 132Z" fill={PAPER_DARK} />
      {/* Tape running along the centre seam, clipped to the top face */}
      <defs>
        <clipPath id={`${id}-top`}>
          <path d="M200 88L295.3 143L219.1 187L123.8 132Z" />
        </clipPath>
      </defs>
      <path
        d="M155 99L263 161L263 176L155 114Z"
        fill="#f6efe1"
        opacity="0.5"
        clipPath={`url(#${id}-top)`}
      />
      <g stroke={EDGE} strokeWidth="1.4" fill="none">
        <path d="M161.9 110L257.2 165" />
      </g>
      {/* Printed side panel */}
      <path d="M239 205L281 181L281 197L239 221Z" fill="#8b9c76" opacity="0.6" />
      <path d="M143 176L191 204L191 216L143 188Z" fill="#0a0e0c" opacity="0.3" />
      <g stroke={EDGE} strokeWidth="1.2" fill="none">
        <path d="M200 88L295.3 143L219.1 187L123.8 132Z" />
      </g>
    </>
  );
}

function PaperBag({ id }: { id: string }) {
  return (
    <>
      <Ground id={id} />
      {/* Gusset */}
      <path d="M258 116L298 96L302 244L262 264Z" fill={PAPER_DARK} />
      {/* Front face */}
      <path d="M148 116L258 116L262 264L152 264Z" fill={PAPER_LIGHT} />
      {/* Folded top band */}
      <path d="M148 116L258 116L258 138L148 138Z" fill={PAPER_MID} />
      <path d="M258 116L298 96L298 118L258 138Z" fill="#96826c" />
      {/* Rope handles */}
      <g fill="none" stroke={PAPER_DARK} strokeWidth="4" strokeLinecap="round">
        <path d="M176 118C176 84 230 84 230 118" />
      </g>
      <g fill="none" stroke="#8a7660" strokeWidth="3.5" strokeLinecap="round">
        <path d="M270 112C276 88 292 84 296 96" />
      </g>
      {/* Print area */}
      <rect x="172" y="168" width="62" height="34" rx="4" fill="#8b9c76" opacity="0.72" />
      <rect x="172" y="212" width="40" height="7" rx="3.5" fill="#0a0e0c" opacity="0.22" />
      <g stroke={EDGE} strokeWidth="1.2" fill="none">
        <path d="M148 116L258 116L262 264L152 264Z" />
        <path d="M258 116L298 96L302 244L262 264" />
      </g>
    </>
  );
}

function PrintedLabel({ id }: { id: string }) {
  return (
    <>
      <Ground id={id} />
      {/* Backing sheet */}
      <rect x="112" y="92" width="176" height="132" rx="10" fill={PAPER_DARK} opacity="0.5" />
      {/* Label face */}
      <rect x="124" y="82" width="176" height="132" rx="12" fill={PAPER_LIGHT} />
      <rect x="124" y="82" width="176" height="30" rx="12" fill="#8b9c76" opacity="0.82" />
      <rect x="124" y="100" width="176" height="12" fill="#8b9c76" opacity="0.82" />
      {/* Copy lines */}
      <g fill="#0a0e0c" opacity="0.24">
        <rect x="144" y="130" width="104" height="9" rx="4.5" />
        <rect x="144" y="150" width="132" height="7" rx="3.5" />
        <rect x="144" y="166" width="88" height="7" rx="3.5" />
      </g>
      {/* Barcode */}
      <g fill="#0a0e0c" opacity="0.5">
        {[0, 6, 10, 17, 21, 28, 34, 38, 45, 51].map((offset, index) => (
          <rect
            key={offset}
            x={144 + offset}
            y="186"
            width={index % 3 === 0 ? 4 : 2}
            height="18"
          />
        ))}
      </g>
      {/* Peeled corner */}
      <path d="M300 214L266 214C286 208 296 196 300 178Z" fill={PAPER_MID} />
      <rect
        x="124"
        y="82"
        width="176"
        height="132"
        rx="12"
        fill="none"
        stroke={EDGE}
        strokeWidth="1.2"
      />
    </>
  );
}

function ToteBag({ id }: { id: string }) {
  return (
    <>
      <Ground id={id} />
      {/* Handles */}
      <g fill="none" stroke={CLOTH_MID} strokeWidth="9" strokeLinecap="round">
        <path d="M170 136C170 98 190 84 205 84" />
        <path d="M240 136C240 98 220 84 205 84" />
      </g>
      {/* Body */}
      <path
        d="M146 132L264 132L274 258Q274 268 264 268L146 268Q136 268 136 258Z"
        fill={CLOTH_LIGHT}
      />
      {/* Side shading */}
      <path d="M232 132L264 132L274 258Q274 268 264 268L240 268Z" fill={CLOTH_MID} opacity="0.55" />
      {/* Seam and stitching */}
      <path
        d="M146 132L264 132"
        stroke={CLOTH_DARK}
        strokeWidth="2"
        strokeDasharray="6 5"
        fill="none"
      />
      <path
        d="M141 250L271 250"
        stroke={CLOTH_DARK}
        strokeWidth="1.6"
        strokeDasharray="5 6"
        fill="none"
        opacity="0.6"
      />
      {/* Screen-printed brand block */}
      <rect x="170" y="176" width="66" height="40" rx="5" fill="#8b9c76" opacity="0.78" />
      <rect x="170" y="224" width="44" height="7" rx="3.5" fill="#0a0e0c" opacity="0.2" />
      <path
        d="M146 132L264 132L274 258Q274 268 264 268L146 268Q136 268 136 258Z"
        fill="none"
        stroke={EDGE}
        strokeWidth="1.2"
      />
    </>
  );
}

function FabricStack({ id }: { id: string }) {
  const layers = [
    { y: 236, face: CLOTH_DARK, top: CLOTH_MID },
    { y: 200, face: CLOTH_MID, top: CLOTH_LIGHT },
    { y: 164, face: '#c9d6ce', top: '#eef3f0' },
    { y: 128, face: '#b9ccc3', top: '#d4e8a8' },
  ];

  return (
    <>
      <Ground id={id} />
      {layers.map(({ y, face, top }) => (
        <g key={y}>
          {/* Folded top surface, then the front face below it */}
          <path
            d={`M126 ${y}C166 ${y - 14} 236 ${y + 10} 282 ${y - 6}L282 ${y + 12}C236 ${
              y + 28
            } 166 ${y + 4} 126 ${y + 18}Z`}
            fill={top}
            opacity={top === '#d4e8a8' ? 0.78 : 1}
          />
          <path
            d={`M126 ${y + 18}C166 ${y + 4} 236 ${y + 28} 282 ${y + 12}L282 ${y + 26}C236 ${
              y + 42
            } 166 ${y + 18} 126 ${y + 32}Z`}
            fill={face}
          />
          <path
            d={`M126 ${y}C166 ${y - 14} 236 ${y + 10} 282 ${y - 6}`}
            fill="none"
            stroke={EDGE}
            strokeWidth="1.1"
          />
        </g>
      ))}
    </>
  );
}

const ILLUSTRATIONS: Record<
  ProductIllustrationKind,
  (props: { id: string }) => React.ReactElement
> = {
  rigidBox: RigidBox,
  mailerCarton: MailerCarton,
  paperBag: PaperBag,
  printedLabel: PrintedLabel,
  toteBag: ToteBag,
  fabricStack: FabricStack,
};

export function ProductIllustration({
  kind,
  className,
}: {
  kind: ProductIllustrationKind;
  className?: string;
}) {
  const Figure = ILLUSTRATIONS[kind];

  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <Figure id={kind} />
    </svg>
  );
}
