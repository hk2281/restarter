import { useCallback } from 'react'
import { FormInstance, message } from 'antd'
import { api } from '@/api'

interface Params {
  form: FormInstance
}

export const useHandleUpdateEmail = ({ form }: Params) => {
  const handleUpdateEmail = useCallback(
    async (values: unknown) => {
      try {
        await api.post(`/auth/users/set_email/`, values)

        form.resetFields()
        message.success(`Почта успешно изменена`)
      } catch {
        message.error(`Ошибка смены почты`)
      }
    },
    [form],
  )

  return { handleUpdateEmail }
}
