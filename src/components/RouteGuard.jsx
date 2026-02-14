import { Navigate, useLocation } from 'react-router-dom'
import { useRole } from '../context/RoleContext'

const PLAYER_PATHS = ['/player', '/payment', '/activity', '/profile', '/turf', '/create-request']
const PROVIDER_PATHS = ['/provider']

function isPlayerPath(path) {
  return path === '/player' || path === '/payment' || path === '/activity' || path.startsWith('/profile') || path.startsWith('/turf') || path === '/create-request'
}

function isProviderPath(path) {
  return path === '/provider' || path.startsWith('/provider/')
}

export function RouteGuard({ children }) {
  const location = useLocation()
  const { role } = useRole()
  const path = location.pathname

  if (role === 'player' && isProviderPath(path)) {
    return <Navigate to="/" replace />
  }
  if (role === 'provider' && (isPlayerPath(path) || path === '/payment')) {
    return <Navigate to="/" replace />
  }
  return children
}
