import useSWR from 'swr'
import { useMemo } from 'react'

export const useBuildings = () => {
  const result = useSWR<Backend.Building[]>(`/buildings`)

  const buildingsOptions = useMemo(
    () =>
      result.data?.map((building) => ({
        ...building,
        label: building.address,
        value: building.id,
      })),
    [result.data],
  )

  return { buildings: buildingsOptions, ...result }
}
