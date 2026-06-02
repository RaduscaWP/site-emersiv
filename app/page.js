'use client'
import dynamic from 'next/dynamic'

const Nav = dynamic(() => import('../components/Nav'), { ssr: false })
const HeroSection = dynamic(() => import('../components/HeroSection'), { ssr: false })
const FocusSection = dynamic(() => import('../components/FocusSection'), { ssr: false })
const PixelMosaicSection = dynamic(() => import('../components/PixelMosaicSection'), { ssr: false })
const DialogueSection = dynamic(() => import('../components/DialogueSection'), { ssr: false })
const WhiteFlashSection = dynamic(() => import('../components/WhiteFlashSection'), { ssr: false })
const ZenSection = dynamic(() => import('../components/ZenSection'), { ssr: false })
const EndCard = dynamic(() => import('../components/EndCard'), { ssr: false })

export default function Home() {
  return (
    <main>
      <Nav />
      <HeroSection />
      <FocusSection />
      <PixelMosaicSection />
      <DialogueSection />
      <WhiteFlashSection />
      <ZenSection />
      <EndCard />
    </main>
  )
}
