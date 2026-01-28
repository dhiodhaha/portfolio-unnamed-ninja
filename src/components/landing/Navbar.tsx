import { Link } from '@tanstack/react-router'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center pointer-events-none mix-blend-difference text-white">
      <Link
        to="/"
        className="nav-item flex items-center gap-4 pointer-events-auto cursor-pointer group"
      >
        <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm group-hover:rotate-90 transition-transform duration-500">
          <div className="w-3 h-3 border border-black rotate-45" />
        </div>
        <span className="font-black tracking-tighter text-xl uppercase">
          UNNAMED NINJA
        </span>
      </Link>

      <div className="hidden md:flex gap-12 pointer-events-auto">
        {['Work', 'About', 'Contact'].map((item) => (
          <a
            key={item}
            href="#"
            className="text-[10px] uppercase tracking-[0.3em] font-black hover:opacity-60 transition-opacity"
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  )
}
