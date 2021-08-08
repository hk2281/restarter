import Head from 'next/head'
import { Signup } from '@/screens/Signup'
import { OneAuthorizationStateRoute } from '@/utils/authorization'

const SignupPage = () => {
  return (
    <>
      <Head>
        <title>Signup page</title>
      </Head>
      <OneAuthorizationStateRoute authorized={false}>
        <Signup />
      </OneAuthorizationStateRoute>
    </>
  )
}

export default SignupPage
