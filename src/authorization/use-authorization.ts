import { useEffect, useState } from 'react'
import { api, updateTokens, clearTokens } from '@/api'

export const useAuthorization = () => {
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authorized && localStorage.getItem(`refresh`)) {
      api
        .post(`/auth/jwt/refresh/`, {
          refresh: localStorage.getItem(`refresh`),
        })
        .then(({ data }) => {
          updateTokens(data)
          setAuthorized(true)
        })
        .catch((error) => {
          console.error(error)
          clearTokens()
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [authorized])

  return { authorized, loading, setAuthorized }
}
