import 'antd/dist/antd.less'
import { SWRConfig } from 'swr'
import { AxiosRequestConfig } from 'axios'
import { ComponentType, ReactNode, useMemo } from 'react'
import { AuthContext, useAuthorization } from '@/utils/authorization'
import { api } from '@/api'
import '@/fonts/Muller/stylesheet.css'

interface AppProps {
  Component: ComponentType & {
    layout?: ComponentType
    layoutRenderer?: ComponentType
  }
  pageProps: Record<string, unknown>
}

function MyApp({ Component, pageProps }: AppProps) {
  const authorization = useAuthorization()
  const Layout = useMemo(
    () =>
      Component.layout ||
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
