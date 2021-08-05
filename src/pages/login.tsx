import Head from 'next/head'
import { Login } from '@/screens/Login'
import { useShowPageConditionally } from '@/authorization'

const LoginPage = () => {
  const { shouldShow } = useShowPageConditionally({ authorized: false })
  return (
    <>
      <Head>
        <title>Login page</title>
      </Head>
      {shouldShow && <Login />}
    </>
  )
}

export default LoginPage
