'use client'
import { useEffect, useRef } from 'react'

export default function PixelMosaicSection() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const imgARef = useRef(null) // source frame (dark)
  const imgBRef = useRef(null) // target frame (narrative)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    let gsap, ScrollTrigger
    ;(async () => {
      const mod = await import('gsap')
      gsap = mod.gsap || mod.default
      const st = await import('gsap/ScrollTrigger')
      ScrollTrigger = st.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      // Wait for images to load
      await Promise.all([
        new Promise((r) => { imgARef.current.onload = r; imgARef.current.onerror = r }),
        new Promise((r) => { imgBRef.current.onload = r; imgBRef.current.onerror = r }),
      ])

      const COLS = 20
      const ROWS = 12
      const tw = canvas.width / COLS
      const th = canvas.height / ROWS

      // Build tiles with random delays
      const tiles = Array.from({ length: COLS * ROWS }, (_, idx) => {
        const c = idx % COLS
        const r = Math.floor(idx / COLS)
        return {
          x: c * tw,
          y: r * th,
          w: tw - 1,
          h: th - 1,
          delay: (c / COLS) * 0.35 + (r / ROWS) * 0.1 + Math.random() * 0.2,
        }
      })

      // Off-screen canvases for source & target images
      const offA = new OffscreenCanvas(canvas.width, canvas.height)
      const offB = new OffscreenCanvas(canvas.width, canvas.height)
      offA.getContext('2d').drawImage(imgARef.current, 0, 0, canvas.width, canvas.height)
      offB.getContext('2d').drawImage(imgBRef.current, 0, 0, canvas.width, canvas.height)

      function drawFrame(progress) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw base (source) frame
        ctx.globalAlpha = 1
        ctx.drawImage(offA, 0, 0)

        // Overlay tiles from target frame progressively
        tiles.forEach((tile) => {
          const local = Math.max(0, Math.min((progress - tile.delay) / (1 - tile.delay), 1))
          if (local <= 0) return
          const eased = 1 - Math.pow(1 - local, 3)
          ctx.globalAlpha = eased
          ctx.drawImage(offB, tile.x, tile.y, tile.w, tile.h, tile.x, tile.y, tile.w, tile.h)
        })

        ctx.globalAlpha = 1
      }

      drawFrame(0)

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 65%',
        end: 'top 5%',
        scrub: 1.2,
        onUpdate: (self) => drawFrame(self.progress),
      })
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
      {/* Hidden source images for canvas */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgARef}
        src="/assets/key_023_t06.13s_f0184.jpg"
        alt=""
        crossOrigin="anonymous"
        style={{ display: 'none' }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgBRef}
        src="/assets/key_027_t07.20s_f0216.jpg"
        alt=""
        crossOrigin="anonymous"
        style={{ display: 'none' }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </section>
  )
}
