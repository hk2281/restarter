import axios from 'axios'
import { useCallback, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { PATH } from '@/config'
import { useAuthorization } from '@/api/use-authorization'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

export const useAxios = () => {
  const router = useRouter()
  const authorization = useAuthorization()

  const createResponseInterceptor = useCallback(() => {
    const interceptor = axios.interceptors.response.use(
      undefined,
      async (error) => {
        console.log(`asdl;,asl;da,sl;d,`)
        if (error.response.status !== 401) {
          return Promise.reject(error)
        }

        axios.interceptors.response.eject(interceptor)

        try {
          const { data } = await axios.post(`/auth/jwt/refresh/`, {
            refresh: localStorage.getItem(`refresh`),
          })
          localStorage.setItem(`refresh`, data.refresh)
          axios.defaults.headers.Authorization = `Bearer ${data.access}`
          console.log(error)
          return await axios(error.response.config)
        } catch (error) {
          localStorage.removeItem(`refresh`)
          delete axios.defaults.headers.Authorization
          await router.push(PATH.LOGIN)
          await Promise.reject(error)
        } finally {
          createResponseInterceptor()
        }
      },
    )
  }, [router])

  createResponseInterceptor()

  return { axios, ...authorization }
}
