export default function LogoSvg({ size = 48, className = '' }) {
  // Pearl bead positions along a cubic bezier arc (pre-computed)
  const beads = [
    [240, 55,  4.5],
    [178, 70,  5.6],
    [132, 96,  6.7],
    [99,  131, 7.8],
    [77,  172, 8.9],
    [66,  219, 10.1],
    [64,  263, 11.2],
    [69,  303, 12.3],
    [80,  338, 13.4],
    [95,  365, 14.5],
  ]

  // Bag handle bead arc (pre-computed quadratic arc)
  const handleBeads = [
    [308, 294, 3.8],
    [322, 276, 4.0],
    [340, 263, 4.2],
    [358, 258, 4.3],
    [376, 261, 4.2],
    [393, 271, 4.0],
    [406, 288, 3.8],
  ]

  return (
    <svg
      viewBox="0 0 500 500"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Main gold gradient */}
        <linearGradient id="lgA" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%"   stopColor="#f5e888"/>
          <stop offset="35%"  stopColor="#d4a843"/>
          <stop offset="70%"  stopColor="#c89420"/>
          <stop offset="100%" stopColor="#9b7015"/>
        </linearGradient>

        {/* Gold for text */}
        <linearGradient id="lgText" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#d4a843"/>
          <stop offset="100%" stopColor="#b8800a"/>
        </linearGradient>

        {/* 3D pearl bead */}
        <radialGradient id="pearl" cx="32%" cy="28%" r="58%">
          <stop offset="0%"   stopColor="#fdf4c0"/>
          <stop offset="25%"  stopColor="#e8c85a"/>
          <stop offset="60%"  stopColor="#c89420"/>
          <stop offset="88%"  stopColor="#a07010"/>
          <stop offset="100%" stopColor="#7a5208"/>
        </radialGradient>

        {/* Bag woven clip */}
        <clipPath id="bagClip">
          <path d="M 302,302 Q 294,302 294,312 L 296,418 Q 297,428 310,428 L 444,428 Q 457,428 458,418 L 460,312 Q 460,302 452,302 Z"/>
        </clipPath>

        {/* Woven pattern */}
        <pattern id="weave" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
          <line x1="0" y1="14" x2="14" y2="0" stroke="url(#lgA)" strokeWidth="1.4" opacity="0.7"/>
          <line x1="-4" y1="14" x2="10" y2="0" stroke="url(#lgA)" strokeWidth="0.8" opacity="0.3"/>
          <line x1="4" y1="14" x2="18" y2="0" stroke="url(#lgA)" strokeWidth="0.8" opacity="0.3"/>
          <line x1="0" y1="0" x2="14" y2="14" stroke="url(#lgA)" strokeWidth="1.4" opacity="0.4"/>
        </pattern>
      </defs>

      {/* Cream background */}
      <rect width="500" height="500" fill="#f5f0ea"/>

      {/* ── Monogram letters H & G ── */}

      {/* H shadow layer */}
      <text
        x="55" y="325"
        fontFamily="Georgia,'Times New Roman',serif"
        fontSize="275"
        fontWeight="700"
        fill="#c89420"
        opacity="0.18"
        transform="translate(3,3)"
      >H</text>

      {/* G shadow layer */}
      <text
        x="220" y="318"
        fontFamily="Georgia,'Times New Roman',serif"
        fontSize="248"
        fontWeight="700"
        fill="#c89420"
        opacity="0.18"
        transform="translate(3,3)"
      >G</text>

      {/* H main */}
      <text
        x="55" y="325"
        fontFamily="Georgia,'Times New Roman',serif"
        fontSize="275"
        fontWeight="700"
        fill="url(#lgA)"
      >H</text>

      {/* G main */}
      <text
        x="220" y="318"
        fontFamily="Georgia,'Times New Roman',serif"
        fontSize="248"
        fontWeight="700"
        fill="url(#lgA)"
      >G</text>

      {/* ── Pearl bead arc ── */}
      {beads.map(([cx, cy, r], i) => (
        <circle key={`b${i}`} cx={cx} cy={cy} r={r} fill="url(#pearl)"/>
      ))}

      {/* ── Woven bag ── */}

      {/* Bag handle bead loop */}
      {handleBeads.map(([cx, cy, r], i) => (
        <circle key={`h${i}`} cx={cx} cy={cy} r={r} fill="url(#pearl)"/>
      ))}

      {/* Bag body fill */}
      <path
        d="M 302,302 Q 294,302 294,312 L 296,418 Q 297,428 310,428 L 444,428 Q 457,428 458,418 L 460,312 Q 460,302 452,302 Z"
        fill="url(#lgA)"
        opacity="0.12"
      />

      {/* Bag woven texture */}
      <rect x="294" y="302" width="166" height="126" fill="url(#weave)" clipPath="url(#bagClip)"/>

      {/* Bag body outline */}
      <path
        d="M 302,302 Q 294,302 294,312 L 296,418 Q 297,428 310,428 L 444,428 Q 457,428 458,418 L 460,312 Q 460,302 452,302 Z"
        fill="none"
        stroke="url(#lgA)"
        strokeWidth="2.2"
      />

      {/* Bag horizontal band (top trim) */}
      <line x1="294" y1="328" x2="460" y2="328" stroke="url(#lgA)" strokeWidth="1.8" opacity="0.6"/>

      {/* ── Tassel ── */}
      {/* Tassel cap */}
      <ellipse cx="377" cy="430" rx="22" ry="7" fill="url(#lgA)" opacity="0.75"/>
      {/* Tassel strings */}
      {[356,362,368,374,380,386,392,398].map((x, i) => (
        <line
          key={`t${i}`}
          x1={x} y1={432}
          x2={x + (i % 3 === 0 ? -2 : i % 3 === 1 ? 0 : 2)}
          y2={460}
          stroke="url(#lgA)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.85"
        />
      ))}
      {/* Tassel knot */}
      <ellipse cx="377" cy="436" rx="10" ry="5" fill="url(#lgA)" opacity="0.6"/>

      {/* ── Brand name ── */}
      <text
        x="250" y="446"
        fontFamily="Georgia,'Times New Roman',serif"
        fontSize="28"
        fontWeight="400"
        fill="url(#lgText)"
        textAnchor="middle"
        letterSpacing="5.5"
      >HG CHRISTIQUE</text>

      {/* Ornament divider */}
      <line x1="78"  y1="458" x2="192" y2="458" stroke="url(#lgText)" strokeWidth="0.8" opacity="0.5"/>
      <line x1="308" y1="458" x2="422" y2="458" stroke="url(#lgText)" strokeWidth="0.8" opacity="0.5"/>
      <circle cx="250" cy="458" r="3"   fill="url(#lgText)"/>
      <circle cx="243" cy="458" r="1.8" fill="url(#lgText)" opacity="0.65"/>
      <circle cx="257" cy="458" r="1.8" fill="url(#lgText)" opacity="0.65"/>

      {/* Tagline */}
      <text
        x="250" y="482"
        fontFamily="system-ui,Arial,sans-serif"
        fontSize="12"
        fill="url(#lgText)"
        textAnchor="middle"
        letterSpacing="3.2"
        opacity="0.78"
      >BEADS · CROCHET · ACCESSORIES</text>
    </svg>
  )
}
