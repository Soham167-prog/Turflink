import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import ActivityItem from '../components/ActivityItem'
import EmptyState from '../components/EmptyState'
import { ActivityFeedSkeleton } from '../components/Skeleton'

function ActivityFeed() {
  const { activityFeed } = useApp()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 animate-page-enter">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-text-primary">Activity Feed</h1>
        <p className="text-sm text-text-secondary mt-1 leading-relaxed">
          See what your network is up to
        </p>
      </div>

      {loading ? (
        <ActivityFeedSkeleton />
      ) : activityFeed.length === 0 ? (
        <EmptyState
          icon="feed"
          title="No activity yet"
          description="When your connections book turfs or share feedback, it will appear here"
        />
      ) : (
        <div className="space-y-4">
          {activityFeed.map((item) => (
            <ActivityItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ActivityFeed
