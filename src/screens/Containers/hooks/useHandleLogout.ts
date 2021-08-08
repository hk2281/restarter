import { useCallback, useContext } from 'react'
import { clearTokens } from '@/api'
import { AuthContext } from '@/utils/authorization'

export const useHandleLogout = () => {
  const { setAuthorized } = useContext(AuthContext)

  const handleLogout = useCallback(async () => {
    clearTokens()
    setAuthorized(false)
  }, [setAuthorized])

  return { handleLogout }
}
