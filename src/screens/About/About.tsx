import { Typography } from 'antd'
import { UnauthorizedLayout } from '@/shared/UnauthorizedLayout'

export const About = () => {
  return (
    <>
      <Typography.Title>О нас</Typography.Title>
    </>
  )
}

About.title = `О нас`
About.layout = UnauthorizedLayout
