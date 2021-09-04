import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { api } from '@/api'
import { PATH } from '@/config'

export const useHandleSubmit = () => {
  const router = useRouter()

  const handleAddContainer = useCallback(
    async (values: unknown) => {
      await api.post(`/containers/public-add`, values)
      await router.push(PATH.ADD_CONTAINER_SUCCESS)
    },
    [router],
  )

  return { handleAddContainer }
}
