import { useCallback } from 'react'
import { mutate } from 'swr'
import { api } from '@/api'

interface Params {
  id?: number
  onClose: () => void
  mutateTableData: () => Promise<Backend.Container[] | undefined>
}

export const useHandleSubmit = ({ id, onClose, mutateTableData }: Params) => {
  const handleSubmit = useCallback(
    async ({ is_full, ...values }: Record<string & 'is_full', unknown>) => {
      if (!id) {
        return
      }
      await Promise.all([
        is_full
          ? await api.post(`/full-container-reports`, { container: id })
          : await api.post(`/containers/${id}/empty`),
        await api.patch(`/containers/${id}`, values),
      ])
      await Promise.all([
        await mutateTableData(),
        await mutate(`/containers/${id}`),
      ])
      onClose()
    },
    [id, mutateTableData, onClose],
  )

  return { handleSubmit }
}
