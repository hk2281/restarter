import { Dispatch, useMemo } from 'react'
import useSWR from 'swr'
import { Container } from '@/screens/Containers/types/container'
import { api } from '@/api'
import { Sort } from '@/screens/Containers/hooks/useTableSort'

export interface FiltersType {
  building?: number
  setBuilding: Dispatch<number | undefined>
  isFull?: boolean
  setIsFull: Dispatch<boolean | undefined>
}

interface Params {
  filters: FiltersType
  sort: Sort
}

export const useTableData = ({ filters, sort }: Params) => {
  const swrResponse = useSWR<Container[]>(
    [
      `/containers`,
      filters.building,
      filters.isFull,
      sort.sort_by,
      sort.order_by,
    ],
    async (url, building, is_full, sort_by, order_by) =>
      (
        await api.get(url, {
          params: { building, is_full, sort_by, order_by },
        })
      ).data,
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
