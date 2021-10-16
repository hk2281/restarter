import axios from 'axios'
import { message } from 'antd'
import { PATH } from '@/config'

export interface Tokens {
  access: string
  refresh: string
}

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URL })

const updateTokens = (tokens: Tokens) => {
  localStorage.setItem(`refresh`, tokens.refresh)
  api.defaults.headers.Authorization = `Bearer ${tokens.access}`
}

const clearTokens = () => {
  localStorage.removeItem(`refresh`)
  delete api.defaults.headers.Authorization
}

const createResponseInterceptor = () => {
  const interceptor = api.interceptors.response.use(
    undefined,
    async (error) => {
      console.log(error.response)
      if (
        error.response.status !== 401 ||
        error.response.config.url.includes(`/auth/jwt/create`)
      ) {
        message.error(
          JSON.stringify(error.response?.data)
            .replace(/["}{\[]/g, ``)
            .replace(/:/g, `: `)
            .replace(/]/g, ` `) || error.message,
        )
        return Promise.reject(error)
      }
      api.interceptors.response.eject(interceptor)

      try {
        const { data } = await api.post(`/auth/jwt/refresh/`, {
          refresh: localStorage.getItem(`refresh`),
        })
        updateTokens(data)
        error.response.config.headers[`Authorization`] = `Bearer ${data.access}`
        return await api(error.response.config)
      } catch (error) {
        clearTokens()
        window.location.replace(PATH.HOME)
        await Promise.reject(error)
      } finally {
        createResponseInterceptor()
      }
    },
  )
}

createResponseInterceptor()

export { api, updateTokens, clearTokens }
