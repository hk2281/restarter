import { Typography } from 'antd'
import Head from 'next/head'
import { UnauthorizedLayout } from '@/shared/UnauthorizedLayout'

export const About = () => {
  return (
    <>
      <Head>
        <title>О нас</title>
      </Head>
      <Typography.Title>О нас</Typography.Title>
    </>
  )
}

About.layout = UnauthorizedLayout
