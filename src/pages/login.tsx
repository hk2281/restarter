import Head from 'next/head'
import { Login } from '@/screens/Login'
import { OneAuthorizationStateRoute } from '@/authorization'

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

export default LoginPage
