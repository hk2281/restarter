import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { api } from '@/api'
import { PATH } from '@/config'

export const useSubmission = () => {
  const router = useRouter()
  const handleSubmit = useCallback(
    async (values) => {
      await api.post(`/auth/users/reset_password/`, values)
      await router.push({
        pathname: PATH.RESULT,
        query: {
          title: `Проверьте вашу почту`,
          text: `Внутри письма будет ссылка. Переходите по ней и назначьте новый незабываемый пароль.`,
          status: `success`,
        },
      })
    },
    [router],
  )

  return { handleSubmit }
}
