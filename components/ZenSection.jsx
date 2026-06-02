'use client'
import { useEffect, useRef } from 'react'

export default function ZenSection() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    let ctx
    ;(async () => {
      const mod = await import('gsap')
      const gsap = mod.gsap || mod.default
      const st = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(st.ScrollTrigger)

      ctx = gsap.context(() => {
        // Reveal: image slides up from below
        gsap.fromTo(
          bgRef.current,
          { scale: 1.08, y: 40 },
          {
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        // Dark overlay in as we scroll past (transition toward end-card)
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'center 55%',
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
        overflow: 'hidden',
      }}
    >
      {/* ── Real zen frame ── */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: 0,
          willChange: 'transform',
        }}
      >
        <img
          src="/assets/key_048_t12.80s_f0384.jpg"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </div>

      {/* Dark overlay for transition */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(4,1,1,0.92)',
          opacity: 0,
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />

      {/* Center hint */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 13,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(60,30,10,0.5)',
            fontWeight: 600,
            mixBlendMode: 'multiply',
          }}
        >
          The journey begins
        </div>
      </div>
    </section>
  )
}
