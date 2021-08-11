import { Typography } from 'antd'
import Head from 'next/head'
import { UnauthorizedLayout } from '@/shared/components/UnauthorizedLayout'

export const Rules = () => {
  return (
    <>
      <Head>
        <title>Правила сбора</title>
      </Head>
      <Typography.Title>Правила сбора</Typography.Title>
    </>
  )
}

Rules.layout = UnauthorizedLayout
