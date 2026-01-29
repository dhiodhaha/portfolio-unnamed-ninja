export interface Project {
  id: number
  title: string
  category: string
  year: string
  img: string
  video?: string
  link?: string
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Devault App',
    category: 'Smart AI Bookmark App',
    year: '2026',
    img: '', // Video cover or empty if autoplay
    video: '/best/devault-app-demo.mp4',
    link: 'http://devault.app',
  },
  {
    id: 2,
    title: 'PT Gunung Kendali',
    category: 'LANDING PAGE',
    year: '2025',
    img: '',
    video: '/best/pt-gunung-kendali-docking-showcase.mp4',
    link: 'https://ptgunungkendalidocking.com',
  },
  {
    id: 3,
    title: 'Neural Interface',
    category: 'Human Machine Interaction',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2564',
  },
]

export const WORKS: Project[] = []

export const CLIENTS = ['Vercel', 'Linear', 'Stripe', 'Apple', 'OpenAI', 'Mobbin']

export const EXPLORATIONS: Project[] = [
  { id: 13, title: 'Original', category: 'Exploration', year: '2024', img: '/exploration/exploration-original.webp' },
  { id: 14, title: 'Concept', category: 'Exploration', year: '2024', img: '/exploration/exploration-concept.webp' },
  { id: 15, title: 'Interface', category: 'Exploration', year: '2024', img: '/exploration/exploration-interface.webp' },
  { id: 16, title: 'Prototype', category: 'Exploration', year: '2024', img: '/exploration/exploration-prototype.webp' },
  { id: 17, title: 'Visual', category: 'Exploration', year: '2024', img: '/exploration/exploration-visual.webp' },
  { id: 18, title: 'Design', category: 'Exploration', year: '2024', img: '/exploration/exploration-design.webp' },
  { id: 19, title: 'Experiment', category: 'Exploration', year: '2024', img: '/exploration/exploration-experiment.webp' },
  { id: 20, title: 'Study', category: 'Exploration', year: '2024', img: '/exploration/exploration-study.webp' },
  { id: 21, title: 'Sketch', category: 'Exploration', year: '2024', img: '/exploration/exploration-sketch.webp' },
  { id: 22, title: 'Mataro Eyewear', category: 'Exploration', year: '2024', img: '/exploration/mataro-eyewear.webp' },
]
