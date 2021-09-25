import { Result as AntResult, Button } from 'antd'
import Head from 'next/head'
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import { ResultStatusType } from 'antd/lib/result'
import { PATH } from '@/config'

export const Result = () => {
  const { query } = useRouter() as NextRouter & {
    query: Record<'status' | 'title' | 'text', ResultStatusType | undefined>
  }

  return (
    <>
      <Head>
        <title>Страница не найдена</title>
      </Head>
      <AntResult
        extra={
          <Link passHref href={PATH.HOME}>
            <Button size='large'>На главную</Button>
          </Link>
        }
        status={query.status}
        subTitle={query.text}
        title={query.title}
      />
    </>
  )
}
