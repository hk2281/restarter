import Head from 'next/head'
import { Home } from '@/screens/Home'

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

export default HomePage
