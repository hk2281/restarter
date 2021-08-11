import { Button, Typography } from 'antd'
import Link from 'next/link'
import Head from 'next/head'
import { UnauthorizedLayout } from '@/shared/components/UnauthorizedLayout'
import { PATH } from '@/config'

export const Home = () => {
  return (
    <>
      <Head>
        <title>Recycling Starter</title>
      </Head>
      <Typography.Title>Главная</Typography.Title>
      <Link passHref href={PATH.FILL}>
        <Button block size='large'>
          Ввести ID контейнера
        </Button>
      </Link>
    </>
  )
}

Home.layout = UnauthorizedLayout
