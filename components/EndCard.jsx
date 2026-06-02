'use client'
import { useEffect, useRef } from 'react'

function InstagramIcon({ size = 80 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="60" height="60" rx="14" fill="url(#igGrad)" />
      <rect x="15" y="15" width="30" height="30" rx="8" stroke="white" strokeWidth="3" />
      <circle cx="30" cy="30" r="8" stroke="white" strokeWidth="3" />
      <circle cx="40.5" cy="19.5" r="2.5" fill="white" />
      <defs>
        <linearGradient id="igGrad" x1="0" y1="60" x2="60" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f09433" />
          <stop offset="0.25" stopColor="#e6683c" />
          <stop offset="0.5" stopColor="#dc2743" />
          <stop offset="0.75" stopColor="#cc2366" />
          <stop offset="1" stopColor="#bc1888" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function EndCard() {
  const sectionRef = useRef(null)
  const iconRef = useRef(null)
  const handleRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    let ctx
    ;(async () => {
      const mod = await import('gsap')
      const gsap = mod.gsap || mod.default
      const st = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(st.ScrollTrigger)

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        })

        // Overlay in
        tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0)

        // Icon drops in
        tl.fromTo(
          iconRef.current,
          { y: -30, opacity: 0, scale: 0.7 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' },
          0.2
        )

        // Handle fades up
        tl.fromTo(
          handleRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
          0.5
        )

        // Pulsing glow on icon
        gsap.to(iconRef.current, {
          filter: 'drop-shadow(0 0 24px rgba(188,24,136,0.7)) drop-shadow(0 0 8px rgba(240,148,51,0.5))',
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: 1,
        })
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#f5f0e8',
      }}
    >
      {/* Zen background (visible through overlay) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #f5f0e8 0%, #e8ddd0 100%)',
        }}
      />

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(4, 1, 1, 0.88)',
          zIndex: 2,
        }}
      />

      {/* Social content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <div ref={iconRef} style={{ willChange: 'transform, filter, opacity' }}>
          <InstagramIcon size={90} />
        </div>

        <div
          ref={handleRef}
          style={{ willChange: 'transform, opacity' }}
        >
          <div
            style={{
              fontSize: 'clamp(22px, 4vw, 40px)',
              fontWeight: 800,
              color: 'white',
              letterSpacing: '0.04em',
            }}
          >
            @JERRYTHEWEBDEV
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 13,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Follow for more
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 16,
            display: 'flex',
            gap: 12,
          }}
        >
          <button
            style={{
              background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366)',
              border: 'none',
              color: 'white',
              borderRadius: 999,
              padding: '10px 28px',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.04em',
              cursor: 'pointer',
            }}
          >
            Follow Now
          </button>
          <button
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.25)',
              color: 'rgba(255,255,255,0.7)',
              borderRadius: 999,
              padding: '10px 28px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Visit Site
          </button>
        </div>
      </div>

      {/* Bottom StringTune branding */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          fontSize: 11,
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        StringTune © 2024
      </div>
    </section>
  )
}
