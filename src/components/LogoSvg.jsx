export default function LogoSvg({ size = 48, className = '' }) {
  const h = Math.round(size * 340 / 300)
  return (
    <svg
      viewBox="0 0 300 340"
      width={size}
      height={h}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lgold" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%"   stopColor="#f5e27a"/>
          <stop offset="45%"  stopColor="#c8a030"/>
          <stop offset="100%" stopColor="#8b6510"/>
        </linearGradient>
      </defs>

      {/* Circle arc — right/top solid */}
      <path
        d="M 150 30 A 100 100 0 1 1 72 198"
        fill="none"
        stroke="url(#lgold)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Pearl bead chain along left arc */}
      {[
        [64, 211, 6.5],
        [57, 192, 4],
        [52, 172, 3.5],
        [50, 151, 3.5],
        [51, 130, 3.5],
        [56, 110, 3.5],
        [65, 91,  3.5],
        [78, 74,  3.5],
        [94, 60,  3.5],
        [113, 50, 3.5],
        [133, 44, 3.5],
        [150, 42, 3.5],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="url(#lgold)" />
      ))}

      {/* Large S — behind figure */}
      <text
        x="90" y="178"
        fontFamily="Georgia,'Times New Roman',serif"
        fontSize="116"
        fontWeight="bold"
        fill="url(#lgold)"
        opacity="0.85"
      >S</text>

      {/* Large B — behind figure */}
      <text
        x="162" y="176"
        fontFamily="Georgia,'Times New Roman',serif"
        fontSize="104"
        fontWeight="bold"
        fill="url(#lgold)"
        opacity="0.80"
      >B</text>

      {/* ── Woman silhouette ── */}

      {/* Hair updo bun */}
      <ellipse cx="158" cy="60" rx="9" ry="7" fill="url(#lgold)" />
      <ellipse cx="162" cy="64" rx="5" ry="4" fill="url(#lgold)" />

      {/* Head */}
      <ellipse cx="157" cy="75" rx="12" ry="14" fill="url(#lgold)" />

      {/* Neck */}
      <rect x="153" y="87" width="8" height="10" rx="3" fill="url(#lgold)" />

      {/* Body — fitted torso, wide gown, dramatic train sweeping right */}
      <path
        d="
          M 161 97
          C 166 100 170 106 170 114
          C 170 122 167 130 165 138
          C 163 145 163 152 167 160
          C 172 168 182 172 194 170
          C 208 168 220 160 228 164
          C 222 174 208 184 194 192
          C 180 199 167 206 158 208
          L 150 207
          C 141 205 134 198 132 188
          C 130 178 132 165 135 154
          C 138 143 139 132 138 122
          C 137 112 140 101 145 97
          C 149 94 156 94 161 97
          Z
        "
        fill="url(#lgold)"
      />

      {/* Left arm — hand on hip */}
      <path
        d="M 138 122 C 130 117 122 119 118 126 C 116 131 118 136 123 136 C 130 134 136 128 138 124 Z"
        fill="url(#lgold)"
      />

      {/* Right arm — slightly bent, elegant */}
      <path
        d="M 165 110 C 172 106 180 108 183 115 C 185 120 183 125 179 125 C 174 122 168 117 165 113 Z"
        fill="url(#lgold)"
      />

      {/* StyleBoss wordmark */}
      <text
        x="150" y="243"
        fontFamily="Georgia,'Times New Roman',serif"
        fontSize="34"
        fontStyle="italic"
        fontWeight="400"
        fill="url(#lgold)"
        textAnchor="middle"
        letterSpacing="1"
      >StyleBoss</text>

      {/* Ornament divider */}
      <line x1="82"  y1="255" x2="130" y2="255" stroke="url(#lgold)" strokeWidth="0.9" opacity="0.55"/>
      <line x1="170" y1="255" x2="218" y2="255" stroke="url(#lgold)" strokeWidth="0.9" opacity="0.55"/>
      <circle cx="150" cy="255" r="3"   fill="url(#lgold)" />
      <circle cx="143" cy="255" r="1.8" fill="url(#lgold)" />
      <circle cx="157" cy="255" r="1.8" fill="url(#lgold)" />

      {/* Tagline */}
      <text
        x="150" y="279"
        fontFamily="system-ui,Arial,sans-serif"
        fontSize="20"
        fill="url(#lgold)"
        textAnchor="middle"
        letterSpacing="3"
        fontWeight="600"
      >BE A BOSS WITH STYLE</text>
    </svg>
  )
}
