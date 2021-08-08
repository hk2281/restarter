import 'antd/dist/antd.css'
import 'src/styles/globals.scss'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { SWRConfig } from 'swr'
import { AxiosRequestConfig } from 'axios'
import { AuthContext, useAuthorization } from '@/authorization'
import { api } from '@/api'

function MyApp({ Component, pageProps }: AppProps) {
  const authorization = useAuthorization()
  const router = useRouter()

  return (
    <SWRConfig
      value={{
        fetcher: (url: string, config?: AxiosRequestConfig) =>
          api.get(url, config).then((response) => response.data),
      }}
    >
      <AuthContext.Provider value={{ ...authorization }}>
        <SwitchTransition mode='out-in'>
          <CSSTransition key={router.pathname} classNames='page' timeout={300}>
            <div className='wrapper'>
              <Component {...pageProps} />
            </div>
          </CSSTransition>
        </SwitchTransition>
      </AuthContext.Provider>
    </SWRConfig>
  )
}

export default MyApp
