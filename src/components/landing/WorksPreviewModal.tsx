import { useEffect, useCallback } from 'react'
import { type Project } from '@/data/projects'
import gsap from 'gsap'

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

  // GSAP Entrance/Exit Animation
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden' // Lock scroll
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
    }
  }, [isOpen])

  if (!isOpen || !currentProject) return null

  return (
    <div
      id="preview-modal"
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Container */}
      <div 
        className="relative w-full max-w-7xl max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()} // Prevent close on content click
      >
        
        {/* Top Controls (Minimal Tech) */}
        <div className="w-full flex justify-between items-center mb-4 text-neutral-400 font-mono text-xs md:text-sm select-none">
          {/* Prev Button */}
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

          {/* Title as Breadcrumb */}
          <div className="hidden md:flex gap-2 opacity-50 uppercase tracking-widest">
             <span>{currentProject.category}</span>
             <span>/</span>
             <span>{currentProject.title}</span>
          </div>

          {/* Next Button */}
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

        {/* Image Display */}
        <div id="preview-image" className="relative w-full h-[70vh] md:h-[80vh] bg-neutral-900 rounded-sm overflow-hidden shadow-2xl border border-white/10">
             <img
                src={currentProject.img}
                alt={currentProject.title}
                className="w-full h-full object-contain"
              />
        </div>

        {/* Bottom Controls / Status */}
        <div className="w-full flex justify-between items-center mt-4 text-neutral-500 font-mono text-xs select-none">
           <div className="flex gap-4">
              <span>IMG_REF_0{currentProject.id}</span>
              <span className="hidden md:inline">RES_FULL</span>
           </div>

           {/* Close Button */}
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
    </div>
  )
}
