export interface Project {
  id: number
  title: string
  category: string
  year: string
  img: string
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Cofounder Systems',
    category: 'Autonomous Agents',
    year: '2025',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564',
  },
  {
    id: 2,
    title: 'Pixel Garden',
    category: 'Generative Environments',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2564',
  },
  {
    id: 3,
    title: 'Neural Interface',
    category: 'Human Machine Interaction',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2564',
  },
]

export const CLIENTS = ['Vercel', 'Linear', 'Stripe', 'Apple', 'OpenAI', 'Mobbin']
