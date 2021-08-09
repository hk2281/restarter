import 'antd/dist/antd.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { AxiosRequestConfig } from 'axios'
import { ComponentType, ReactNode, useMemo } from 'react'
import { AuthContext, useAuthorization } from '@/utils/authorization'
import { api } from '@/api'

function MyApp({ Component, pageProps }: AppProps) {
  const authorization = useAuthorization()
  const Layout = useMemo(
    () =>
      (Component as ComponentType & { layout: ComponentType }).layout ||
      (({ children }: { children: ReactNode }) => <>{children}</>),
    [Component],
  )

  return (
    <SWRConfig
      value={{
        fetcher: (url: string, config?: AxiosRequestConfig) =>
          api.get(url, config).then((response) => response.data),
      }}
    >
      <AuthContext.Provider value={{ ...authorization }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContext.Provider>
    </SWRConfig>
  )
}

export default MyApp
