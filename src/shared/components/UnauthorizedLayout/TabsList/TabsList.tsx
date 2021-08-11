import Link from 'next/link'
import { Typography } from 'antd'
import { useRouter } from 'next/router'
import { tabs } from '@/shared/components/UnauthorizedLayout/TabsList/tabs'
import styles from '@/shared/components/UnauthorizedLayout/TabsList/TabsList.module.scss'

interface Props {
  onClick: () => void
}

export const TabsList = (props: Props) => {
  const { onClick } = props

  const router = useRouter()

  return (
    <>
      {tabs.map(({ path, title }) => (
        <Link key={path} passHref href={path}>
          <a>
            <Typography.Title
              className={styles.text}
              level={2}
              type={router.pathname === path ? `success` : undefined}
              onClick={onClick}
            >
              {title}
            </Typography.Title>
          </a>
        </Link>
      ))}
    </>
  )
}
