import Head from 'next/head'
import Home from '@/views/Home/Home'

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
