import { useState, useEffect, useRef } from 'react'
import { WORKS, EXPLORATIONS, type Project } from '@/data/projects'
import { WorksPreviewModal } from './WorksPreviewModal'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
        onEnter: (elements, triggers) => {
          // Sort elements by visual vertical position to handle CSS masonry DOM order
          // This ensures animations flow Top -> Bottom across columns, not Col 1 -> Col 2
          elements.sort((a, b) => {
            const rectA = (a as HTMLElement).getBoundingClientRect();
            const rectB = (b as HTMLElement).getBoundingClientRect();
            return rectA.top - rectB.top || rectA.left - rectB.left;
          });

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
    setTimeout(() => setSelectedProject(null), 300) // Wait for animation
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

        {/* Works Masonry Grid */}
        <div className="columns-2 md:columns-4 gap-[var(--spacing-4)] md:gap-[var(--spacing-6)]">
          {ALL_WORKS.map((work, index) => (
            <div 
              key={work.id} 
              onClick={() => handleOpenModal(work)}
              className="group works-item cursor-pointer break-inside-avoid mb-[var(--spacing-6)] opacity-0"
            >
              {/* Image Container - Intrinsic aspect ratio */}
              <div className="relative w-full overflow-hidden rounded-[var(--radius-sm)] mb-[var(--spacing-4)] bg-neutral-300">
                <img
                  src={work.img.startsWith('http') ? `${work.img}&w=800&auto=format,compress&fm=webp` : work.img}
                  alt={work.title}
                  width={800}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover transform transition-transform duration-[var(--duration-slower)] ease-[var(--easing-out)] group-hover:scale-110 will-change-transform"
                />
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
