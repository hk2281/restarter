import Head from 'next/head'
import { Containers } from '@/screens/Containers'
import { useShowPageConditionally } from '@/authorization'

const ContainersPage = () => {
  const { shouldShow } = useShowPageConditionally({ authorized: true })
  return (
    <>
      <Head>
        <title>Containers page</title>
      </Head>
      {shouldShow && <Containers />}
    </>
  )
}

export default ContainersPage
