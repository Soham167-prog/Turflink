import { createContext, useContext, useState, useEffect } from 'react'

const ROLE_KEY = 'turflink_role'

const RoleContext = createContext(null)

export function RoleProvider({ children }) {
  const [role, setRoleState] = useState(() => {
    if (typeof window === 'undefined') return null
    return window.sessionStorage.getItem(ROLE_KEY)
  })

  useEffect(() => {
    const stored = sessionStorage.getItem(ROLE_KEY)
    if (stored !== role) setRoleState(stored)
  }, [])

  const setRole = (r) => {
    if (r) sessionStorage.setItem(ROLE_KEY, r)
    else sessionStorage.removeItem(ROLE_KEY)
    setRoleState(r)
  }

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const ctx = useContext(RoleContext)
  return ctx
}
