import Head from 'next/head'
import { NotFound } from '@/screens/NotFound'

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>NotFound page</title>
      </Head>
      <NotFound />
    </>
  )
}

export default NotFoundPage
