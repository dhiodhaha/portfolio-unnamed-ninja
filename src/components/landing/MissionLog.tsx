export function MissionLog() {
  return (
    <aside className="w-full md:w-[50%] h-auto md:h-screen p-8 md:p-12 flex flex-col justify-between bg-white md:sticky md:top-0 z-10 md:overflow-hidden">
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center max-w-lg">
        <div className="mb-6">
          <span className="font-tech text-sm text-blue-600 uppercase tracking-widest font-bold">
            [ Mission Log ]
          </span>
        </div>

        <h2 className="text-7xl md:text-[7vw] leading-[0.85] font-black tracking-tighter mb-8 uppercase text-black">
          Who <br />
          We Are?
        </h2>

        <div className="space-y-12">
          <p className="text-xl md:text-2xl font-medium leading-snug text-neutral-800">
            We bridge design and engineering to build digital products with clarity, purpose, and longevity.
          </p>

{/* 
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-500 mb-6">
              Our Client
            </h3>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {CLIENTS.map((client) => (
                <span
                  key={client}
                  className="text-xs font-bold text-neutral-500 hover:text-black transition-colors cursor-default"
                >
                  {client}
                </span>
              ))}
            </div>
          </div> 
          */}
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-10 flex justify-between items-end">
        <div className="space-y-2">
          <span className="block text-[10px] font-black uppercase tracking-widest text-neutral-500">
            Loc: ID / 6.2088° S
          </span>
          <p className="text-[9px] uppercase tracking-[0.2em] font-black text-neutral-500 leading-relaxed">
            © 2026 UNNAMED+STUDIO <br /> 
          </p>
        </div>
        
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="font-tech text-xs uppercase text-green-600 font-bold">
            Online
          </span>
          <div className="flex gap-0.5 ml-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-2 h-2 bg-neutral-100 border border-black/5" />
            ))}
          </div>
        </div>
      </footer>
    </aside>
  )
}
