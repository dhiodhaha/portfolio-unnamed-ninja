import { forwardRef, useImperativeHandle, useRef } from 'react'
import { PROJECTS, type Project } from '@/data/projects'

export interface ProjectStreamRef {
  projectRefs: (HTMLDivElement | null)[]
}

export const ProjectStream = forwardRef<ProjectStreamRef>(
  function ProjectStream(_, ref) {
    const projectRefs = useRef<(HTMLDivElement | null)[]>([])

    useImperativeHandle(ref, () => ({
      projectRefs: projectRefs.current,
    }))

    return (
      <section className="w-full md:w-[50%] relative z-0 bg-white">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
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
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  function ProjectCard({ project }, ref) {
    return (
      <div
        ref={ref}
        data-id={project.id}
        className="min-h-screen flex flex-col justify-center p-8 md:p-10"
      >
        <div className="group cursor-pointer">
          {/* Top Info Row */}
          <div className="flex justify-between items-center mb-6">
            <span className="font-tech text-2xl text-neutral-300 uppercase">
              NODE_0{project.id}
            </span>
          </div>

          {/* Image Container */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 rounded-sm mb-12">
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
            />
          </div>

          {/* Project Details */}
          <div className="flex justify-between items-end border-t border-black/10 pt-8">
            <div>
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] mb-2">
                {project.title}
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
