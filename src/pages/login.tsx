import Head from 'next/head'
import { Login } from '@/screens/Login'
import { OneAuthorizationStateRoute } from '@/utils/authorization'
import { UnauthorizedLayout } from '@/shared/UnauthorizedLayout'

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login page</title>
      </Head>
      <OneAuthorizationStateRoute authorized={false}>
        <Login />
      </OneAuthorizationStateRoute>
    </>
  )
}

LoginPage.layout = UnauthorizedLayout
export default LoginPage
