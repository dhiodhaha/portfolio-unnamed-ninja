import { Link } from '@tanstack/react-router'

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-[var(--spacing-6)] overflow-hidden relative">
      {/* Background Ambience */}
      <h1 
        className="text-[20vw] font-black leading-none opacity-[0.03] select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
        style={{ fontFamily: 'var(--font-family-primary)' }}
      >
        404 ERROR
      </h1>

      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-lg">
        {/* Tech Header */}
        <div className="mb-[var(--spacing-8)]">
           <h2 className="text-[length:var(--text-display-lg)] leading-[0.9] font-black tracking-tighter uppercase text-destructive">
            Signal<br/>Lost
           </h2>
        </div>

        {/* Description */}
        <p className="font-tech text-[length:var(--text-lg)] text-neutral-500 uppercase tracking-widest mb-[var(--spacing-12)] leading-relaxed">
          The coordinate <br/>
          <span className="text-foreground border-b border-destructive">0x404_NOT_FOUND</span>
          <br/> does not exist in this sector.
        </p>

        {/* CTA Button */}
        <Link 
          to="/" 
          className="group relative inline-flex items-center gap-[var(--spacing-3)] px-[var(--spacing-8)] py-[var(--spacing-4)] bg-foreground text-background font-bold tracking-wider uppercase hover:bg-destructive hover:text-white transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10">Return to Grid</span>
          <span className="relative z-10 font-tech opacity-50 group-hover:opacity-100 transition-opacity">→</span>
          
          {/* Hover Effect */}
          <div className="absolute inset-0 bg-destructive transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </Link>
      </div>

      {/* Footer Tech Details */}
      <div className="absolute bottom-[var(--spacing-8)] left-0 w-full text-center">
         <p className="font-tech text-xs text-neutral-600 uppercase tracking-[0.2em] opacity-50">
            ERR_CODE_404 // SYSTEM_HALT
         </p>
      </div>
    </div>
  )
}
