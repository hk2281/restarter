import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { message } from 'antd'
import { api } from '@/api'
import { PATH } from '@/config'

export const useHandleSignup = () => {
  const router = useRouter()

  const handleSignup = useCallback(
    async (values: unknown) => {
      try {
        await api.post(`/auth/users/`, values, {
          params: { token: router.query.token },
        })
        await router.push(PATH.SIGNUP_SUCCESS)
      } catch {
        message.error(`Ошибка регистрации`)
      }
    },
    [router],
  )

  return { handleSignup }
}
