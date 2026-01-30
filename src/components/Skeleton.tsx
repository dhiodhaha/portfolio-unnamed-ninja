export function Skeleton({ className }: { className?: string }) {
  return (
    <div 
      className={`relative overflow-hidden bg-neutral-300 ${className}`}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        style={{
          backgroundSize: '200% 100%',
          animation: 'skeleton-shimmer 1.5s infinite linear',
        }}
      />
      <style>{`
        @keyframes skeleton-shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  )
}
