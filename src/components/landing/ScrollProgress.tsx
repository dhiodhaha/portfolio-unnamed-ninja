import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface ScrollProgressProps {
  containerRef: React.RefObject<HTMLDivElement | null>
  isVisible: boolean
}

export function ScrollProgress({ containerRef, isVisible }: ScrollProgressProps) {
  const progressRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      const containerTop = rect.top
      const containerHeight = rect.height
      const viewportHeight = window.innerHeight
      
      // Calculate progress: 0 when top of container hits viewport, 1 when bottom leaves
      const scrollableDistance = containerHeight - viewportHeight
      const scrolled = -containerTop
      const progressValue = Math.max(0, Math.min(1, scrolled / scrollableDistance))
      
      setProgress(progressValue)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [containerRef])

  useEffect(() => {
    if (!progressRef.current) return
    
    gsap.to(progressRef.current, {
      scaleY: progress,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [progress])

  return (
    <div 
      className={`fixed right-8 top-1/2 -translate-y-1/2 z-40 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Track */}
      <div className="w-px h-32 bg-black/10 relative">
        {/* Progress Fill */}
        <div 
          ref={progressRef}
          className="absolute top-0 left-0 w-full bg-black origin-top"
          style={{ height: '100%', transform: 'scaleY(0)' }}
        />
      </div>
      
      {/* Label */}
      <div className="mt-4 text-center">
        <span className="font-tech text-xs uppercase tracking-widest text-neutral-400">
          {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  )
}
