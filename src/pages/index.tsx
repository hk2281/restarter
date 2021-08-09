import Head from 'next/head'
import { Home } from '@/screens/Home'
import { UnauthorizedLayout } from '@/shared/UnauthorizedLayout'

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>
      <Home />
    </>
  )
}

HomePage.layout = UnauthorizedLayout
export default HomePage
