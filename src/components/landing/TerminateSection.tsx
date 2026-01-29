import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export function TerminateSection() {
  const textRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!textRef.current) return

      // Calculates position from -1 (left) to 1 (right)
      const xPos = (e.clientX / window.innerWidth - 0.5) * 2
      
      gsap.to(textRef.current, {
        x: xPos * (window.innerWidth / 2), // Move across full width
        duration: 1.5,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-gray-200 text-black overflow-hidden z-50 py-20 border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        
        {/* Interactive Text moved to top */}
        <div className="flex justify-center items-center pb-20 relative">
          <h2 
            ref={textRef}
            className="text-3xl leading-none tracking-tighter uppercase whitespace-nowrap"
          >
            <span className="font-black">UNNAMED+</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <span className="font-tech text-xs uppercase tracking-widest opacity-60 block mb-2">
              Start The Protocol
            </span>
            <p className="text-sm font-medium opacity-80 max-w-xs">
              Site engineered by Unnamed+
            </p>
            <div className="mt-8 font-black text-xl">©2026</div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* <div>
              <h3 className="font-black uppercase tracking-widest text-sm mb-4">Stalk Me</h3>
              <div className="flex flex-col gap-2 text-sm font-medium opacity-80">
                <a href="#" className="hover:opacity-100 uppercase">LinkedIn</a>
                <a href="#" className="hover:opacity-100 uppercase">Dribbble</a>
                <a href="#" className="hover:opacity-100 uppercase">Twitter</a>
              </div>
            </div> */}
            <div>
              <h3 className="font-black uppercase tracking-widest text-sm mb-4">Say Hello</h3>
              <p className="text-sm font-medium opacity-80 mb-4">
                We are open project.  Or simply say hello if you like the site.
              </p>
              <a href="mailto:hello@unnamed.studio" className="font-black underline decoration-2 underline-offset-4 hover:opacity-70 transition-opacity">
                hello@unnamed.plus
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
