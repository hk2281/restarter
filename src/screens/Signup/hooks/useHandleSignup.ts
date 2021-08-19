import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { api } from '@/api'
import { PATH } from '@/config'

export const useHandleSignup = () => {
  const router = useRouter()

  const handleSignup = useCallback(
    async (values: unknown) => {
      await api.post(`/auth/users/`, values)
      await router.push(PATH.SIGNUP_SUCCESS)
    },
    [router],
  )

  return { handleSignup }
}
