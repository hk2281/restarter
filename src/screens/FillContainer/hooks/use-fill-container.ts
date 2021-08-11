import { useCallback } from 'react'
import { mutate } from 'swr'
import { api } from '@/api'

interface Params {
  id: number
}

export const useFillContainer = ({ id }: Params) => ({
  fillContainer: useCallback(async () => {
    await api.post(`/full-container-reports`, { container: id })
    await mutate(`/containers/${id}`)
  }, [id]),
})
