/**
 * Decorative line art, one per service. Strokes follow the card's text colour and
 * the filled accents follow its tint, so each illustration inherits the card theme.
 */
const S = { stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
const A = "var(--accent)";

const art = [
  // Website Development — browser window with content blocks.
  <>
    <rect x="11" y="13" width="98" height="70" rx="9" {...S} />
    <path d="M11 31h98" {...S} />
    <circle cx="22" cy="22" r="2.7" fill={A} />
    <circle cx="31" cy="22" r="2.7" fill="currentColor" opacity=".4" />
    <circle cx="40" cy="22" r="2.7" fill="currentColor" opacity=".4" />
    <rect x="21" y="41" width="33" height="32" rx="5" fill={A} opacity=".32" />
    <rect x="21" y="41" width="33" height="32" rx="5" {...S} opacity=".65" />
    <path d="M64 44h35M64 54h27M64 64h35M64 73h19" {...S} />
  </>,

  // Database & Web Systems — stacked store feeding a dashboard.
  <>
    <ellipse cx="37" cy="24" rx="21" ry="7.5" {...S} />
    <path d="M16 24v36c0 4.1 9.4 7.5 21 7.5s21-3.4 21-7.5V24" {...S} />
    <path d="M16 42c0 4.1 9.4 7.5 21 7.5S58 46.1 58 42" {...S} />
    <ellipse cx="37" cy="24" rx="21" ry="7.5" fill={A} opacity=".25" />
    <rect x="70" y="30" width="39" height="43" rx="6" {...S} />
    <path d="M70 41h39" {...S} opacity=".6" />
    <path d="M79 64v-9M89 64v-16M99 64v-6" stroke={A} strokeWidth="3.6" strokeLinecap="round" />
  </>,

  // AI & Automation — an assistant wired into surrounding steps.
  <>
    <rect x="37" y="27" width="46" height="37" rx="11" {...S} />
    <path d="M60 27v-8" {...S} />
    <circle cx="60" cy="15" r="4.2" fill={A} />
    <circle cx="51" cy="43" r="3.6" fill={A} />
    <circle cx="69" cy="43" r="3.6" fill={A} />
    <path d="M52 55h16" {...S} opacity=".7" />
    <path d="M37 45H24M24 45V31M24 45v14M83 45h13" {...S} opacity=".75" />
    <circle cx="20" cy="29" r="3.4" fill="currentColor" opacity=".55" />
    <circle cx="20" cy="61" r="3.4" fill="currentColor" opacity=".55" />
    <circle cx="100" cy="45" r="3.4" fill={A} />
  </>,

  // UI/UX & Prototype — two screens linked by a flow.
  <>
    <rect x="11" y="19" width="37" height="50" rx="7" {...S} />
    <path d="M11 31h37" {...S} opacity=".6" />
    <rect x="18" y="38" width="23" height="6" rx="3" fill={A} opacity=".55" />
    <rect x="18" y="49" width="15" height="6" rx="3" fill="currentColor" opacity=".3" />
    <rect x="72" y="19" width="37" height="50" rx="7" {...S} />
    <path d="M72 31h37" {...S} opacity=".6" />
    <circle cx="90" cy="49" r="9" stroke={A} strokeWidth="2.4" fill="none" />
    <path d="M90 44v10M85 49h10" stroke={A} strokeWidth="2.4" strokeLinecap="round" />
    <path d="M53 44h14M62 39l5 5-5 5" {...S} />
  </>,

  // Digital Profiles — a profile card with shareable details.
  <>
    <rect x="13" y="17" width="94" height="62" rx="10" {...S} />
    <circle cx="41" cy="40" r="10" stroke={A} strokeWidth="2.4" fill="none" />
    <path d="M27 63c0-7.7 6.3-13.5 14-13.5S55 55.3 55 63" stroke={A} strokeWidth="2.4" strokeLinecap="round" fill="none" />
    <path d="M68 35h25M68 45h20M68 55h25" {...S} />
    <circle cx="41" cy="40" r="10" fill={A} opacity=".2" />
  </>,
];

export function ServiceArt({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 120 96" className="service-card-art" aria-hidden="true" focusable="false">
      {art[index] ?? null}
    </svg>
  );
}
