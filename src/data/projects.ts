export interface Project {
  id: number
  title: string
  category: string
  year: string
  img: string
  thumbnail?: string
  slides?: string[]
  video?: string
  link?: string
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Jagorawi Golf',
    category: 'FULL SITE',
    year: '2024',
    img: '',
    video: '/best/jagorawi-golf-showcase.mp4',
    link: 'https://jagorawi.com',
  },
  {
    id: 2,
    title: 'Devault App',
    category: 'Smart AI Bookmark App',
    year: '2026',
    img: '', // Video cover or empty if autoplay
    video: '/best/devault-app-demo.mp4',
    link: 'http://devault.app',
  },
  {
    id: 3,
    title: 'PT Gunung Kendali',
    category: 'LANDING PAGE',
    year: '2025',
    img: '',
    video: '/best/pt-gunung-kendali-docking-showcase.mp4',
    link: 'https://ptgunungkendalidocking.com',
  },
  {
    id: 4,
    title: 'Blink Beauty Clinic',
    category: 'FULL SITE',
    year: '2024',
    img: '',
    video: '/best/blink-beauty-clinic-showcase.mp4',
    link: 'https://blinkbeautyclinic.com',
  },
]

export const WORKS: Project[] = []

export const CLIENTS = ['Devscale', 'Blink', 'Devault', 'Kendali', 'Jagorawi']

export const EXPLORATIONS: Project[] = [
  {
    id: 200,
    title: 'Design Process',
    category: 'Exploration',
    year: '2024',
    img: '/exploration/exploration-interface.webp',
    thumbnail: '/exploration/exploration-interface.webp',
    slides: [
      '/exploration/exploration-interface.webp',
      '/exploration/exploration-original.webp',
      '/exploration/exploration-study.webp',
      '/exploration/exploration-sketch.webp'
    ]
  },
  { id: 101, title: 'Devscale Dashboard', category: 'Exploration', year: '2024', img: '/exploration/devscale-dashboard.webp', thumbnail: '/exploration/devscale-dashboard.webp' },
  { id: 102, title: 'Devscale Landing', category: 'Exploration', year: '2024', img: '/exploration/preview-devscale-landing.webp', thumbnail: '/exploration/devscale-landing.webp' },
  { id: 104, title: 'GlobalClean App', category: 'Exploration', year: '2024', img: '/exploration/preview-globalclean-app.webp', thumbnail: '/exploration/globalclean-app.webp' },
  { id: 105, title: 'Jagorawi Concept', category: 'Exploration', year: '2024', img: '/exploration/preview-jagorawi-concept.webp', thumbnail: '/exploration/jagorawi-concept.webp' },
  { id: 106, title: 'Kumpul Coworking', category: 'Exploration', year: '2024', img: '/exploration/preview-kumpul-coworking.webp', thumbnail: '/exploration/kumpul-coworking.webp' },
  { id: 107, title: 'Minimal Portfolio', category: 'Exploration', year: '2024', img: '/exploration/preview-minimal-portfolio.webp', thumbnail: '/exploration/minimal-portfolio.webp' },
  { id: 108, title: 'Nova OS', category: 'Exploration', year: '2024', img: '/exploration/preview-nova-os.webp', thumbnail: '/exploration/nova-os.webp' },
  { id: 109, title: 'Parcels Tracking', category: 'Exploration', year: '2024', img: '/exploration/preview-parcels-app.webp', thumbnail: '/exploration/parcels-app.webp' },
  { id: 110, title: 'Sacred Forest', category: 'Exploration', year: '2024', img: '/exploration/preview-sacred-monkey-forest.webp', thumbnail: '/exploration/sacred-monkey-forest.webp' },
  { id: 22, title: 'Mataro Eyewear', category: 'Exploration', year: '2024', img: '/exploration/mataro-eyewear.webp', thumbnail: '/exploration/mataro-eyewear.webp' },
]
