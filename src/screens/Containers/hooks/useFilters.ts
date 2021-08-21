import { useMemo, useState } from 'react'

export const useFilters = () => {
  const [building, setBuilding] = useState<number | undefined>()
  const [isFull, setIsFull] = useState<boolean | undefined>()

  return useMemo(
    () => ({ filters: { building, setBuilding, isFull, setIsFull } }),
    [building, isFull],
  )
}
