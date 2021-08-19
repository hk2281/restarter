import Head from 'next/head'
import { Button, Result, Typography } from 'antd'
import Link from 'next/link'
import { PATH } from '@/config'
import { UnauthorizedLayout } from '@/shared/components/UnauthorizedLayout'

export const SignupSuccess = () => {
  return (
    <>
      <Head>
        <title>Вы молодец!</title>
      </Head>
      <Typography.Title level={4}>Поздравляем!</Typography.Title>
      <Result
        extra={[
          <Link key='homeLink' passHref href={PATH.HOME}>
            <Button type='primary'>Окей</Button>
          </Link>,
        ]}
        status='success'
        subTitle='Проверьте вашу почту. Там вы найдете дальнейшую информацию по подключению. Спасибо!'
        title='Ещё чуть-чуть'
      />
    </>
  )
}

SignupSuccess.layout = UnauthorizedLayout
