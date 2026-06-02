'use client'
import { useEffect, useRef } from 'react'

export default function PixelMosaicSection() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const COLORS_DARK = ['#0d0000', '#1a0505', '#0a0a0a', '#1a0808', '#2a0808']
    const COLORS_NEW = ['#8B0000', '#c0392b', '#ffffff', '#e8e0d0', '#f5f0ec', '#3d0000', '#5a1010', '#e74c3c', '#f0f0f0']
    const COLS = 20
    const ROWS = 12

    let gsap, ScrollTrigger
    ;(async () => {
      const mod = await import('gsap')
      gsap = mod.gsap || mod.default
      const st = await import('gsap/ScrollTrigger')
      ScrollTrigger = st.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      const tileW = canvas.width / COLS
      const tileH = canvas.height / ROWS

      // Build tiles with random delays for scatter effect
      const tiles = []
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          tiles.push({
            x: c * tileW,
            y: r * tileH,
            w: tileW - 1,
            h: tileH - 1,
            // Each tile gets a color from the new scene
            color: COLORS_NEW[Math.floor(Math.random() * COLORS_NEW.length)],
            startColor: COLORS_DARK[Math.floor(Math.random() * COLORS_DARK.length)],
            progress: 0,
            delay: (c / COLS) * 0.4 + Math.random() * 0.3,
          })
        }
      }

      const proxy = { value: 0 }

      gsap.to(proxy, {
        value: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 10%',
          scrub: 1,
          onUpdate: (self) => {
            proxy.value = self.progress
            drawFrame(self.progress)
          },
        },
      })

      function lerpColor(a, b, t) {
        const ah = parseInt(a.slice(1), 16)
        const bh = parseInt(b.slice(1), 16)
        const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff
        const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff
        const r = Math.round(ar + (br - ar) * t)
        const g = Math.round(ag + (bg - ag) * t)
        const b2 = Math.round(ab + (bb - ab) * t)
        return `rgb(${r},${g},${b2})`
      }

      function drawFrame(overall) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        tiles.forEach((tile) => {
          const local = Math.max(0, Math.min((overall - tile.delay) / (1 - tile.delay), 1))
          const eased = local < 0.5 ? 2 * local * local : 1 - Math.pow(-2 * local + 2, 2) / 2
          ctx.fillStyle = lerpColor(tile.startColor, tile.color, eased)
          ctx.globalAlpha = eased < 0.05 ? 0 : eased
          ctx.fillRect(tile.x, tile.y, tile.w, tile.h)
        })
        ctx.globalAlpha = 1
      }

      drawFrame(0)
    })()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '60vh',
        overflow: 'hidden',
        background: '#0a0000',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />

      {/* Center text hint */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontSize: 13,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)',
            fontWeight: 600,
          }}
        >
          The story unfolds
        </div>
      </div>
    </section>
  )
}
