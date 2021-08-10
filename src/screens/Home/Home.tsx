import { Button, Typography } from 'antd'
import Link from 'next/link'
import { UnauthorizedLayout } from '@/shared/UnauthorizedLayout'
import { PATH } from '@/config'

export const Home = () => {
  return (
    <>
      <Typography.Title>Главная</Typography.Title>
      <Link passHref href={PATH.FILL}>
        <Button block size='large'>
          Ввести ID контейнера
        </Button>
      </Link>
    </>
  )
}

Home.title = `Recycling Starter`
Home.layout = UnauthorizedLayout
