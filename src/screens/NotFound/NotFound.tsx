import { Result, Button } from 'antd'
import Link from 'next/link'
import { PATH } from '@/config'

export const NotFound = () => {
  return (
    <>
      <Result
        extra={
          <Link passHref href={PATH.HOME}>
            <Button type='primary'>На главную</Button>
          </Link>
        }
        status='404'
        subTitle='Увы, такой страницы не существует'
        title='404'
      />
    </>
  )
}

NotFound.title = `Страница не найдена`
