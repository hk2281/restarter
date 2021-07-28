import { Typography } from 'antd'
import Link from 'next/link'
import { PATH } from '@/config'

export const Rules = () => {
  return (
    <>
      <Typography.Title>Правила сбора</Typography.Title>
      <Typography.Paragraph>
        <Link passHref href={PATH.HOME}>
          <Typography.Link>Главная</Typography.Link>
        </Link>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Link passHref href={PATH.ABOUT}>
          <Typography.Link>О нас</Typography.Link>
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
