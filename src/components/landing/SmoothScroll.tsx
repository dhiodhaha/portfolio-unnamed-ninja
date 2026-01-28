import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'
import { useLocation } from '@tanstack/react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const LenisContext = createContext<Lenis | null>(null)

export const useLenis = () => useContext(LenisContext)

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const location = useLocation()

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    setLenis(lenisInstance)

    function raf(time: number) {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Sync with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenisInstance.destroy()
      setLenis(null)
    }
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}
