import { Dispatch, useCallback } from 'react'
import { mutate } from 'swr'
import { api } from '@/api'

export const useHandleAddExporting = (setVisible: Dispatch<boolean>) => {
  const handleAddExporting = useCallback(
    async (values) => {
      await api.post(`/tank-takeout-requests`, values)
      setVisible(false)
      await mutate(`/tank-takeout-requests`)
    },
    [setVisible],
  )

  return { handleAddExporting }
}
