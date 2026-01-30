export function Skeleton({ className }: { className?: string }) {
  return (
    <div 
      className={`relative overflow-hidden bg-neutral-300 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-skeleton-shimmer" />
    </div>
  )
}
