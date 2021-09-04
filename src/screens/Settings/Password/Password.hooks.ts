import { useCallback } from 'react'
import { FormInstance, message } from 'antd'
import { api } from '@/api'

interface Params {
  form: FormInstance
}

export const useHandleUpdatePassword = ({ form }: Params) => {
  const handleUpdatePassword = useCallback(
    async (values: unknown) => {
      try {
        await api.post(`/auth/users/set_password/`, values)

        form.resetFields()
        message.success(`Пароль успешно изменен`)
      } catch {
        message.error(`Ошибка смены пароля`)
      }
    },
    [form],
  )

  return { handleUpdatePassword }
}
