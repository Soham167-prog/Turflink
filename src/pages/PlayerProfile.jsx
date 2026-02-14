import { useParams, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import FollowButton from '../components/FollowButton'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'
import {
  profiles,
  upcomingGames,
  pastGames,
  currentUserId,
} from '../data/mockData'

function PlayerProfile() {
  const { id } = useParams()
  const profile = profiles.find((p) => p.id === id) || profiles[0]
  const isMe = profile.id === currentUserId

  const userUpcoming = upcomingGames.filter((g) => g.userId === profile.id)
  const userPast = pastGames.filter((g) => g.userId === profile.id)

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 animate-page-enter">
      <Link
        to="/player"
        className="text-primary hover:underline font-medium mb-6 inline-block transition-colors"
      >
        ← Back to Dashboard
      </Link>

      <div className="bg-card rounded-2xl border border-blue-100 shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="h-24 bg-primary/10" />
        <div className="px-6 pb-6 -mt-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 rounded-full bg-card border-4 border-card shadow-sm flex items-center justify-center text-2xl font-semibold text-primary">
                {profile.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-xl font-semibold text-text-primary">{profile.name}</h1>
                <p className="text-sm text-text-secondary leading-relaxed">TurfLink Player</p>
              </div>
            </div>
            {!isMe && <FollowButton userId={profile.id} size="md" />}
          </div>

          <div className="flex flex-wrap gap-8 mt-6 pt-6 border-t border-blue-100">
            <div>
              <p className="text-xl font-semibold text-primary">{profile.followers}</p>
              <p className="text-sm text-text-secondary">Followers</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-primary">{profile.following}</p>
              <p className="text-sm text-text-secondary">Following</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-primary">{profile.upcomingGames}</p>
              <p className="text-sm text-text-secondary">Upcoming</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-primary">{profile.pastGames}</p>
              <p className="text-sm text-text-secondary">Past Games</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-card rounded-2xl border border-blue-100 shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Upcoming Games</h2>
          {userUpcoming.length === 0 ? (
            <EmptyState
              icon="default"
              title="No upcoming games"
              description="Games you've booked will appear here"
            />
          ) : (
            <div className="space-y-3">
              {userUpcoming.map((g) => (
                <div
                  key={g.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-surface border border-blue-100 shadow-md transition-all duration-200"
                >
                  <div>
                    <p className="font-medium text-text-primary">{g.turfName}</p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {g.date} · {g.time} · {g.sport}
                    </p>
                  </div>
                  {g.turfId && (
                    <Link to={`/turf/${g.turfId}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-card rounded-2xl border border-blue-100 shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Past Games</h2>
          {userPast.length === 0 ? (
            <EmptyState
              icon="default"
              title="No past games"
              description="Your completed games will appear here"
            />
          ) : (
            <div className="space-y-3">
              {userPast.map((g) => (
                <div
                  key={g.id}
                  className="p-3 rounded-xl bg-surface border border-blue-100 shadow-md"
                >
                  <p className="font-medium text-text-primary">{g.turfName}</p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {g.date} · {g.time} · {g.sport}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlayerProfile
