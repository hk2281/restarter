import { Button, Result, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { UnauthorizedLayout } from '@/shared/components/UnauthorizedLayout'
import { PATH } from '@/config'

export const FillContainerSuccess = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Контейнер {router.query.container} заполнен</title>
      </Head>
      <Typography.Paragraph>Контейнер заполнен</Typography.Paragraph>
      <Typography.Title level={4}>ID {router.query.container}</Typography.Title>
      <Result
        extra={[
          <Link key='homeLink' passHref href={PATH.HOME}>
            <Button type='primary'>Окей</Button>
          </Link>,
        ]}
        status='success'
        subTitle='В день вывоза специально обученные люди заберут макулатуру прямо из офиса.'
        title='Вы молодец!'
      />
    </>
  )
}

FillContainerSuccess.layout = UnauthorizedLayout
