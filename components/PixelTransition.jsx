'use client'
import { useEffect, useRef } from 'react'

export default function PixelTransition({ onComplete }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const COLS = 16
    const ROWS = 10
    const tileW = () => canvas.width / COLS
    const tileH = () => canvas.height / ROWS
    const tiles = []

    const COLORS = ['#c0392b', '#8B0000', '#2d2d2d', '#1a1a1a', '#f0f0f0', '#e74c3c', '#3d0000']

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        tiles.push({
          r,
          c,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          delay: Math.random() * 0.6,
          progress: 0,
        })
      }
    }

    let start = null
    const DURATION = 1200

    const animate = (ts) => {
      if (!start) start = ts
      const elapsed = ts - start
      const overall = Math.min(elapsed / DURATION, 1)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let allDone = true
      tiles.forEach((tile) => {
        const localProgress = Math.max(0, Math.min((overall - tile.delay) / (1 - tile.delay), 1))
        if (localProgress < 1) allDone = false

        const tw = tileW()
        const th = tileH()
        const x = tile.c * tw
        const y = tile.r * th

        // Ease out cubic
        const eased = 1 - Math.pow(1 - localProgress, 3)

        ctx.globalAlpha = eased
        ctx.fillStyle = tile.color
        ctx.fillRect(x, y, tw - 1, th - 1)
      })

      if (!allDone) {
        animRef.current = requestAnimationFrame(animate)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (onComplete) onComplete()
      }
    }

    animRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [onComplete])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 800,
        pointerEvents: 'none',
      }}
    />
  )
}
