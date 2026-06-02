'use client'
import { useEffect, useRef } from 'react'

const WORDS = [
  {
    text: 'Concentrate',
    sub: 'Clear your mind',
    frame: '/assets/key_011_t02.93s_f0088.jpg',
    frameBlur: '/assets/key_008_t02.13s_f0064.jpg',
  },
  {
    text: 'Keep Scrolling',
    sub: 'The path opens',
    frame: '/assets/key_017_t04.53s_f0136.jpg',
    frameBlur: '/assets/key_015_t04.00s_f0120.jpg',
  },
  {
    text: 'The Spirit\nAwakened',
    sub: 'Feel the blade',
    frame: '/assets/key_021_t05.60s_f0168.jpg',
    frameBlur: '/assets/key_019_t05.07s_f0152.jpg',
  },
]

export default function FocusSection() {
  const containerRef = useRef(null)
  const slidesRef = useRef([])
  const textsRef = useRef([])
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
          const slide = slidesRef.current[i]
          const textEl = textsRef.current[i]
          if (!slide || !textEl) return

          // Initial state — blurred
          gsap.set(slide, { opacity: 0 })
          gsap.set(textEl, { filter: 'blur(35px)', opacity: 0, y: 25 })

          gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${i * (100 / total)}% top`,
              end: `top+=${(i + 1) * (100 / total)}% top`,
              scrub: 0.8,
            },
          })
            // Reveal: image fades in, text un-blurs
            .to(slide, { opacity: 1, duration: 0.3 }, 0)
            .to(textEl, { filter: 'blur(0px)', opacity: 1, y: 0, duration: 0.35 }, 0)
            // Exit: re-blur and fade out
            .to(textEl, { filter: 'blur(25px)', opacity: 0, y: -25, duration: 0.35 }, 0.65)
            .to(slide, { opacity: 0, duration: 0.35 }, 0.65)
        })

        // Growing red underline across scroll
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
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Frame images — stacked, each fades in/out */}
        {WORDS.map((word, i) => (
          <div
            key={i}
            ref={(el) => (slidesRef.current[i] = el)}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: i + 1,
              willChange: 'opacity',
            }}
          >
            <img
              src={word.frame}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
            {/* Dark overlay to keep contrast */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.45)',
              }}
            />
          </div>
        ))}

        {/* Red underline blade at bottom */}
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
            zIndex: 50,
          }}
        />

        {/* Vertical markers left */}
        <div
          style={{
            position: 'absolute',
            left: 18,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            zIndex: 60,
          }}
        >
          {WORDS.map((_, i) => (
            <div
              key={i}
              style={{
                width: 2,
                height: 20,
                borderRadius: 2,
                background: 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>

        {/* Text overlays — independently blur-revealed */}
        {WORDS.map((word, i) => (
          <div
            key={i}
            ref={(el) => (textsRef.current[i] = el)}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 40,
              willChange: 'filter, opacity, transform',
              pointerEvents: 'none',
            }}
          >
            <div
              className="text-section"
              style={{
                color: 'rgba(248,200,192,0.95)',
                whiteSpace: 'pre-line',
                textAlign: 'center',
                textShadow: '0 0 60px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8)',
                position: 'relative',
              }}
            >
              {word.text}
              {/* Red underline per word */}
              <span
                style={{
                  display: 'block',
                  height: 2,
                  background: 'linear-gradient(90deg, transparent, #e74c3c, transparent)',
                  marginTop: 4,
                  filter: 'blur(0.5px)',
                }}
              />
            </div>
            <div
              style={{
                marginTop: 18,
                fontSize: 12,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                fontWeight: 500,
                textShadow: '0 1px 4px rgba(0,0,0,0.9)',
              }}
            >
              {word.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
