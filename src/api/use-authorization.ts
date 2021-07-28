import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

interface Tokens {
  access: string
  refresh: string
}

export const useAuthorization = () => {
  const [authorized, setAuthorized] = useState(
    !!axios.defaults.headers.Authorization,
  )
  const [loading, setLoading] = useState(true)

  const updateTokens = useCallback((tokens: Tokens) => {
    setAuthorized(true)
    axios.defaults.headers.Authorization = `Bearer ${tokens.access}`
    if (tokens.refresh) {
      localStorage.setItem(`refresh`, tokens.refresh)
    }
  }, [])

  useEffect(() => {
    if (
      !axios.defaults.headers.Authorization &&
      localStorage.getItem(`refresh`)
    ) {
      axios
        .post(`/auth/jwt/refresh/`, {
          refresh: localStorage.getItem(`refresh`),
        })
        .then(({ data }) => {
          updateTokens(data)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          localStorage.removeItem(`refresh`)
          delete axios.defaults.headers.Authorization
          setAuthorized(false)
        })
    } else {
      setLoading(false)
    }
  }, [updateTokens])

  return { updateTokens, authorized, loading }
}
