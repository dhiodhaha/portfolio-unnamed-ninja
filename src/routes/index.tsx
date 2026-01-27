import { useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import gsap from 'gsap'

import {
  BootLoader,
  Navbar,
  HeroSection,
  MissionLog,
  ProjectStream,
  TerminateSection,
  type BootLoaderRef,
  type ProjectStreamRef,
} from '@/components/landing'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeProject, setActiveProject] = useState(0)
  const [isInStream, setIsInStream] = useState(false)

  const loaderRef = useRef<BootLoaderRef>(null)
  const projectStreamRef = useRef<ProjectStreamRef>(null)
  const streamTriggerRef = useRef<HTMLDivElement>(null)

  // Boot-up timer
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // GSAP animations after loading
  useEffect(() => {
    if (isLoading || !loaderRef.current?.element) return

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    tl.to(loaderRef.current.element, {
      yPercent: -100,
      duration: 0.6,
      ease: 'expo.inOut',
    })
      .from(
        '.hero-element',
        {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
        },
        '-=0.2'
      )
      .from(
        '.nav-item',
        {
          y: -20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
        },
        '-=0.8'
      )
  }, [isLoading])

  // Intersection observers for stream section and projects
  useEffect(() => {
    if (isLoading) return

    const streamObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsInStream(entry.isIntersecting)
        }
      },
      { threshold: 0.1 }
    )

    const projectObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id')
            if (id) setActiveProject(Number.parseInt(id))
          }
        }
      },
      { threshold: 0.5 }
    )

    if (streamTriggerRef.current) {
      streamObserver.observe(streamTriggerRef.current)
    }

    const projectRefs = projectStreamRef.current?.projectRefs ?? []
    for (const ref of projectRefs) {
      if (ref) projectObserver.observe(ref)
    }

    return () => {
      streamObserver.disconnect()
      projectObserver.disconnect()
    }
  }, [isLoading])

  return (
    <div className="bg-[#fcfcfc] text-[#111] font-['Geist'] selection:bg-black selection:text-white">
      <BootLoader ref={loaderRef} />
      <Navbar isInStream={isInStream} activeProject={activeProject} />
      <HeroSection />

      {/* Split area: Mission Log & Project Stream */}
      <div
        ref={streamTriggerRef}
        className="flex flex-col md:flex-row relative z-30"
      >
        <MissionLog />
        <ProjectStream ref={projectStreamRef} />
      </div>

      <TerminateSection />
    </div>
  )
}
