export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex flex-col justify-between px-6 md:px-10 pt-32 pb-0 bg-[#f0f0f0] border-b border-black/5 z-40 overflow-hidden">
      
      {/* Center Description */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto text-center z-10">
        <p className="text-lg md:text-2xl font-medium leading-relaxed tracking-tight text-neutral-800">
          UNNAMED is a creative design engineering factory that crafts one-of-a-kind
          experiences for the web. We bridge the gap between imagination and
          reality, transforming your values and philosophy into digital
          storytelling. Our team of passionate artisans curates memorable
          personal, corporate, and brand identities — cultivating deeper emotional
          resonance through pixels.
        </p>
      </div>

      {/* Bottom Section */}
      <div className="w-full z-10" >
        {/* Stats Row */}
        <div className="flex justify-between items-end border-b-2 border-transparent pb-12 mb-[-2vw]">
          <span className="font-tech text-xs md:text-sm font-bold tracking-widest uppercase">
            10+ Projects Shipped
          </span>
          <span className="font-tech text-xs md:text-sm font-bold tracking-widest uppercase hidden md:block">
            A Year of Pixel Perfection
          </span>
          <span className="font-tech text-xs md:text-sm font-bold tracking-widest uppercase">
            10+ Collaborations
          </span>
        </div>

        {/* Giant Text */}
        <h1 className="text-[13.5vw] md:text-[15.5vw] leading-[0.8] font-black tracking-tighter text-black text-center mix-blend-overlay opacity-90 select-none">
          UNNAMED
        </h1>
      </div>

      {/* Background Texture/Noise (Optional CSS) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
      />
    </section>
  )
}
