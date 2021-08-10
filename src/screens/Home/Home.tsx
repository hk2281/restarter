import { Typography } from 'antd'
import { UnauthorizedLayout } from '@/shared/UnauthorizedLayout'

export const Home = () => {
  return (
    <>
      <Typography.Title>Главная</Typography.Title>
    </>
  )
}

Home.title = `Recycling Starter`
Home.layout = UnauthorizedLayout
