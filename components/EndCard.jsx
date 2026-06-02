'use client'
import { useEffect, useRef } from 'react'

function InstagramIcon({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
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

        tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0)
        tl.fromTo(
          iconRef.current,
          { y: -30, opacity: 0, scale: 0.6 },
          { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.4)' },
          0.25
        )
        tl.fromTo(
          handleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
          0.55
        )

        // Pulsing glow
        gsap.to(iconRef.current, {
          filter: 'drop-shadow(0 0 28px rgba(188,24,136,0.8)) drop-shadow(0 0 10px rgba(240,148,51,0.5))',
          duration: 1.6,
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
        overflow: 'hidden',
      }}
    >
      {/* ── Real end-card background frame ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <img
          src="/assets/key_052_t13.87s_f0416.jpg"
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

      {/* Dark overlay (matches frame's own dark overlay) */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(4,1,1,0.86)',
          zIndex: 2,
          opacity: 0,
        }}
      />

      {/* Social content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 18,
        }}
      >
        <div ref={iconRef} style={{ willChange: 'transform, filter, opacity' }}>
          <InstagramIcon size={88} />
        </div>

        <div ref={handleRef} style={{ willChange: 'transform, opacity' }}>
          <div
            style={{
              fontSize: 'clamp(20px, 4vw, 38px)',
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
              fontSize: 12,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            Follow for more
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
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
              border: '1px solid rgba(255,255,255,0.22)',
              color: 'rgba(255,255,255,0.65)',
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

      {/* Bottom branding */}
      <div
        style={{
          position: 'absolute',
          bottom: 22,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          fontSize: 10,
          color: 'rgba(255,255,255,0.18)',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
        }}
      >
        StringTune © 2024
      </div>
    </section>
  )
}
