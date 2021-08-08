import Head from 'next/head'
import { Containers } from '@/screens/Containers'
import { OneAuthorizationStateRoute } from '@/authorization'

const ContainersPage = () => {
  return (
    <>
      <Head>
        <title>Containers page</title>
      </Head>
      <OneAuthorizationStateRoute authorized={true}>
        <Containers />
      </OneAuthorizationStateRoute>
    </>
  )
}

export default ContainersPage
