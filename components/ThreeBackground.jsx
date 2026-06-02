'use client'
import { useEffect, useRef } from 'react'

export default function ThreeBackground({ style = {} }) {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return
    let running = true

    ;(async () => {
      const THREE = await import('three')

      const scene = new THREE.Scene()
      const w = mountRef.current.clientWidth
      const h = mountRef.current.clientHeight
      const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100)
      camera.position.z = 5

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      mountRef.current.appendChild(renderer.domElement)

      // Particle field
      const COUNT = 800
      const positions = new Float32Array(COUNT * 3)
      const colors = new Float32Array(COUNT * 3)

      const redPalette = [
        [0.75, 0.15, 0.1],  // dark red
        [0.9, 0.25, 0.15],  // red
        [0.95, 0.45, 0.3],  // orange-red
        [1.0, 0.8, 0.75],   // soft pink
        [0.4, 0.08, 0.05],  // deep red
      ]

      for (let i = 0; i < COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 14
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8
        positions[i * 3 + 2] = (Math.random() - 0.5) * 6

        const pal = redPalette[Math.floor(Math.random() * redPalette.length)]
        const bright = 0.3 + Math.random() * 0.7
        colors[i * 3] = pal[0] * bright
        colors[i * 3 + 1] = pal[1] * bright
        colors[i * 3 + 2] = pal[2] * bright
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      const material = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
      })

      const particles = new THREE.Points(geometry, material)
      scene.add(particles)

      // Subtle ambient light geometry — thin red lines (sword energy lines)
      const lineMat = new THREE.LineBasicMaterial({ color: 0x8b0000, transparent: true, opacity: 0.15 })
      for (let i = 0; i < 5; i++) {
        const pts = []
        const y = (Math.random() - 0.5) * 6
        pts.push(new THREE.Vector3(-8, y + Math.random() * 0.4, Math.random() * 2 - 1))
        pts.push(new THREE.Vector3(8, y + Math.random() * 0.4, Math.random() * 2 - 1))
        const lineGeo = new THREE.BufferGeometry().setFromPoints(pts)
        scene.add(new THREE.Line(lineGeo, lineMat))
      }

      let t = 0
      const animate = () => {
        if (!running) return
        requestAnimationFrame(animate)
        t += 0.003

        // Slow drift
        particles.rotation.y = t * 0.05
        particles.rotation.x = Math.sin(t * 0.3) * 0.02

        // Mouse-ish breathing
        particles.position.y = Math.sin(t * 0.4) * 0.05

        renderer.render(scene, camera)
      }
      animate()

      const onResize = () => {
        if (!mountRef.current) return
        const nw = mountRef.current.clientWidth
        const nh = mountRef.current.clientHeight
        camera.aspect = nw / nh
        camera.updateProjectionMatrix()
        renderer.setSize(nw, nh)
      }
      window.addEventListener('resize', onResize)

      return () => {
        running = false
        window.removeEventListener('resize', onResize)
        renderer.dispose()
        geometry.dispose()
        material.dispose()
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement)
        }
      }
    })()
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        ...style,
      }}
    />
  )
}
