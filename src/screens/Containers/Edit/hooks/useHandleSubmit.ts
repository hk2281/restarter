import { useCallback } from 'react'
import { mutate } from 'swr'
import { api } from '@/api'

interface Params {
  id?: number
}

export const useHandleSubmit = ({ id }: Params) => {
  const handleSubmit = useCallback(
    async (values: unknown) => {
      if (!id) {
        return
      }
      await api.patch(`/containers/${id}`, values)
      await mutate(`/containers`)
    },
    [id],
  )

  return { handleSubmit }
}
