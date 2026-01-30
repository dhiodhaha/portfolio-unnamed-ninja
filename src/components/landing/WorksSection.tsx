import { useState, useEffect, useRef } from 'react'
import { WORKS, EXPLORATIONS, type Project } from '@/data/projects'
import { WorksPreviewModal } from './WorksPreviewModal'
import { Skeleton } from '../Skeleton'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Individual Work Item Component (handles slideshow logic)
function WorksItem({ 
  work, 
  index, 
  onClick 
}: { 
  work: Project
  index: number
  onClick: () => void 
}) {
  const slideshowRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!work.slides || work.slides.length < 2 || !slideshowRef.current) return

    const slides = slideshowRef.current.querySelectorAll('.slide-image')
    if (slides.length < 2) return

    // Set initial state: first visible, rest hidden
    gsap.set(slides, { opacity: 0 })
    gsap.set(slides[0], { opacity: 1 })

    const totalSlides = slides.length

    // Create the crossfade loop
    const tl = gsap.timeline({ repeat: -1, delay: 2 })

    for (let i = 0; i < totalSlides; i++) {
      const nextIndex = (i + 1) % totalSlides
      tl.to(slides[i], { opacity: 0, duration: 1, ease: 'power2.inOut' }, `+=${2.5}`)
        .to(slides[nextIndex], { opacity: 1, duration: 1, ease: 'power2.inOut' }, '<')
    }

    return () => {
      tl.kill()
    }
  }, [work.slides, isLoaded])

  const thumbnailSrc = work.thumbnail || (work.img.startsWith('http') ? `${work.img}&w=800&auto=format,compress&fm=webp` : work.img)

  return (
    <div 
      onClick={onClick}
      className="group works-item cursor-pointer mb-[var(--spacing-6)] opacity-0"
    >
      {/* Image Container - Fixed 4:3 aspect ratio */}
      <div 
        ref={slideshowRef}
        className="relative w-full aspect-[4/3] overflow-hidden rounded-[var(--radius-sm)] mb-[var(--spacing-4)] bg-neutral-300"
      >
        {!isLoaded && <Skeleton className="absolute inset-0 z-10" />}
        
        {work.slides && work.slides.length > 1 ? (
          // Slideshow Mode: Stack all slides
          work.slides.map((slide, i) => (
            <img
              key={i}
              src={slide}
              alt={`${work.title} - Slide ${i + 1}`}
              className={`slide-image absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => i === 0 && setIsLoaded(true)}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          ))
        ) : (
          // Static Mode: Single image with hover effect
          <img
            src={thumbnailSrc}
            alt={work.title}
            width={800}
            height={600}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover transform transition-all duration-[var(--duration-slower)] ease-[var(--easing-out)] group-hover:scale-110 will-change-transform ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
      </div>

      {/* Title & Info */}
      <div className="flex items-baseline gap-[var(--spacing-2)]">
        <span className="font-tech text-[length:var(--text-xs)] text-destructive uppercase tracking-[var(--tracking-widest)] font-[var(--font-weight-bold)]">
          ({index + 1}) 
        </span>
        <h3 className="text-[length:var(--text-sm)] font-[var(--font-weight-black)] uppercase tracking-[var(--tracking-wider)] text-foreground group-hover:text-destructive transition-colors duration-[var(--duration-slow)]">
          {work.title}
        </h3>
      </div>
    </div>
  )
}

export function WorksSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const ALL_WORKS = [...WORKS, ...EXPLORATIONS]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Section Header
      gsap.fromTo(
        '.works-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.works-header',
            start: 'top 85%',
          }
        }
      )

      // Batch animate grid items
      ScrollTrigger.batch('.works-item', {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { opacity: 0, y: 60, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out',
              overwrite: true
            }
          )
        },
        start: 'top 90%',
        once: true
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  const handleNext = () => {
    if (!selectedProject) return
    const currentIndex = ALL_WORKS.findIndex((p) => p.id === selectedProject.id)
    if (currentIndex < ALL_WORKS.length - 1) {
      setSelectedProject(ALL_WORKS[currentIndex + 1])
    }
  }

  const handlePrev = () => {
    if (!selectedProject) return
    const currentIndex = ALL_WORKS.findIndex((p) => p.id === selectedProject.id)
    if (currentIndex > 0) {
      setSelectedProject(ALL_WORKS[currentIndex - 1])
    }
  }

  const currentIndex = selectedProject 
    ? ALL_WORKS.findIndex((p) => p.id === selectedProject.id) 
    : -1

  return (
    <section ref={containerRef} className="w-full bg-neutral-200 px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-desktop)] py-[var(--spacing-24)] border-t border-border">
      <div className="max-w-[var(--container-xl)] mx-auto">
        {/* Section Header */}
        <div className="mb-[var(--spacing-16)] works-header">
          <h2 className="text-[length:var(--text-display-md)] leading-[var(--leading-ultra-tight)] font-[var(--font-weight-black)] tracking-[var(--tracking-tighter)] uppercase text-destructive max-w-[var(--container-md)]">
            More of what <br />
            we've crafted <br />
            with love
          </h2>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[var(--spacing-4)] md:gap-[var(--spacing-6)]">
          {ALL_WORKS.map((work, index) => (
            <WorksItem
              key={work.id}
              work={work}
              index={index}
              onClick={() => handleOpenModal(work)}
            />
          ))}
        </div>
      </div>

      <WorksPreviewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        currentProject={selectedProject}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={currentIndex < ALL_WORKS.length - 1}
        hasPrev={currentIndex > 0}
      />
    </section>
  )
}
