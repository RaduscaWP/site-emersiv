'use client'
import { useEffect, useRef } from 'react'

export default function ZenSection() {
  const sectionRef = useRef(null)
  const bambooRef = useRef(null)
  const treeRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    let ctx
    ;(async () => {
      const mod = await import('gsap')
      const gsap = mod.gsap || mod.default
      const st = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(st.ScrollTrigger)

      ctx = gsap.context(() => {
        // Bamboo slides in from left
        gsap.fromTo(
          bambooRef.current,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        // Tree slides in from right
        gsap.fromTo(
          treeRef.current,
          { x: 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        // Dark overlay fades in as we scroll through
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'center 60%',
              end: 'bottom top',
              scrub: 1,
            },
          }
        )
      }, sectionRef)
    })()

    return () => ctx && ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#f5f0e8',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Bamboo stalks left */}
      <div
        ref={bambooRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: '5%',
          width: 140,
          willChange: 'transform, opacity',
        }}
      >
        <svg viewBox="0 0 140 600" style={{ width: '100%', height: 'auto' }}>
          {/* Multiple bamboo stalks */}
          {[15, 40, 65, 90, 115].map((x, i) => (
            <g key={x}>
              <rect
                x={x - 7}
                y={0}
                width={12}
                height={600}
                rx={6}
                fill={`hsl(${120 + i * 5}, ${30 + i * 3}%, ${25 + i * 4}%)`}
              />
              {/* Nodes */}
              {[80, 200, 320, 440, 560].map((y) => (
                <rect key={y} x={x - 9} y={y - 4} width={16} height={8} rx={4} fill={`hsl(${115 + i * 5}, 30%, 22%)`} />
              ))}
              {/* Leaves */}
              <path
                d={`M${x} ${50 + i * 30} Q${x + 30} ${30 + i * 30} ${x + 50} ${60 + i * 30}`}
                stroke={`hsl(${115 + i * 5}, 50%, 30%)`}
                strokeWidth="3"
                fill="none"
              />
              <path
                d={`M${x} ${150 + i * 20} Q${x - 30} ${130 + i * 20} ${x - 50} ${165 + i * 20}`}
                stroke={`hsl(${115 + i * 5}, 45%, 28%)`}
                strokeWidth="2.5"
                fill="none"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Japanese maple / red tree right */}
      <div
        ref={treeRef}
        style={{
          position: 'absolute',
          bottom: 0,
          right: '3%',
          width: 280,
          willChange: 'transform, opacity',
        }}
      >
        <svg viewBox="0 0 280 600" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <radialGradient id="treeLeaf" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e55b20" />
              <stop offset="50%" stopColor="#c0392b" />
              <stop offset="100%" stopColor="#8B0000" />
            </radialGradient>
          </defs>

          {/* Trunk */}
          <path d="M130 600 Q125 500 120 400 Q118 350 115 300 Q112 250 110 200" stroke="#3d2010" strokeWidth="18" fill="none" strokeLinecap="round" />
          {/* Main branches */}
          <path d="M115 280 Q80 240 50 200 Q30 170 20 140" stroke="#3d2010" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M115 280 Q150 230 180 180 Q200 150 220 120" stroke="#3d2010" strokeWidth="9" fill="none" strokeLinecap="round" />
          <path d="M115 320 Q90 280 70 250" stroke="#3d2010" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M115 340 Q145 300 170 270" stroke="#3d2010" strokeWidth="6" fill="none" strokeLinecap="round" />

          {/* Foliage clusters */}
          {[
            [60, 120, 70], [140, 80, 80], [220, 100, 65], [20, 140, 55],
            [190, 160, 60], [80, 200, 50], [160, 180, 55], [50, 240, 45],
            [100, 80, 60], [200, 120, 55], [30, 180, 40], [170, 240, 48],
          ].map(([cx, cy, r], i) => (
            <ellipse
              key={i}
              cx={cx}
              cy={cy}
              rx={r * (0.8 + Math.sin(i) * 0.2)}
              ry={r * 0.7}
              fill="url(#treeLeaf)"
              opacity={0.7 + (i % 3) * 0.1}
            />
          ))}

          {/* Falling leaves */}
          {[[240, 200, 12], [260, 300, 8], [10, 350, 10], [250, 400, 9]].map(([x, y, size], i) => (
            <path
              key={i}
              d={`M${x} ${y} Q${x + size} ${y - size} ${x + size * 2} ${y} Q${x + size} ${y + size} ${x} ${y}`}
              fill="#c0392b"
              opacity={0.6}
            />
          ))}
        </svg>
      </div>

      {/* Ground line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'rgba(100,60,30,0.3)',
        }}
      />

      {/* Center text (scroll hint) */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <div
          style={{
            fontSize: 14,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(60,30,10,0.4)',
            fontWeight: 600,
          }}
        >
          The journey begins
        </div>
      </div>

      {/* Dark overlay for transition to end-card */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(5,0,0,0.92)',
          pointerEvents: 'none',
          opacity: 0,
        }}
      />
    </section>
  )
}
