import Head from 'next/head'
import { Login } from '@/screens/Login'

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login page</title>
      </Head>
      <Login />
    </>
  )
}

export default LoginPage
