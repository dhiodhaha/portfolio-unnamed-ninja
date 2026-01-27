import { useRef, forwardRef, useImperativeHandle } from 'react'

export interface BootLoaderRef {
  element: HTMLDivElement | null
}

export const BootLoader = forwardRef<BootLoaderRef>(function BootLoader(_, ref) {
  const loaderRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    element: loaderRef.current,
  }))

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white"
    >
      <div className="font-tech text-xl tracking-[0.4em] mb-4 animate-pulse uppercase">
        Booting Unnamed Studio
      </div>
      <div className="w-40 h-[1px] bg-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-white animate-boot" />
      </div>
    </div>
  )
})
