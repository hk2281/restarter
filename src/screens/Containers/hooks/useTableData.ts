import { useMemo } from 'react'
import useSWR from 'swr'
import { Container } from '@/screens/Containers/types/container'

export const useTableData = () => {
  const swrResponse = useSWR<Container[]>(`/containers`)

  const data = useMemo(
    () =>
      swrResponse.data?.map((container) => ({
        ...container,
        key: container.id,
      })),
    [swrResponse.data],
  )

  return { ...swrResponse, data }
}
