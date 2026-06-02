'use client'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

const ThreeBackground = dynamic(() => import('./ThreeBackground'), { ssr: false })

export default function HeroSection() {
  const sectionRef = useRef(null)
  const swordRef = useRef(null)
  const masterRef = useRef(null)
  const brandingRef = useRef(null)
  const cardRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    ;(async () => {
      const mod = await import('gsap')
      const gsap = mod.gsap || mod.default
      const st = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(st.ScrollTrigger)

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

        // Background image parallax (moves slower)
        tl.to(imgRef.current, { scale: 1.12, y: -60, duration: 1 }, 0)

        // Sword subtle parallax
        tl.to(swordRef.current, { y: -80, rotation: -3, duration: 1 }, 0)

        // "Master Your Skills" exits up
        tl.to(masterRef.current, { y: -240, opacity: 0, duration: 0.5 }, 0)

        // "StringTune" oversized exits
        tl.to(brandingRef.current, { y: -140, scale: 1.3, opacity: 0, duration: 0.7 }, 0.1)

        // Card exits left
        tl.to(cardRef.current, { x: -80, opacity: 0, duration: 0.4 }, 0)
      }, sectionRef)

      return () => ctx.revert()
    })()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#080808',
      }}
    >
      {/* ── Real keyframe image as full-screen background ── */}
      <div
        ref={imgRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          willChange: 'transform',
        }}
      >
        <img
          src="/assets/key_000_t00.00s_f0000.jpg"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
        {/* Dark vignette over image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.4) 100%)',
          }}
        />
      </div>

      {/* Three.js particles overlay */}
      <ThreeBackground style={{ zIndex: 3, opacity: 0.5 }} />

      {/* Sword overlay — mirrors the angle from the frame */}
      <div
        ref={swordRef}
        style={{
          position: 'absolute',
          top: '30%',
          left: '-5%',
          width: '110%',
          transform: 'rotate(-18deg)',
          transformOrigin: '50% 50%',
          zIndex: 6,
          willChange: 'transform',
          pointerEvents: 'none',
        }}
      >
        {/* Thin red glow line mimicking the blade from the frame */}
        <svg viewBox="0 0 1000 40" style={{ width: '100%', opacity: 0.6 }}>
          <defs>
            <linearGradient id="swordLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="20%" stopColor="#8B0000" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#e74c3c" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#ff8070" />
              <stop offset="80%" stopColor="#c0392b" stopOpacity="0.5" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <filter id="blur2"><feGaussianBlur stdDeviation="2" /></filter>
          </defs>
          <line x1="0" y1="20" x2="1000" y2="20" stroke="url(#swordLine)" strokeWidth="4" filter="url(#blur2)" />
          <line x1="0" y1="20" x2="1000" y2="20" stroke="url(#swordLine)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* UI overlay — nav already fixed, these are section-specific */}
      {/* "Master / Your / Skills" */}
      <div
        ref={masterRef}
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          textAlign: 'right',
          zIndex: 20,
          willChange: 'transform, opacity',
        }}
      >
        {['Master', 'Your', 'Skills'].map((word, i) => (
          <div
            key={word}
            className="text-hero"
            style={{
              color: i === 2 ? 'rgba(248,200,192,0.95)' : 'white',
              lineHeight: 0.88,
              textShadow: '0 2px 30px rgba(0,0,0,0.8)',
            }}
          >
            {word}
          </div>
        ))}
      </div>

      {/* "StringTune" oversized bottom */}
      <div
        ref={brandingRef}
        style={{
          position: 'absolute',
          bottom: '-4%',
          left: '-2%',
          zIndex: 5,
          whiteSpace: 'nowrap',
          willChange: 'transform, opacity',
        }}
      >
        <span
          className="text-oversize"
          style={{
            color: 'rgba(248,200,192,0.12)',
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
          left: '4%',
          top: '28%',
          width: 200,
          background: 'rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 8,
          overflow: 'hidden',
          zIndex: 30,
          backdropFilter: 'blur(12px)',
          willChange: 'transform, opacity',
        }}
      >
        <div
          style={{
            height: 110,
            overflow: 'hidden',
          }}
        >
          <img
            src="/assets/key_004_t01.07s_f0032.jpg"
            alt="Skill Hub"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
          />
        </div>
        <div style={{ padding: '10px 12px' }}>
          <div style={{ fontSize: 10, color: 'rgba(192,57,43,0.9)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3, fontWeight: 700 }}>
            Skill Hub
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>Balance &amp; Control</div>
        </div>
      </div>

      {/* Dialog — bottom right */}
      <div
        style={{
          position: 'absolute',
          bottom: '7%',
          right: '4%',
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>
          Ready to begin?
        </span>
        <button
          style={{
            background: 'rgba(192,57,43,0.9)',
            border: 'none',
            color: 'white',
            borderRadius: 999,
            padding: '8px 22px',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.05em',
            cursor: 'pointer',
          }}
        >
          Next →
        </button>
      </div>

      {/* Vertical progress dots left */}
      <div
        style={{
          position: 'absolute',
          left: 18,
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
            }}
          />
        ))}
      </div>
    </section>
  )
}
