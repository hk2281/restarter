import Head from 'next/head'
import { Button, Result, Typography } from 'antd'
import Link from 'next/link'
import { PATH } from '@/config'
import { UnauthorizedLayout } from '@/shared/components/UnauthorizedLayout'

export const AddContainerSuccess = () => {
  return (
    <>
      <Head>
        <title>Вы молодец!</title>
      </Head>
      <Typography.Title level={2}>Поздравляем!</Typography.Title>
      <Result
        extra={[
          <Link key='homeLink' passHref href={PATH.HOME}>
            <Button size='large' type='primary'>
              Окей
            </Button>
          </Link>,
        ]}
        status='success'
        subTitle='В день сбора мы заберём макулатуру прямо из этого контейнера.'
        title='Вы молодец!'
      />
    </>
  )
}

AddContainerSuccess.layout = UnauthorizedLayout
