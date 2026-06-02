'use client'

export default function KatanaSVG({ style = {}, className = '' }) {
  return (
    <svg
      viewBox="0 0 900 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id="bladeGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="30%" stopColor="#8B0000" />
          <stop offset="50%" stopColor="#e74c3c" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#ff6b6b" />
          <stop offset="70%" stopColor="#c0392b" />
          <stop offset="100%" stopColor="#0d0d0d" />
        </linearGradient>
        <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="20%" stopColor="rgba(255,200,192,0.6)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="80%" stopColor="rgba(255,200,192,0.4)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="40%" stopColor="rgba(192,57,43,0.3)" />
          <stop offset="50%" stopColor="rgba(231,76,60,0.6)" />
          <stop offset="60%" stopColor="rgba(192,57,43,0.3)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <filter id="swordGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="edgeGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer glow */}
      <ellipse cx="450" cy="88" rx="400" ry="12" fill="rgba(192,57,43,0.15)" filter="url(#edgeGlow)" />

      {/* Blade body */}
      <path
        d="M820 82 L60 78 L20 88 L60 98 L820 94 L840 88 Z"
        fill="url(#bladeGrad)"
      />

      {/* Sharp edge highlight */}
      <path
        d="M820 82 L60 78 L20 88"
        stroke="url(#edgeGrad)"
        strokeWidth="1.5"
        fill="none"
        filter="url(#edgeGlow)"
      />

      {/* Red glow streak on blade */}
      <path
        d="M820 88 L60 88"
        stroke="url(#glowGrad)"
        strokeWidth="8"
        fill="none"
        opacity="0.7"
      />

      {/* Guard (tsuba) */}
      <rect x="68" y="72" width="14" height="32" rx="2" fill="#2a1a1a" stroke="#c0392b" strokeWidth="1" />
      <ellipse cx="75" cy="88" rx="5" ry="14" fill="none" stroke="rgba(192,57,43,0.6)" strokeWidth="1" />

      {/* Handle (tsuka) */}
      <rect x="20" y="82" width="48" height="12" rx="2" fill="#1a0f0f" />
      {/* Handle wrapping */}
      {[28, 34, 40, 46, 52, 58].map((x) => (
        <line key={x} x1={x} y1="82" x2={x - 4} y2="94" stroke="rgba(192,57,43,0.4)" strokeWidth="1.5" />
      ))}

      {/* Blade tip */}
      <path d="M820 82 L840 88 L820 94" fill="#8B0000" />

      {/* Central glow line */}
      <line x1="200" y1="88" x2="750" y2="88" stroke="rgba(255,100,80,0.4)" strokeWidth="3" filter="url(#edgeGlow)" />
    </svg>
  )
}
