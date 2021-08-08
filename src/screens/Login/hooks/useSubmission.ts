import { useCallback, useContext } from 'react'
import { message } from 'antd'
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
        message.error(error.response?.data?.detail || error.message)
      }
    },
    [setAuthorized],
  )

  return { handleSubmit }
}
