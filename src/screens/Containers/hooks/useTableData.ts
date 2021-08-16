import { useMemo } from 'react'
import useSWR from 'swr'
import { Container } from '@/screens/Containers/types/container'

export const useTableData = () => {
  const { data: containers } = useSWR<Container[]>(`/containers`)

  const data = useMemo(
    () => containers?.map((container) => ({ ...container, key: container.id })),
    [containers],
  )

  return { data }
}
