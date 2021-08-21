import { Dispatch, useMemo } from 'react'
import useSWR from 'swr'
import { Container } from '@/screens/Containers/types/container'
import { api } from '@/api'

export interface FiltersType {
  building?: number
  setBuilding: Dispatch<number | undefined>
  isFull?: boolean
  setIsFull: Dispatch<boolean | undefined>
}

interface Params {
  filters: FiltersType
}

export const useTableData = ({ filters }: Params) => {
  const swrResponse = useSWR<Container[]>(
    [`/containers`, filters.building, filters.isFull],
    async (url, building, isFull) =>
      (await api.get(url, { params: { building: building, is_full: isFull } }))
        .data,
  )

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
