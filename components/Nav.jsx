'use client'
import { useEffect, useRef } from 'react'

export default function Nav() {
  const progressRef = useRef(null)

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      const progress = Math.min(scrolled / total, 1)
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`
      }
    }
    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <>
      <div ref={progressRef} className="progress-bar" />
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '16px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'auto' }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e67e22, #c0392b)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: '-0.02em',
            }}
          >
            ST
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.9)' }}>
            StringTune
          </span>
        </div>

        {/* Nav items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'auto' }}>
          <button className="nav-pill" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Dev Guides
          </button>
          <button className="nav-pill" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Skill Hub
          </button>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.6)',
              background: 'rgba(255,255,255,0.05)',
            }}
          >
            ◎
          </div>
        </div>
      </nav>
    </>
  )
}
