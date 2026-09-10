export default function CatalogLoading() {
  return (
    <div className="px-5 md:px-10 py-6">
      {/* Hero skeleton */}
      <div
        className="rounded-xl mb-8 skeleton-pulse"
        style={{ minHeight: 'clamp(180px, 30vw, 340px)', background: '#2a2a2a' }}
      />

      {/* Row skeletons */}
      {[1, 2, 3].map(row => (
        <section key={row} className="mb-8">
          <div className="skeleton-pulse rounded-md mb-3" style={{ width: 140, height: 20, background: '#2a2a2a' }} />
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="skeleton-pulse flex-shrink-0 rounded-xl"
                style={{ width: 160, height: 220, background: '#2a2a2a' }}
              />
            ))}
          </div>
        </section>
      ))}

      <style>{`
        @keyframes skeletonShimmer {
          0%   { opacity: 0.5; }
          50%  { opacity: 1; }
          100% { opacity: 0.5; }
        }
        .skeleton-pulse {
          animation: skeletonShimmer 1.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
