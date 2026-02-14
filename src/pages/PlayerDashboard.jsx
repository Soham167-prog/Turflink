import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TurfCard from '../components/TurfCard'
import PlayerRequestCard from '../components/PlayerRequestCard'
import SmartSuggestions from '../components/SmartSuggestions'
import EmptyState from '../components/EmptyState'
import TurfMap from '../components/TurfMap'
import { TurfCardSkeleton, PlayerRequestCardSkeleton } from '../components/Skeleton'
import Button from '../components/Button'
import { turfs, playerRequests, pastGames } from '../data/mockData'
import { useApp } from '../context/AppContext'

function PlayerDashboard() {
  const [search, setSearch] = useState('')
  const [joinedIds, setJoinedIds] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { openPostGameModal } = useApp()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  const filteredTurfs = turfs.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase()) ||
      t.sport.toLowerCase().includes(search.toLowerCase())
  )

  const filteredRequests = playerRequests.filter(
    (r) =>
      r.turfName.toLowerCase().includes(search.toLowerCase()) ||
      r.sport.toLowerCase().includes(search.toLowerCase())
  )

  const handleJoin = (request) => {
    setJoinedIds((prev) => [...prev, request.id])
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 animate-page-enter">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-xl font-semibold text-text-primary">Player Dashboard</h1>
        <Link to="/create-request">
          <Button variant="primary" size="sm">
            Create Need Players Request
          </Button>
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search turfs or requests..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md px-4 py-2.5 mb-6 border border-blue-100 rounded-2xl bg-surface text-text-primary focus:ring-2 focus:ring-primary outline-none placeholder:text-text-secondary"
      />

      <section className="mb-8 py-6 px-4 rounded-2xl bg-surface-alt/50">
        <h2 className="text-lg font-semibold text-text-primary mb-3">Locate turfs</h2>
        <p className="text-sm text-text-secondary mb-3">Your location and nearby turfs. Click a marker to view and book.</p>
        <TurfMap turfs={turfs} showUserLocation={true} height="320px" />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 space-y-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-6 py-6 px-4 rounded-2xl bg-surface-alt/50">
            <h2 className="text-lg font-semibold text-text-primary">Discover Turfs</h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <TurfCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredTurfs.length === 0 ? (
              <EmptyState
                icon="search"
                title="No turfs found"
                description="Try adjusting your search or browse all turfs"
                actionLabel="Clear search"
                onAction={() => setSearch('')}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTurfs.map((turf) => (
                  <TurfCard key={turf.id} turf={turf} />
                ))}
              </div>
            )}
          </section>

          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-text-primary">Need Players</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Join existing requests and play with others
            </p>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <PlayerRequestCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredRequests.length === 0 ? (
              <EmptyState
                icon="default"
                title="No player requests"
                description="Be the first to create a Need Players request"
                actionLabel="Create Request"
                onAction={() => navigate('/create-request')}
              />
            ) : (
              <div className="space-y-4">
                {filteredRequests.map((req) => (
                  <PlayerRequestCard
                    key={req.id}
                    request={req}
                    onJoin={handleJoin}
                    joined={joinedIds.includes(req.id)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <SmartSuggestions />
          <div className="p-6 rounded-2xl bg-card border border-blue-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <p className="text-sm text-text-secondary mb-2 leading-relaxed">Finished a game?</p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                openPostGameModal(
                  pastGames.find((g) => g.userId === 'me') || {
                    sport: 'Football',
                    turfName: 'Green Valley Sports Arena',
                  }
                )
              }
            >
              Give feedback
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerDashboard
