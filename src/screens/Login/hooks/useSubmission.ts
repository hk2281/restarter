import { useCallback, useContext } from 'react'
import { message } from 'antd'
import axios from 'axios'
import { api, updateTokens } from '@/api'
import { AuthContext } from '@/utils/authorization'

export const useSubmission = () => {
  const { setAuthorized } = useContext(AuthContext)
  const handleSubmit = useCallback(
    async (values) => {
      try {
        const { data } = await api.post(`/auth/jwt/create/`, values)
        setAuthorized(true)
        updateTokens(data)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          message.error(error.response?.data?.detail || error.message)
        } else {
          message.error(`Ошибка`)
        }
      }
    },
    [setAuthorized],
  )

  return { handleSubmit }
}
