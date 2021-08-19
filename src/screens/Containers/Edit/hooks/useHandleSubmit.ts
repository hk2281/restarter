import { useCallback } from 'react'
import { mutate } from 'swr'
import { api } from '@/api'

interface Params {
  id?: number
  onClose: () => void
}

export const useHandleSubmit = ({ id, onClose }: Params) => {
  const handleSubmit = useCallback(
    async (values: unknown) => {
      if (!id) {
        return
      }
      await api.patch(`/containers/${id}`, values)
      await mutate(`/containers`)
      onClose()
    },
    [id, onClose],
  )

  return { handleSubmit }
}
