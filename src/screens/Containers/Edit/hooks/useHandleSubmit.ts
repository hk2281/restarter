import { useCallback } from 'react'
import { mutate } from 'swr'
import { api } from '@/api'

interface Params {
  id?: number
  onClose: () => void
}

export const useHandleSubmit = ({ id, onClose }: Params) => {
  const handleSubmit = useCallback(
    async ({ is_full, ...values }: Record<string & 'is_full', unknown>) => {
      if (!id) {
        return
      }
      await Promise.allSettled([
        is_full
          ? await api.post(`/full-container-reports`, { container: id })
          : await api.post(`/containers/${id}/empty`),
        await api.patch(`/containers/${id}`, values),
      ])
      await mutate(`/containers`)
      onClose()
    },
    [id, onClose],
  )

  return { handleSubmit }
}
