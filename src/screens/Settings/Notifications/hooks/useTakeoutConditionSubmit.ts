import { useCallback } from 'react'
import { api } from '@/api'

export const useTakeoutConditionSubmit = (
  mutate: () => Promise<unknown>,
  conditionId?: number,
) => {
  const handleSubmit = useCallback(
    async (values: unknown) => {
      await api.patch(`takeout-conditions/${conditionId}`, values)
      await mutate()
    },
    [conditionId, mutate],
  )

  return { handleSubmit }
}
