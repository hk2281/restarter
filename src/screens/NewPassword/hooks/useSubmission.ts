import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { api } from '@/api'
import { PATH } from '@/config'

export const useSubmission = () => {
  const router = useRouter()
  const handleSubmit = useCallback(
    async (values: Record<string, unknown>) => {
      await api.post(`/auth/users/reset_password_confirm/`, {
        ...values,
        ...router.query,
      })
      await router.push({
        pathname: PATH.RESULT,
        query: {
          title: `Ура! Вы сменили пароль`,
          text: `Теперь при входе вводите именно его. Если забудете еще раз, возвращайтесь.`,
          status: `success`,
        },
      })
    },
    [router],
  )

  return { handleSubmit }
}
