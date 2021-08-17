import { useState, useEffect } from 'react'

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)
  const [rendered, setRendered] = useState(false)
  const [calculated, setCalculated] = useState(false)

  useEffect(() => setRendered(true), [])

  useEffect(() => {
    if (!rendered) return
    const media = window.matchMedia(query)
    const listener = () => {
      setMatches(media.matches)
    }
    media.addEventListener(`change`, listener, { once: true })
    listener()
    setCalculated(true)
    return () => media.removeEventListener(`change`, listener)
  }, [query, rendered])

  return { matches, rendered: rendered && calculated }
}
