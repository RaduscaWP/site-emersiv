'use client'
import { useEffect, useRef, useState } from 'react'

const FLOATING_SQUARES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  size: Math.random() * 18 + 6,
  left: Math.random() * 100,
  delay: Math.random() * 4,
  duration: Math.random() * 4 + 3,
  color: i % 3 === 0 ? '#c0392b' : i % 3 === 1 ? '#888' : '#ccc',
}))

export default function WhiteFlashSection() {
  const sectionRef = useRef(null)
  const takeRef = useRef(null)
  const listenRef = useRef(null)

  useEffect(() => {
    let ctx
    ;(async () => {
      const mod = await import('gsap')
      const gsap = mod.gsap || mod.default
      const st = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(st.ScrollTrigger)

      ctx = gsap.context(() => {
        // "Take it..." reveal
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

        // "And listen" reveal slightly after
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
              start: 'top 40%',
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
        background: '#f5f0ec',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Floating pixel squares */}
      {FLOATING_SQUARES.map((sq) => (
        <div
          key={sq.id}
          className="float-square"
          style={{
            width: sq.size,
            height: sq.size,
            left: `${sq.left}%`,
            bottom: '-10%',
            background: sq.color,
            opacity: 0.6,
            animationDelay: `${sq.delay}s`,
            animationDuration: `${sq.duration}s`,
          }}
        />
      ))}

      {/* Central text */}
      <div style={{ textAlign: 'center', zIndex: 10, position: 'relative' }}>
        <div
          ref={takeRef}
          style={{
            fontSize: 'clamp(48px, 9vw, 130px)',
            fontWeight: 900,
            color: '#111',
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
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
            marginTop: 16,
            willChange: 'filter, opacity, transform',
          }}
        >
          And listen...
        </div>
      </div>

      {/* Subtle vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 50%, rgba(180,140,120,0.15) 100%)',
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}
