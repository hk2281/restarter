import useSWR from 'swr'
import { useMemo } from 'react'
import { Building } from '@/screens/Signup/types/building'

export const useBuildings = () => {
  const { data: buildings } = useSWR<Building[]>(`/buildings`)

  const buildingsOptions = useMemo(
    () =>
      buildings?.map((building) => ({
        label: building.address,
        value: building.id,
      })),
    [buildings],
  )

  return { buildings: buildingsOptions }
}
