import { useEffect, useCallback } from 'react'
import { type Project } from '@/data/projects'
import gsap from 'gsap'
import { useLenis } from './SmoothScroll'

interface WorksPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  currentProject: Project | null
  onNext: () => void
  onPrev: () => void
  hasNext: boolean
  hasPrev: boolean
}

export function WorksPreviewModal({
  isOpen,
  onClose,
  currentProject,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: WorksPreviewModalProps) {
  const lenis = useLenis()

  // Handle escape key and arrow navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowRight':
          if (hasNext) onNext()
          break
        case 'ArrowLeft':
          if (hasPrev) onPrev()
          break
      }
    },
    [isOpen, onClose, onNext, onPrev, hasNext, hasPrev]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // GSAP Entrance/Exit Animation & Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden' // Lock scroll
      lenis?.stop() // Stop Lenis smooth scroll

      gsap.fromTo(
        '#preview-modal',
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      gsap.fromTo(
        '#preview-image',
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out', delay: 0.1 }
      )
    } else {
      document.body.style.overflow = '' // Unlock scroll
      lenis?.start() // Resume Lenis
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [isOpen, lenis])

  if (!isOpen || !currentProject) return null

  return (
    <div
      id="preview-modal"
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Top Controls - Fixed absolute */}
      <div 
        className="absolute top-0 left-0 w-full p-4 md:px-10 md:py-8 z-20 flex justify-between items-center text-neutral-400 font-mono text-xs md:text-sm select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className={`group flex items-center gap-2 hover:text-white transition-colors ${!hasPrev ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <span className="opacity-50 group-hover:opacity-100">[</span>
          <span>&larr;</span>
          <span className="hidden md:inline">PREV</span>
          <span className="opacity-50 group-hover:opacity-100">]</span>
        </button>

        <div className="flex gap-2 uppercase tracking-widest font-bold text-white mix-blend-difference z-30">
           <span>{currentProject.category}</span>
           <span>/</span>
           <span>{currentProject.title}</span>
        </div>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className={`group flex items-center gap-2 hover:text-white transition-colors ${!hasNext ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <span className="opacity-50 group-hover:opacity-100">[</span>
          <span className="hidden md:inline">NEXT</span>
          <span>&rarr;</span>
          <span className="opacity-50 group-hover:opacity-100">]</span>
        </button>
      </div>

      {/* Main Scrollable Viewport */}
      <div 
        className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide z-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        data-lenis-prevent
      >
        <div 
           className="min-h-full w-full flex flex-col items-center py-20 px-4 md:px-10"
        >
            <div 
              id="preview-image"
              className="w-full max-w-[95vw] md:max-w-6xl shadow-2xl border border-white/5 rounded-sm bg-neutral-900/10"
              onClick={(e) => e.stopPropagation()}
            >
                 <img
                    src={currentProject.img}
                    alt={currentProject.title}
                    className="block w-full h-auto"
                  />
            </div>
        </div>
      </div>

      {/* Bottom Controls - Fixed absolute */}
      <div 
        className="absolute bottom-0 left-0 w-full p-4 md:px-10 md:py-8 z-20 flex justify-between items-center text-neutral-500 font-mono text-xs select-none"
        onClick={(e) => e.stopPropagation()}
      >
         <div className="flex gap-4">
            <span>REF_0{currentProject.id}</span>
            <span className="hidden md:inline">IMMERSIVE_PREVIEW</span>
            <span className="opacity-30 hidden md:inline">NAV_KEYBOARD_ENABLED</span>
         </div>

         <button 
           onClick={onClose}
           className="group flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
         >
            <span className="opacity-50 group-hover:opacity-100">[</span>
            <span>ESC</span>
            <span>&times;</span>
            <span className="opacity-50 group-hover:opacity-100">]</span>
         </button>
      </div>
    </div>
  )
}
