'use client'
import { useEffect, useRef, useState } from 'react'

const DIALOGUES = [
  { speaker: 'Sensei', text: "Ah, you've finally awakened... I've been waiting for one such as you." },
  { speaker: 'Sensei', text: "Empty hands achieve nothing. The craft demands dedication beyond what most can give." },
  { speaker: 'Sensei', text: "This katana — forged through ten thousand hours of discipline. Your skills are no different." },
  { speaker: 'Sensei', text: "The path of mastery is not a sprint. It is a lifelong walk through fire and focus." },
]

// Cycle through these frames during the dialogue
const DIALOGUE_FRAMES = [
  '/assets/key_027_t07.20s_f0216.jpg',
  '/assets/key_031_t08.27s_f0248.jpg',
  '/assets/key_035_t09.33s_f0280.jpg',
  '/assets/key_039_t10.40s_f0312.jpg',
]

const PORTRAIT_FRAME = '/assets/key_029_t07.73s_f0232.jpg'

export default function DialogueSection() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const [currentDialogue, setCurrentDialogue] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [visible, setVisible] = useState(false)
  const typeRef = useRef(null)

  useEffect(() => {
    if (!visible) return
    const full = DIALOGUES[currentDialogue].text
    let i = 0
    setDisplayText('')
    setIsTyping(true)
    clearTimeout(typeRef.current)
    const type = () => {
      if (i <= full.length) {
        setDisplayText(full.slice(0, i))
        i++
        typeRef.current = setTimeout(type, 26)
      } else {
        setIsTyping(false)
      }
    }
    type()
    return () => clearTimeout(typeRef.current)
  }, [currentDialogue, visible])

  useEffect(() => {
    let ctx
    ;(async () => {
      const mod = await import('gsap')
      const gsap = mod.gsap || mod.default
      const st = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(st.ScrollTrigger)

      st.ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => setVisible(true),
        onLeaveBack: () => setVisible(false),
      })

      // Background very slow parallax
      ctx = gsap.context(() => {
        gsap.to(bgRef.current, {
          scale: 1.06,
          y: -40,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }, sectionRef)
    })()
    return () => ctx && ctx.revert()
  }, [])

  const nextDialogue = () => {
    if (currentDialogue < DIALOGUES.length - 1) setCurrentDialogue((p) => p + 1)
  }

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* ── Real frame background ── */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          willChange: 'transform',
        }}
      >
        <img
          src={DIALOGUE_FRAMES[Math.min(currentDialogue, DIALOGUE_FRAMES.length - 1)]}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
            transition: 'opacity 0.6s ease',
          }}
        />
        {/* Subtle darkening overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.7) 100%)',
          }}
        />
      </div>

      {/* ── Bottom dialogue UI ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 36,
          left: 0,
          right: 0,
          padding: '0 20px',
          display: 'flex',
          gap: 14,
          alignItems: 'flex-end',
          zIndex: 30,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        {/* Character portrait from actual frame */}
        <div
          style={{
            width: 78,
            height: 78,
            borderRadius: 4,
            border: '2px solid rgba(192,57,43,0.6)',
            overflow: 'hidden',
            flexShrink: 0,
            position: 'relative',
          }}
        >
          <img
            src={PORTRAIT_FRAME}
            alt="Sensei"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 3,
              left: 0,
              right: 0,
              textAlign: 'center',
              fontSize: 8,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textShadow: '0 1px 3px rgba(0,0,0,0.9)',
            }}
          >
            Sensei
          </div>
        </div>

        {/* Dialogue box */}
        <div
          className="dialogue-box"
          style={{ flex: 1, padding: '13px 16px', minHeight: 88 }}
        >
          <div
            style={{
              fontSize: 10,
              color: 'rgba(192,57,43,0.95)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            {DIALOGUES[currentDialogue].speaker}
          </div>
          <div style={{ fontSize: 13.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.92)', minHeight: 44 }}>
            {displayText}
            {isTyping && <span className="cursor" />}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}
          >
            {/* Progress dots */}
            <div style={{ display: 'flex', gap: 4 }}>
              {DIALOGUES.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === currentDialogue ? 16 : 6,
                    height: 4,
                    borderRadius: 2,
                    background: i === currentDialogue ? '#c0392b' : 'rgba(255,255,255,0.18)',
                    transition: 'all 0.3s',
                  }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 7 }}>
              <button
                className="skip-btn"
                onClick={() => setCurrentDialogue(DIALOGUES.length - 1)}
              >
                Skip
              </button>
              <button
                onClick={nextDialogue}
                style={{
                  background: 'rgba(192,57,43,0.85)',
                  border: 'none',
                  color: 'white',
                  borderRadius: 4,
                  padding: '5px 14px',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {currentDialogue < DIALOGUES.length - 1 ? 'Next ▶' : 'Continue ▶'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
