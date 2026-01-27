import React, { useEffect, useRef, useState } from 'react';

const PROJECTS = [
  {
    id: 1,
    title: "Cofounder Systems",
    category: "Autonomous Agents",
    year: "2025",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564"
  },
  {
    id: 2,
    title: "Pixel Garden",
    category: "Generative Environments",
    year: "2024",
    img: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2564"
  },
  {
    id: 3,
    title: "Neural Interface",
    category: "Human Machine Interaction",
    year: "2024",
    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2564"
  }
];

const CLIENTS = ["Vercel", "Linear", "Stripe", "Apple", "OpenAI", "Mobbin"];

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [activeProject, setActiveProject] = useState(0); // 0: Hero/CTA, 1-3: Projects
  const [isInStream, setIsInStream] = useState(false);
  
  const loaderRef = useRef(null);
  const projectRefs = useRef([]);
  const streamTriggerRef = useRef(null);

  // Memuat Font Geist dan library GSAP via CDN
  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.href = "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=VT323&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    const scriptGsap = document.createElement('script');
    scriptGsap.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    scriptGsap.async = true;
    scriptGsap.onload = () => setGsapLoaded(true);
    document.head.appendChild(scriptGsap);

    const timer = setTimeout(() => setIsLoading(false), 800);

    return () => {
      document.head.removeChild(fontLink);
      document.head.removeChild(scriptGsap);
      clearTimeout(timer);
    };
  }, []);

  // Animasi awal saat sistem boot-up selesai
  useEffect(() => {
    if (!gsapLoaded || !window.gsap || isLoading) return;
    
    const gsap = window.gsap;
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.to(loaderRef.current, { 
      yPercent: -100, 
      duration: 0.6, 
      ease: "expo.inOut" 
    })
    .from(".hero-element", { 
      y: 60, 
      opacity: 0, 
      duration: 1, 
      stagger: 0.1 
    }, "-=0.2")
    .from(".nav-item", { 
      y: -20, 
      opacity: 0, 
      duration: 0.8, 
      stagger: 0.1 
    }, "-=0.8");

  }, [isLoading, gsapLoaded]);

  // Observer untuk mendeteksi apakah user sedang berada di Stream Section
  useEffect(() => {
    if (isLoading) return;

    const streamObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsInStream(entry.isIntersecting);
      });
    }, { threshold: 0.1 });

    if (streamTriggerRef.current) {
      streamObserver.observe(streamTriggerRef.current);
    }

    const projectObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-id');
          if (id) setActiveProject(parseInt(id));
        }
      });
    }, { threshold: 0.5 });

    projectRefs.current.forEach(ref => {
      if (ref) projectObserver.observe(ref);
    });

    return () => {
      streamObserver.disconnect();
      projectObserver.disconnect();
    };
  }, [isLoading]);

  return (
    <div className="bg-[#fcfcfc] text-[#111] font-['Geist'] selection:bg-black selection:text-white">
      
      <style>{`
        .font-tech { font-family: 'VT323', monospace; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* BOOT LOADER (Hanya muncul sekali di awal) */}
      <div 
        ref={loaderRef}
        className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white"
      >
        <div className="font-tech text-xl tracking-[0.4em] mb-4 animate-pulse uppercase">
          Booting Unnamed Studio
        </div>
        <div className="w-40 h-[1px] bg-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-white translate-x-[-100%] animate-[boot_0.8s_ease-in-out_infinite]" />
        </div>
        <style>{` @keyframes boot { 100% { transform: translateX(100%); } } `}</style>
      </div>

      {/* NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center pointer-events-none">
        <div className="nav-item flex items-center gap-4 pointer-events-auto cursor-pointer group">
          <div className="w-8 h-8 bg-black flex items-center justify-center rounded-sm group-hover:rotate-90 transition-transform duration-500 shadow-lg">
            <div className="w-3 h-3 border border-white rotate-45" />
          </div>
          <span className="font-black tracking-tighter text-xl uppercase">UNNAMED STUDIO</span>
        </div>
        
        <div className="hidden md:flex gap-12 pointer-events-auto">
          {["Work", "About", "Contact"].map((item) => (
            <a key={item} href="#" className="text-[10px] uppercase tracking-[0.3em] font-black hover:opacity-40 transition-opacity">
              {item}
            </a>
          ))}
        </div>

        <div className="nav-item pointer-events-auto">
          <div className={`bg-black text-white px-5 py-2 text-[10px] uppercase tracking-widest font-black rounded-sm shadow-xl transition-all duration-500 ${isInStream ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            Stream: 0{activeProject}
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION (Full Width) */}
      <section className="relative h-screen w-full flex flex-col justify-center px-6 md:px-20 bg-white border-b border-black/5 z-40">
        <div className="max-w-7xl w-full mx-auto relative z-10">
          <div className="hero-element mb-6">
            <span className="font-tech text-2xl text-blue-600 uppercase tracking-widest">[ System.Entry ]</span>
          </div>
          <h1 className="hero-element text-6xl md:text-[8vw] leading-[0.85] font-black tracking-tighter uppercase mb-12">
            Starting a <br /> 
            <span className="text-neutral-300 italic">Real World</span> <br /> 
            Company.
          </h1>
          <div className="hero-element flex flex-col md:flex-row gap-10 md:items-end justify-between">
            <p className="max-w-md text-xl md:text-2xl font-medium text-neutral-400 leading-tight">
              Kolektif desain engineering yang membangun agen koordinasi untuk para pendiri masa depan.
            </p>
            <div className="flex items-center gap-6">
                <span className="font-tech text-lg opacity-40">Scroll ke bawah untuk mulai</span>
                <div className="w-12 h-px bg-black/10" />
            </div>
          </div>
        </div>

        {/* Aksen Bunga Pixel (Placeholder) */}
        <div className="hero-element absolute bottom-10 right-10 md:bottom-20 md:right-20 opacity-30 pointer-events-none">
           <div className="w-24 h-24 md:w-56 md:h-56 border-2 border-black/5 p-4 flex items-center justify-center">
              <div className="w-full h-full bg-yellow-400 rounded-sm shadow-[10px_10px_0px_black]" />
           </div>
        </div>
      </section>

      {/* 2. AREA SPLIT (Mission Log & Stream) */}
      {/* Menggunakan scroll global browser, bukan inner-scroll */}
      <div ref={streamTriggerRef} className="flex flex-col md:flex-row relative z-30">
        
        {/* MISSION LOG (Fixed di sisi kiri saat scroll) */}
        <aside className="w-full md:w-[45%] h-auto md:h-screen p-8 md:p-20 flex flex-col justify-between border-r border-black/5 bg-[#fafafa] sticky top-0 z-10">
          <div>
            <div className="mb-6">
              <span className="font-tech text-2xl text-blue-600 uppercase tracking-widest">[ Mission Log ]</span>
            </div>
            
            <h2 className="text-5xl md:text-[5vw] leading-[0.95] font-black tracking-tighter mb-12 uppercase">
              What <br /> Are We?
            </h2>

            <div className="max-w-sm space-y-12">
              <p className="text-xl md:text-2xl font-medium leading-snug">
                Membangun interface taktil dan sistem digital yang memiliki jiwa.
              </p>

              <div>
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-400 mb-6 italic">Ecosystem Partner</h3>
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  {CLIENTS.map((client) => (
                    <span key={client} className="text-sm font-bold opacity-30 hover:opacity-100 transition-opacity">
                      {client}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <footer className="pt-10 border-t border-black/5 space-y-6">
             <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Loc: JKT / 6.2088° S</span>
                <div className="flex gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                   <span className="font-tech text-sm uppercase text-green-600">Online</span>
                </div>
             </div>
             <div className="flex justify-between items-end">
                <p className="text-[9px] uppercase tracking-[0.2em] font-black text-neutral-300">
                  © 2026 UNNAMED STUDIO <br /> ENCRYPTED CONNECTION
                </p>
                <div className="flex gap-1">
                   {[1,2,3,4].map(i => <div key={i} className="w-3 h-3 bg-neutral-100 border border-black/5" />)}
                </div>
             </div>
          </footer>
        </aside>

        {/* STREAM SECTION (Scroll normal di sisi kanan) */}
        <section className="w-full md:w-[55%] relative z-0">
          {PROJECTS.map((project, index) => (
            <div 
              key={project.id}
              data-id={project.id}
              ref={el => projectRefs.current[index] = el}
              className="h-screen flex flex-col justify-center p-8 md:p-20 border-b border-black/5"
            >
              <div className="group cursor-pointer">
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 border border-black/5 shadow-sm rounded-sm">
                  <img 
                    src={project.img} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                  
                  <div className="absolute top-8 left-8">
                     <span className="font-tech text-5xl text-white mix-blend-difference">
                        NODE_0{project.id}
                     </span>
                  </div>
                  <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/20" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-white px-10 py-4 border border-black shadow-[8px_8px_0px_black]">
                      <span className="text-[11px] uppercase tracking-[0.4em] font-black italic">Buka File</span>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-between items-start">
                  <div>
                    <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none italic">{project.title}</h3>
                    <p className="mt-4 font-tech text-2xl text-neutral-400 uppercase tracking-widest italic">{project.category}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-20">Ref. Code</span>
                    <p className="font-tech text-xl">FY/{project.year}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* 3. TERMINATE STREAM SECTION (Full Width di paling bawah) */}
      {/* Seluruh area split akan terangkat ke atas saat scroll masuk ke sini */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center bg-black text-white p-8 z-50">
        <div className="font-tech text-2xl mb-12 text-blue-500 uppercase tracking-[0.4em] italic text-center">
            [ Terminate Stream ]
        </div>
        <a href="mailto:hello@unnamed.studio" className="text-5xl md:text-[8vw] font-black uppercase tracking-tighter hover:text-neutral-500 transition-all text-center leading-[0.85] italic">
          Hubungi <br /> Protokol <br /> Kami.
        </a>
        <div className="mt-24 flex gap-10 text-[10px] font-black uppercase tracking-widest opacity-40">
          <a href="#" className="hover:opacity-100 hover:line-through">Twitter</a>
          <a href="#" className="hover:opacity-100 hover:line-through">Instagram</a>
          <a href="#" className="hover:opacity-100 hover:line-through">LinkedIn</a>
        </div>
        
        {/* Detail sistem di footer akhir */}
        <div className="absolute bottom-10 left-10 font-tech text-white/20 text-xs">BUILD_STATUS_STABLE_VER_0.4.1</div>
        <div className="absolute bottom-10 right-10 flex gap-2">
           {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 bg-white/20" />)}
        </div>
      </section>

    </div>
  );
};

export default App;