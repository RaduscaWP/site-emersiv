'use client'
import { useEffect, useRef, useState } from 'react'
import KatanaSVG from './KatanaSVG'

const DIALOGUES = [
  {
    speaker: 'Sensei',
    text: "Ah, you've finally awakened... I've been waiting for one such as you.",
  },
  {
    speaker: 'Sensei',
    text: "Empty hands achieve nothing. The craft demands dedication beyond what most can give.",
  },
  {
    speaker: 'Sensei',
    text: "This katana — forged through ten thousand hours of discipline. Your skills are no different.",
  },
  {
    speaker: 'Sensei',
    text: "The path of mastery is not a sprint. It is a lifelong walk through fire and focus.",
  },
]

export default function DialogueSection() {
  const sectionRef = useRef(null)
  const swordRef = useRef(null)
  const [currentDialogue, setCurrentDialogue] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const typeRef = useRef(null)
  const [visible, setVisible] = useState(false)

  // Typewriter effect
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
        typeRef.current = setTimeout(type, 28)
      } else {
        setIsTyping(false)
      }
    }
    type()
    return () => clearTimeout(typeRef.current)
  }, [currentDialogue, visible])

  const nextDialogue = () => {
    if (currentDialogue < DIALOGUES.length - 1) {
      setCurrentDialogue((p) => p + 1)
    }
  }

  useEffect(() => {
    let gsap, ScrollTrigger
    ;(async () => {
      const mod = await import('gsap')
      gsap = mod.gsap || mod.default
      const st = await import('gsap/ScrollTrigger')
      ScrollTrigger = st.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => setVisible(true),
        onLeaveBack: () => setVisible(false),
      })

      // Sword parallax drift
      gsap.to(swordRef.current, {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    })()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Painted clouds background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {/* Dark sky base */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, #0d0505 0%, #200808 40%, #300a0a 70%, #1a0505 100%)',
          }}
        />

        {/* Cloud layers — CSS painted red clouds */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter id="cloudBlur">
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <radialGradient id="cloudRed1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8B0000" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#5a0000" stopOpacity="0.6" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="cloudWhite1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#e0e0e0" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Large red cloud masses */}
          <ellipse cx="300" cy="200" rx="320" ry="130" fill="url(#cloudRed1)" filter="url(#cloudBlur)" />
          <ellipse cx="900" cy="150" rx="280" ry="110" fill="url(#cloudRed1)" filter="url(#cloudBlur)" />
          <ellipse cx="600" cy="120" rx="400" ry="90" fill="#6b0000" fillOpacity="0.5" filter="url(#cloudBlur)" />

          {/* White cloud highlights */}
          <ellipse cx="350" cy="180" rx="120" ry="50" fill="url(#cloudWhite1)" filter="url(#cloudBlur)" />
          <ellipse cx="850" cy="140" rx="100" ry="45" fill="url(#cloudWhite1)" filter="url(#cloudBlur)" />
          <ellipse cx="600" cy="200" rx="150" ry="40" fill="#fff" fillOpacity="0.15" filter="url(#cloudBlur)" />

          {/* Lower cloud wisps */}
          <ellipse cx="150" cy="400" rx="200" ry="80" fill="#3d0000" fillOpacity="0.4" filter="url(#cloudBlur)" />
          <ellipse cx="1050" cy="380" rx="180" ry="70" fill="#3d0000" fillOpacity="0.4" filter="url(#cloudBlur)" />
          <ellipse cx="600" cy="500" rx="350" ry="60" fill="#2a0000" fillOpacity="0.3" filter="url(#cloudBlur)" />
        </svg>

        {/* Atmospheric fog at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '30%',
            background: 'linear-gradient(0deg, rgba(10,3,3,0.9) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Sword — big diagonal over the scene */}
      <div
        ref={swordRef}
        style={{
          position: 'absolute',
          top: '8%',
          left: '-10%',
          width: '120%',
          transform: 'rotate(-12deg)',
          zIndex: 10,
          willChange: 'transform',
        }}
      >
        <KatanaSVG style={{ width: '100%', opacity: 0.9 }} className="sword-glow" />
      </div>

      {/* Ornament rune top-right */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          right: 40,
          fontSize: 28,
          color: 'rgba(230,180,50,0.7)',
          fontWeight: 900,
          letterSpacing: '-0.02em',
          zIndex: 20,
          textShadow: '0 0 20px rgba(230,180,50,0.4)',
        }}
      >
        ⛩
      </div>

      {/* Bottom dialogue UI */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 0,
          right: 0,
          padding: '0 24px',
          display: 'flex',
          gap: 16,
          alignItems: 'flex-end',
          zIndex: 30,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        {/* Character portrait */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 4,
            border: '2px solid rgba(192,57,43,0.5)',
            background: 'linear-gradient(135deg, #1a0808 0%, #2d1010 100%)',
            flexShrink: 0,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Silhouette */}
          <svg viewBox="0 0 80 80" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <circle cx="40" cy="22" r="14" fill="rgba(192,57,43,0.7)" />
            <path d="M16 80 Q16 48 40 48 Q64 48 64 80 Z" fill="rgba(192,57,43,0.6)" />
            <circle cx="40" cy="22" r="10" fill="#2d0808" />
            <ellipse cx="40" cy="20" rx="7" ry="8" fill="rgba(220,150,100,0.8)" />
          </svg>
          <div
            style={{
              position: 'absolute',
              bottom: 4,
              left: 0,
              right: 0,
              textAlign: 'center',
              fontSize: 8,
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Sensei
          </div>
        </div>

        {/* Dialogue box */}
        <div
          className="dialogue-box"
          style={{
            flex: 1,
            padding: '14px 18px',
            minHeight: 90,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: 'rgba(192,57,43,0.9)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              {DIALOGUES[currentDialogue].speaker}
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)' }}>
              {displayText}
              {isTyping && <span className="cursor" />}
            </div>
          </div>

          {/* Progress dots + Next button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 12,
            }}
          >
            <div style={{ display: 'flex', gap: 4 }}>
              {DIALOGUES.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === currentDialogue ? 16 : 6,
                    height: 4,
                    borderRadius: 2,
                    background: i === currentDialogue ? '#c0392b' : 'rgba(255,255,255,0.2)',
                    transition: 'all 0.3s',
                  }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="skip-btn" onClick={() => setCurrentDialogue(DIALOGUES.length - 1)}>
                Skip
              </button>
              {currentDialogue < DIALOGUES.length - 1 ? (
                <button
                  onClick={nextDialogue}
                  style={{
                    background: 'rgba(192,57,43,0.8)',
                    border: 'none',
                    color: 'white',
                    borderRadius: 4,
                    padding: '5px 14px',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Next ▶
                </button>
              ) : (
                <button
                  style={{
                    background: 'rgba(192,57,43,0.8)',
                    border: 'none',
                    color: 'white',
                    borderRadius: 4,
                    padding: '5px 14px',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Continue ▶
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
