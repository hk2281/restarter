import { Result, Button } from 'antd'
import Head from 'next/head'
import Link from 'next/link'
import { PATH } from '@/config'

export const NotFound = () => {
  return (
    <>
      <Head>
        <title>Страница не найдена</title>
      </Head>
      <Result
        extra={
          <Link passHref href={PATH.HOME}>
            <Button size='large' type='primary'>
              На главную
            </Button>
          </Link>
        }
        status='404'
        subTitle='Увы, такой страницы не существует'
        title='404'
      />
    </>
  )
}
