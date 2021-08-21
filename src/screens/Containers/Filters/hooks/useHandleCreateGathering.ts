import { useCallback } from 'react'
import { Container } from '@/screens/Containers/types/container'
import { api } from '@/api'

interface Params {
  rowSelection: { onChange: ([], []) => void }
  selectedRows?: Container[]
}

export const useHandleCreateGathering = ({
  rowSelection,
  selectedRows,
}: Params) => {
  const handleCreateGathering = useCallback(async () => {
    const bundles: Record<number, number[]> = {}
    selectedRows?.forEach((row) => {
      if (!bundles[row.building.id]) {
        bundles[row.building.id] = []
      }
      bundles[row.building.id].push(row.id)
    })

    await Promise.all(
      Object.entries(bundles).map(
        async ([building, containers]) =>
          await api.post(`/container-takeout-requests`, {
            building,
            containers,
          }),
      ),
    )
    rowSelection.onChange([], [])
  }, [rowSelection, selectedRows])

  return { handleCreateGathering }
}
