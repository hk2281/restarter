import 'antd/dist/antd.css'
import 'src/styles/globals.scss'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <SwitchTransition mode='out-in'>
      <CSSTransition key={router.pathname} classNames='page' timeout={300}>
        <div className='wrapper'>
          <Component {...pageProps} />
        </div>
      </CSSTransition>
    </SwitchTransition>
  )
}

export default MyApp
