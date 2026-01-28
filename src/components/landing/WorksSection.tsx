import { WORKS } from '@/data/projects'

export function WorksSection() {
  return (
    <section className="w-full bg-neutral-200 px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-desktop)] py-[var(--spacing-24)] border-t border-border">
      <div className="max-w-[var(--container-xl)] mx-auto">
        {/* Section Header */}
        <div className="mb-[var(--spacing-16)]">
          <h2 className="text-[length:var(--text-display-md)] leading-[var(--leading-ultra-tight)] font-[var(--font-weight-black)] tracking-[var(--tracking-tighter)] uppercase text-destructive max-w-[var(--container-md)]">
            More of what <br />
            we've crafted <br />
            with love
          </h2>
        </div>

        {/* Works Masonry Grid */}
        <div className="columns-2 md:columns-4 gap-[var(--spacing-4)] md:gap-[var(--spacing-6)]">
          {WORKS.map((work) => (
            <div key={work.id} className="group cursor-pointer break-inside-avoid mb-[var(--spacing-6)]">
              {/* Image Container - Intrinsic aspect ratio */}
              <div className="relative w-full overflow-hidden rounded-[var(--radius-sm)] mb-[var(--spacing-4)] bg-neutral-300">
                <img
                  src={work.img}
                  alt={work.title}
                  className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transform transition-transform duration-[var(--duration-slower)] ease-[var(--easing-out)] group-hover:scale-110 will-change-transform"
                />
              </div>

              {/* Title & Info */}
              <div className="flex items-baseline gap-[var(--spacing-2)]">
                <span className="font-tech text-[length:var(--text-xs)] text-destructive uppercase tracking-[var(--tracking-widest)] font-[var(--font-weight-bold)]">
                  ({work.id + 1}) 
                </span>
                <h3 className="text-[length:var(--text-sm)] font-[var(--font-weight-black)] uppercase tracking-[var(--tracking-wider)] text-foreground group-hover:text-destructive transition-colors duration-[var(--duration-slow)]">
                  {work.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
