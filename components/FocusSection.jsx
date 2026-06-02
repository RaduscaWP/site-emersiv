'use client'
import { useEffect, useRef } from 'react'
import KatanaSVG from './KatanaSVG'

const WORDS = [
  { text: 'Concentrate', sub: 'Clear your mind' },
  { text: 'Keep Scrolling', sub: 'The path opens' },
  { text: 'The Spirit\nAwakened', sub: 'Feel the blade' },
]

export default function FocusSection() {
  const containerRef = useRef(null)
  const wordsRef = useRef([])
  const swordRef = useRef(null)
  const underlineRef = useRef(null)

  useEffect(() => {
    let ctx
    ;(async () => {
      const mod = await import('gsap')
      const gsap = mod.gsap || mod.default
      const st = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(st.ScrollTrigger)

      ctx = gsap.context(() => {
        const total = WORDS.length

        WORDS.forEach((_, i) => {
          const el = wordsRef.current[i]
          if (!el) return

          // Start state: blurred and slightly transparent
          gsap.set(el, { filter: 'blur(30px)', opacity: 0, y: 30 })

          gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${i * (100 / total)}% top`,
              end: `top+=${(i + 1) * (100 / total)}% top`,
              scrub: 0.8,
              toggleActions: 'play reverse play reverse',
            },
          })
            .to(el, { filter: 'blur(0px)', opacity: 1, y: 0, duration: 0.4 }, 0)
            .to(el, { filter: 'blur(20px)', opacity: 0, y: -30, duration: 0.4 }, 0.6)
        })

        // Sword slow horizontal pan
        gsap.to(swordRef.current, {
          x: 60,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
          },
        })

        // Underline grows
        gsap.fromTo(
          underlineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          }
        )
      }, containerRef)
    })()

    return () => ctx && ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        height: `${WORDS.length * 120}vh`,
        background: '#060606',
      }}
    >
      {/* Sticky inner */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Sword horizontal */}
        <div
          ref={swordRef}
          style={{
            position: 'absolute',
            top: '15%',
            left: '-8%',
            width: '116%',
            transform: 'rotate(-6deg)',
            zIndex: 5,
            willChange: 'transform',
          }}
        >
          <KatanaSVG style={{ width: '100%', opacity: 0.85 }} className="sword-glow" />
        </div>

        {/* Red underline growing */}
        <div
          ref={underlineRef}
          style={{
            position: 'absolute',
            bottom: '28%',
            left: '10%',
            width: '80%',
            height: 2,
            background: 'linear-gradient(90deg, transparent, #c0392b, #e74c3c, #c0392b, transparent)',
            transformOrigin: 'left',
            filter: 'blur(1px)',
            zIndex: 20,
          }}
        />

        {/* Progress bar top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: 2,
            width: '100%',
            background: 'rgba(255,255,255,0.05)',
          }}
        />

        {/* Vertical markers left */}
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
          {WORDS.map((_, i) => (
            <div
              key={i}
              style={{
                width: 2,
                height: 20,
                borderRadius: 2,
                background: i === 0 ? 'white' : 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>

        {/* Words stacked, each independently revealed */}
        <div style={{ position: 'relative', textAlign: 'center', zIndex: 15 }}>
          {WORDS.map((word, i) => (
            <div
              key={i}
              ref={(el) => (wordsRef.current[i] = el)}
              style={{
                position: i === 0 ? 'relative' : 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                willChange: 'filter, opacity, transform',
              }}
            >
              <div
                className="text-section blade-underline"
                style={{
                  color: 'rgba(248,200,192,0.92)',
                  whiteSpace: 'pre-line',
                  textAlign: 'center',
                }}
              >
                {word.text}
              </div>
              <div
                style={{
                  marginTop: 16,
                  fontSize: 13,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)',
                  fontWeight: 500,
                }}
              >
                {word.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Ambient light */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(100,10,10,0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </section>
  )
}
