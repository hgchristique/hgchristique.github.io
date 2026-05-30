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

      {/* Circle arc — right/top solid, left side replaced by pearls */}
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

      {/* Large S */}
      <text
        x="98" y="176"
        fontFamily="Georgia,'Times New Roman',serif"
        fontSize="112"
        fontWeight="bold"
        fill="url(#lgold)"
        opacity="0.93"
      >S</text>

      {/* Large B */}
      <text
        x="166" y="174"
        fontFamily="Georgia,'Times New Roman',serif"
        fontSize="100"
        fontWeight="bold"
        fill="url(#lgold)"
        opacity="0.88"
      >B</text>

      {/* Woman silhouette — head */}
      <ellipse cx="155" cy="75" rx="11" ry="13" fill="url(#lgold)" />
      {/* Hair updo */}
      <ellipse cx="155" cy="64" rx="7" ry="5" fill="url(#lgold)" />

      {/* Body + flowing dress train */}
      <path
        d="
          M 148 88
          C 144 98 142 110 140 122
          L 136 146
          C 134 158 132 168 136 177
          L 142 191
          C 146 197 152 202 158 201
          C 167 195 179 184 194 169
          C 207 155 212 146 207 143
          C 198 155 182 164 172 168
          L 167 169
          C 164 162 161 153 159 142
          L 155 126
          C 153 118 152 108 152 99
          L 150 90
          C 149 89 149 88 148 88
          Z
        "
        fill="url(#lgold)"
      />

      {/* Left arm hand-on-hip */}
      <path
        d="M 140 110 C 134 107 127 109 123 115 C 121 119 122 123 126 124 C 132 122 137 117 140 112 Z"
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
        x="150" y="276"
        fontFamily="system-ui,Arial,sans-serif"
        fontSize="9"
        fill="url(#lgold)"
        textAnchor="middle"
        letterSpacing="3.5"
      >BE A BOSS WITH STYLE</text>
    </svg>
  )
}
