import { useApp } from '../context/AppContext'
import Button from './Button'

function FollowButton({ userId, size = 'sm', showCount = false }) {
  const { isFollowing, follow, unfollow } = useApp()
  const following = isFollowing(userId)

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={following ? 'secondary' : 'primary'}
        size={size}
        onClick={() => (following ? unfollow(userId) : follow(userId))}
      >
        {following ? 'Unfollow' : 'Follow'}
      </Button>
      {showCount && (
        <span className="text-sm text-gray-500">
          {following ? 'Following' : 'Follow'}
        </span>
      )}
    </div>
  )
}

export default FollowButton
