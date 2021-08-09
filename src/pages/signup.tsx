import Head from 'next/head'
import { Signup } from '@/screens/Signup'
import { OneAuthorizationStateRoute } from '@/utils/authorization'
import { UnauthorizedLayout } from '@/shared/UnauthorizedLayout'

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

SignupPage.layout = UnauthorizedLayout
export default SignupPage
