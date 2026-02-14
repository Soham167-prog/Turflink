import { createContext, useContext, useState } from 'react'
import { initialActivityFeed, initialFollowing } from '../data/mockData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [followingIds, setFollowingIds] = useState(initialFollowing)
  const [activityFeed, setActivityFeed] = useState(initialActivityFeed)
  const [postGameModal, setPostGameModal] = useState({ open: false, game: null })

  const follow = (userId) => setFollowingIds((prev) => [...prev, userId])
  const unfollow = (userId) => setFollowingIds((prev) => prev.filter((id) => id !== userId))
  const isFollowing = (userId) => followingIds.includes(userId)

  const addActivity = (item) =>
    setActivityFeed((prev) => [{ ...item, id: `new-${Date.now()}` }, ...prev])

  const openPostGameModal = (game) => setPostGameModal({ open: true, game })
  const closePostGameModal = () => setPostGameModal({ open: false, game: null })

  return (
    <AppContext.Provider
      value={{
        followingIds,
        follow,
        unfollow,
        isFollowing,
        activityFeed,
        addActivity,
        postGameModal,
        openPostGameModal,
        closePostGameModal,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
