import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react'
import { PROJECTS, type Project } from '@/data/projects'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface ProjectStreamRef {
  projectRefs: (HTMLDivElement | null)[]
}

export const ProjectStream = forwardRef<ProjectStreamRef>(
  function ProjectStream(_, ref) {
    const projectRefs = useRef<(HTMLDivElement | null)[]>([])
    const containerRef = useRef<HTMLElement>(null)

    useImperativeHandle(ref, () => ({
      projectRefs: projectRefs.current,
    }))

    // Snap Scrolling Logic
    useEffect(() => {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          snap: {
            snapTo: 1 / (PROJECTS.length - 1),
            duration: 0, // Very short window
            delay: 0, // No delay
            ease: 'power1.out', // Fast easing
            inertia: false, // Snap immediately
            directional: true, // Snap in direction of scroll
          },
        })
      })

      return () => ctx.revert()
    }, [])

    return (
      <section ref={containerRef} className="w-full md:w-[50%] relative z-0 bg-white">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            isPriority={index === 0}
            ref={(el) => {
              projectRefs.current[index] = el
            }}
          />
        ))}
      </section>
    )
  }
)

interface ProjectCardProps {
  project: Project
  isPriority?: boolean
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  function ProjectCard({ project, isPriority }, ref) {
    return (
      <div
        ref={ref}
        data-id={project.id}
        className="min-h-[50vh] md:min-h-screen flex flex-col justify-center p-[var(--section-padding-x-mobile)] md:pl-[var(--spacing-10)] md:pr-[var(--spacing-24)]"
      >
        <div className="group cursor-pointer">
          {/* Top Info Row */}
          <div className="flex justify-between items-center mb-6">
            <span className="font-tech text-2xl text-neutral-500 uppercase">
              NODE_0{project.id}
            </span>
          </div>

          {/* Image Container */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 rounded-sm mb-12">
            {project.video ? (
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
              />
            ) : (
              <img
                src={`${project.img}&w=1200&auto=format,compress&fm=webp`}
                alt={project.title}
                width={1200}
                height={900}
                loading={isPriority ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
              />
            )}
          </div>

          {/* Project Details */}
          <div className="flex justify-between items-end border-t border-black/10 pt-8">
            <div>
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] mb-2 flex flex-wrap items-baseline gap-4">
                <span>{project.title}</span>
                {project.link && (
                  <span className="font-tech text-xl md:text-2xl text-neutral-400 tracking-normal normal-case opacity-70">
                    / <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-destructive transition-colors hover:underline decoration-1 underline-offset-4">{project.link}</a>
                  </span>
                )}
              </h3>
              <p className="font-tech text-xl text-neutral-400 uppercase tracking-widest">
                {project.category}
              </p>
            </div>
            
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-30 block mb-1">
                Ref. Code
              </span>
              <p className="font-tech text-lg text-neutral-800">FY/{project.year}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
