import { useCallback } from 'react'
import { api } from '@/api'

export const useHandleAddExporting = () => {
  const handleAddExporting = useCallback(async (values) => {
    await api.post(`/tank-takeout-requests`, values)
  }, [])

  return { handleAddExporting }
}
