import Head from 'next/head'
import { About } from '@/screens/About'
import { UnauthorizedLayout } from '@/shared/UnauthorizedLayout'

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About page</title>
      </Head>
      <About />
    </>
  )
}

AboutPage.layout = UnauthorizedLayout
export default AboutPage
