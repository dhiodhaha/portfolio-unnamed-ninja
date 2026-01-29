---
name: Creative Engineering
description: A guidebook for building high-end, award-winning immersive web experiences using React, Tailwind, GSAP, and Lenis.
---

# Creative Engineering Skill

This skill allows you to implement "Awwwards-level" interactions and layouts. Use these patterns when the user requests "immersive," "premium," or "creative" features.

## 1. Core Architecture
- **Framework**: React + Vite + TypeScript
- **Styling**: Tailwind CSS for layout/utility + CSS Modules/Variables for complex animations.
- **Motion**: GSAP (GreenSock) for complex sequencing and ScrollTrigger.
- **Scrolling**: Lenis (Smooth Scroll) for momentum and feel.

## 2. Smooth Scrolling (Lenis)
Crucial for that "premium" feel.

### Setup Pattern
Always wrap the application in a context provider that exposes the Lenis instance.

```typescript
// SmoothScroll.tsx
export function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  
  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // "Out Quart"
      orientation: 'vertical',
      smoothWheel: true,
    })
    setLenis(lenisInstance)
    
    // GSAP Sync (CRITICAL)
    lenisInstance.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenisInstance.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    requestAnimationFrame(function raf(time) {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    })

    return () => lenisInstance.destroy()
  }, [])
  // ... provide context
}
```

### Locking Scroll (Overlays)
When opening a full-screen modal, **DO NOT** just hide the overflow on `body` if you are using Lenis. It can cause sync issues.
**Instead:**
1.  Pause Lenis: `lenis.stop()`
2.  Lock Body: `document.body.style.overflow = 'hidden'`
3.  Resume on close: `lenis.start()`

## 3. Immersive Component Patterns

### The "Behance-Style" Preview Modal
An immersive modal that allows scrolling a long image (like a landing page design) while keeping controls fixed.

**Requirements:**
- **Overlay**: Full screen, fixed, dark background with blur.
- **Controls**: Absolute positioned or Fixed, z-index > image.
- **Image**: "Forced Big" — width fills container, height is auto (can be massive).
- **Scrolling**: The **modal container** handles the `overflow-y-auto`.
- **Native Scroll**: Add `data-lenis-prevent` to the scrolling element to bypass smooth scroll interception.

**Layout Structure:**
```tsx
<div className="fixed inset-0 z-50 ...">
  {/* Controls (Fixed) */}
  <div className="absolute top-0 z-20 ...">Controls</div>

  {/* Scrollable Viewport */}
  <div 
    className="absolute inset-0 overflow-y-auto z-10"
    data-lenis-prevent // CRITICAL for inner scrolling
  >
    <div className="min-h-full flex flex-col items-center py-20">
       <img src="..." className="w-full max-w-6xl h-auto" />
    </div>
  </div>
</div>
```

## 4. Aesthetic Guidelines

### Typography & Inversion
- Use **Mix Blend Mode** for text over dynamic backgrounds to ensure readability without backgrounds.
  - `mix-blend-mode: difference`
  - Text color: `text-white` (inverts to black on white usage).

### Minimal Tech UI
- **ASCII Art Controls**: Use `[ ]`, arrows `← →`, and simple glpyhs for a raw, engineering aesthetic.
- **Monospace Fonts**: Use `font-mono` for technical details (IDs, Coordinates, Status).
- **Uppercase**: Tracking widest for headers and labels.

### Visual Quality
- **Images**: Always use `object-cover` or `object-contain` with explicit aspect ratios when loading to prevent CLS.
- **Loading**: Use `decoding="async"` and `loading="lazy"` for non-critical assets.
- **Backdrop**: Use `backdrop-blur-md` or `lg` for overlays to maintain context while focusing attention.
