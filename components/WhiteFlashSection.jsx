'use client'
import { useEffect, useRef } from 'react'

export default function WhiteFlashSection() {
  const sectionRef = useRef(null)
  const takeRef = useRef(null)
  const listenRef = useRef(null)
  const frame1Ref = useRef(null)
  const frame2Ref = useRef(null)

  useEffect(() => {
    let ctx
    ;(async () => {
      const mod = await import('gsap')
      const gsap = mod.gsap || mod.default
      const st = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(st.ScrollTrigger)

      ctx = gsap.context(() => {
        // Frame 1 (Take it) fades in
        gsap.fromTo(
          frame1Ref.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        // "Take it..." text un-blurs on frame1
        gsap.fromTo(
          takeRef.current,
          { filter: 'blur(40px)', opacity: 0, y: 20 },
          {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        // Frame 2 (And listen) swaps in
        gsap.fromTo(
          frame2Ref.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            delay: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 35%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        // "And listen..." un-blurs
        gsap.fromTo(
          listenRef.current,
          { filter: 'blur(40px)', opacity: 0, y: 20 },
          {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 35%',
              toggleActions: 'play none none reverse',
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
        background: '#f5f0ec',
      }}
    >
      {/* Frame 1 — key_043 (Take it...) */}
      <div
        ref={frame1Ref}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          opacity: 0,
          willChange: 'opacity',
        }}
      >
        <img
          src="/assets/key_043_t11.47s_f0344.jpg"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(245,240,236,0.35)' }} />
      </div>

      {/* Frame 2 — key_046 (And listen...) */}
      <div
        ref={frame2Ref}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          opacity: 0,
          willChange: 'opacity',
        }}
      >
        <img
          src="/assets/key_046_t12.27s_f0368.jpg"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(245,240,236,0.3)' }} />
      </div>

      {/* Text overlays */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
          gap: 12,
        }}
      >
        <div
          ref={takeRef}
          style={{
            fontSize: 'clamp(48px, 9vw, 130px)',
            fontWeight: 900,
            color: '#111',
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            textShadow: '0 2px 20px rgba(255,255,255,0.6)',
            willChange: 'filter, opacity, transform',
          }}
        >
          Take it...
        </div>
        <div
          ref={listenRef}
          style={{
            fontSize: 'clamp(48px, 9vw, 130px)',
            fontWeight: 900,
            color: '#c0392b',
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            textShadow: '0 2px 20px rgba(255,255,255,0.5)',
            willChange: 'filter, opacity, transform',
          }}
        >
          And listen...
        </div>
      </div>
    </section>
  )
}
