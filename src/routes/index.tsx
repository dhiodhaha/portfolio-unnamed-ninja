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
  ScrollProgress,
  WorksSection,
  type BootLoaderRef,
  type ProjectStreamRef,
} from '@/components/landing'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)
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

  // Intersection observers for stream section
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

    if (streamTriggerRef.current) {
      streamObserver.observe(streamTriggerRef.current)
    }

    return () => {
      streamObserver.disconnect()
    }
  }, [isLoading])

  return (
    <main className="bg-[#fcfcfc] text-[#111] font-['Geist'] selection:bg-black selection:text-white">
      <BootLoader ref={loaderRef} />
      <Navbar />
      <HeroSection />

      {/* Split area: Mission Log & Project Stream */}
      <div
        ref={streamTriggerRef}
        className="flex flex-col md:flex-row relative z-30"
      >
        <MissionLog />
        <ProjectStream ref={projectStreamRef} />
      </div>

      {/* Scroll Progress Indicator */}
      <ScrollProgress containerRef={streamTriggerRef} isVisible={isInStream} />

      <WorksSection />
      
      <TerminateSection />
    </main>
  )
}
