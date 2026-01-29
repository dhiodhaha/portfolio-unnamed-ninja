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
    video: '/best/Devault App Demo.mp4',
    link: 'http://devault.app',
  },
  {
    id: 2,
    title: 'PT Gunung Kendali',
    category: 'LANDING PAGE',
    year: '2025',
    img: '',
    video: '/best/PT GUNUNG KENDALI DOCKING SHOWCASE.mp4',
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
  { id: 13, title: 'Original', category: 'Exploration', year: '2024', img: '/exploration/original-33e69980cf20ecf71ba1fd0960a4f049.webp' },
  { id: 14, title: 'Concept', category: 'Exploration', year: '2024', img: '/exploration/original-69d110760bad8ac08a1017d9784b2f7c.webp' },
  { id: 15, title: 'Interface', category: 'Exploration', year: '2024', img: '/exploration/original-6d4fbda71918b9c945832e6c86c8457b.webp' },
  { id: 16, title: 'Prototype', category: 'Exploration', year: '2024', img: '/exploration/original-6edf6299f13495063c06a5e4280a9a6f.webp' },
  { id: 17, title: 'Visual', category: 'Exploration', year: '2024', img: '/exploration/original-84c535d7a73d728d2ee8b949ee65305b.webp' },
  { id: 18, title: 'Design', category: 'Exploration', year: '2024', img: '/exploration/original-b1c2bdb276afa3a9aaaeb5ca22153313.webp' },
  { id: 19, title: 'Experiment', category: 'Exploration', year: '2024', img: '/exploration/original-b4febdb529b8f9fec0a1e944e322cd0e.webp' },
  { id: 20, title: 'Study', category: 'Exploration', year: '2024', img: '/exploration/original-b51fb88d5481d815854d294cab2c2980.webp' },
  { id: 21, title: 'Sketch', category: 'Exploration', year: '2024', img: '/exploration/original-c53e1aa84a5ea02c0759756e575ea678.webp' },
  { id: 22, title: 'Mataro Eyewear', category: 'Exploration', year: '2024', img: '/exploration/mataro-eyewear.webp' },
]
