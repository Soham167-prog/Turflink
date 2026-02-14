function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200 ${className}`}
      aria-hidden
    />
  )
}

export function TurfCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl border border-blue-100 p-6 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="flex gap-4 mb-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

export function PlayerRequestCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl border border-blue-100 p-6 flex flex-col sm:flex-row gap-4 transition-all duration-300">
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="h-10 w-24 sm:w-full" />
    </div>
  )
}

export function ActivityFeedSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-card rounded-2xl border border-blue-100 p-6 transition-all duration-300">
          <div className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Skeleton
