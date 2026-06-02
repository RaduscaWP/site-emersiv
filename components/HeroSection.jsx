'use client'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import KatanaSVG from './KatanaSVG'

const ThreeBackground = dynamic(() => import('./ThreeBackground'), { ssr: false })

export default function HeroSection() {
  const sectionRef = useRef(null)
  const swordRef = useRef(null)
  const masterRef = useRef(null)
  const brandingRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    let gsap, ScrollTrigger
    ;(async () => {
      const mod = await import('gsap')
      gsap = mod.gsap || mod.default
      const st = await import('gsap/ScrollTrigger')
      ScrollTrigger = st.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=1200',
            scrub: 1.2,
            pin: true,
          },
        })

        // Sword parallax - moves slower than scroll (upward exit)
        tl.to(swordRef.current, { y: -80, rotation: -3, duration: 1 }, 0)

        // "Master Your Skills" text exits up
        tl.to(masterRef.current, { y: -200, opacity: 0, duration: 0.5 }, 0)

        // "StringTune" branding scales and exits
        tl.to(brandingRef.current, {
          y: -120,
          scale: 1.3,
          opacity: 0,
          duration: 0.7,
        }, 0.1)

        // Card slides slightly
        tl.to(cardRef.current, { x: -60, opacity: 0, duration: 0.4 }, 0)
      }, sectionRef)

      return () => ctx.revert()
    })()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="noise"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(180deg, #080808 0%, #0f0808 50%, #0a0a0a 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient radial */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(120,20,20,0.25) 0%, transparent 70%)',
        }}
      />

      {/* Three.js particle field */}
      <ThreeBackground />

      {/* Sword — large diagonal element */}
      <div
        ref={swordRef}
        style={{
          position: 'absolute',
          top: '22%',
          left: '-5%',
          width: '110%',
          transform: 'rotate(-18deg)',
          transformOrigin: '50% 50%',
          zIndex: 10,
          willChange: 'transform',
        }}
      >
        <KatanaSVG
          style={{ width: '100%', height: 'auto' }}
          className="sword-glow"
        />
      </div>

      {/* "Master / Your / Skills" stacked text */}
      <div
        ref={masterRef}
        style={{
          position: 'absolute',
          top: '12%',
          right: '6%',
          textAlign: 'right',
          zIndex: 20,
        }}
      >
        {['Master', 'Your', 'Skills'].map((word, i) => (
          <div
            key={word}
            className="text-hero"
            style={{
              color: i === 2 ? 'rgba(248,200,192,0.9)' : 'white',
              display: 'block',
              lineHeight: 0.88,
            }}
          >
            {word}
          </div>
        ))}
      </div>

      {/* "StringTune" oversized at bottom */}
      <div
        ref={brandingRef}
        style={{
          position: 'absolute',
          bottom: '-4%',
          left: '-2%',
          zIndex: 5,
          whiteSpace: 'nowrap',
        }}
      >
        <span
          className="text-oversize"
          style={{
            color: 'rgba(248,200,192,0.18)',
            display: 'block',
            letterSpacing: '-0.05em',
            userSelect: 'none',
          }}
        >
          StringTune
        </span>
      </div>

      {/* Skill Hub card — left */}
      <div
        ref={cardRef}
        style={{
          position: 'absolute',
          left: '5%',
          top: '30%',
          width: 200,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8,
          overflow: 'hidden',
          zIndex: 30,
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Card thumbnail */}
        <div
          style={{
            height: 100,
            background: 'linear-gradient(135deg, #1a0808 0%, #2d1010 50%, #1a0808 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative diagonal lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 200 100">
            <line x1="0" y1="100" x2="200" y2="0" stroke="rgba(192,57,43,0.3)" strokeWidth="1" />
            <line x1="-40" y1="100" x2="160" y2="0" stroke="rgba(192,57,43,0.15)" strokeWidth="1" />
            <line x1="40" y1="100" x2="240" y2="0" stroke="rgba(192,57,43,0.15)" strokeWidth="1" />
          </svg>
          <div style={{ position: 'absolute', bottom: 8, left: 8, fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            New lesson
          </div>
        </div>
        <div style={{ padding: '10px 12px' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Skill Hub</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>Balance &amp; Control</div>
        </div>
      </div>

      {/* Dialog box — bottom right */}
      <div
        style={{
          position: 'absolute',
          bottom: '8%',
          right: '5%',
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
          Ready to begin?
        </span>
        <button
          style={{
            background: 'rgba(192,57,43,0.8)',
            border: 'none',
            color: 'white',
            borderRadius: 999,
            padding: '8px 20px',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.05em',
            cursor: 'pointer',
          }}
        >
          Next →
        </button>
      </div>

      {/* Vertical progress dots */}
      <div
        style={{
          position: 'absolute',
          left: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          zIndex: 50,
        }}
      >
        {[true, false, false, false].map((active, i) => (
          <div
            key={i}
            style={{
              width: 2,
              height: active ? 28 : 16,
              borderRadius: 2,
              background: active ? 'white' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>
    </section>
  )
}
