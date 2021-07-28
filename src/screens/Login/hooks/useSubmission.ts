import { useCallback } from 'react'
import { message } from 'antd'
import { useAxios } from '@/api'

export const useSubmission = () => {
  const { axios, updateTokens } = useAxios()

  const handleSubmit = useCallback(
    async (values) => {
      try {
        const { data } = await axios.post(`/auth/jwt/create/`, values)
        updateTokens(data)
      } catch (error) {
        message.error(error.response?.data?.detail || error.message)
      }
    },
    [axios, updateTokens],
  )

  return { handleSubmit }
}
