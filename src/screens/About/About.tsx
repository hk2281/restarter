import { Typography } from 'antd'
import Link from 'next/link'
import { PATH } from '@/config'

export const About = () => {
  return (
    <>
      <Typography.Title>О нас</Typography.Title>
      <Typography.Paragraph>
        <Link passHref href={PATH.HOME}>
          <Typography.Link>Главная</Typography.Link>
        </Link>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Link passHref href={PATH.RULES}>
          <Typography.Link>Правила</Typography.Link>
        </Link>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Link passHref href={PATH.LOGIN}>
          <Typography.Link>Вход</Typography.Link>
        </Link>
      </Typography.Paragraph>
    </>
  )
}
