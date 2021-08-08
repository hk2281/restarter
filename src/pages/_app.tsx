import 'antd/dist/antd.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { AxiosRequestConfig } from 'axios'
import { AuthContext, useAuthorization } from '@/utils/authorization'
import { api } from '@/api'

function MyApp({ Component, pageProps }: AppProps) {
  const authorization = useAuthorization()

  return (
    <SWRConfig
      value={{
        fetcher: (url: string, config?: AxiosRequestConfig) =>
          api.get(url, config).then((response) => response.data),
      }}
    >
      <AuthContext.Provider value={{ ...authorization }}>
        <Component {...pageProps} />
      </AuthContext.Provider>
    </SWRConfig>
  )
}

export default MyApp
