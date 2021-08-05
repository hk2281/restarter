import 'antd/dist/antd.css'
import 'src/styles/globals.scss'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { AuthContext, useAuthorization } from '@/authorization'

function MyApp({ Component, pageProps }: AppProps) {
  const authorization = useAuthorization()
  const router = useRouter()

  return (
    <AuthContext.Provider value={{ ...authorization }}>
      <SwitchTransition mode='out-in'>
        <CSSTransition key={router.pathname} classNames='page' timeout={300}>
          <div className='wrapper'>
            <Component {...pageProps} />
          </div>
        </CSSTransition>
      </SwitchTransition>
    </AuthContext.Provider>
  )
}

export default MyApp
