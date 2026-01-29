import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const pulseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const pulse = pulseRef.current
    if (!cursor || !pulse) return

    // Initialize GSAP set
    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 })
    gsap.set(pulse, { scale: 0, opacity: 0 })

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX + 16,
        y: e.clientY + 16,
        duration: 0.3,
        ease: 'power2.out',
        opacity: 1, 
      })
    }
    
    // Hover detection logic
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = target.closest('a, button, [role="button"], .cursor-pointer')
      
      if (isClickable) {
        gsap.to(pulse, { 
          scale: 1, 
          opacity: 1, 
          duration: 0.3, 
          ease: 'back.out(1.7)' 
        })
        // Pulse animation
        gsap.to(pulse, {
            scale: 1.2,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        })
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = target.closest('a, button, [role="button"], .cursor-pointer')

      if (isClickable) {
        gsap.killTweensOf(pulse) // Stop pulse
        gsap.to(pulse, { 
          scale: 0, 
          opacity: 0, 
          duration: 0.2
        })
      }
    } 

    const hideCursor = () => gsap.to(cursor, { opacity: 0, duration: 0.2 })
    const showCursor = () => gsap.to(cursor, { opacity: 1, duration: 0.2 })

    window.addEventListener('mousemove', moveCursor)
    document.body.addEventListener('mouseover', handleMouseOver)
    document.body.addEventListener('mouseout', handleMouseOut)
    document.body.addEventListener('mouseleave', hideCursor)
    document.body.addEventListener('mouseenter', showCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.body.removeEventListener('mouseover', handleMouseOver)
      document.body.removeEventListener('mouseout', handleMouseOut)
      document.body.removeEventListener('mouseleave', hideCursor)
      document.body.removeEventListener('mouseenter', showCursor)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference text-white select-none hidden md:flex items-center justify-center"
    >
        <span className="text-lg font-bold font-mono tracking-tighter leading-none block relative z-10">
            +
        </span>
        
        {/* Pulsing Circle */}
        <div 
          ref={pulseRef}
          className="absolute w-8 h-8 rounded-full border border-white opacity-0"
        />
    </div>
  )
}
