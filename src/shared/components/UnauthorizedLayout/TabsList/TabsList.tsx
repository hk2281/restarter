import Link from 'next/link'
import { Typography } from 'antd'
import { useMemo } from 'react'
import styles from '@/shared/components/UnauthorizedLayout/TabsList/TabsList.module.scss'
import { useSelectedTab } from '@/shared/components/UnauthorizedLayout/TabsList/hooks/use-selected-tab'
import { useTabs } from '@/shared/components/UnauthorizedLayout/TabsList/hooks/use-tabs'

interface Props {
  onClick?: () => void
}

export const TabsList = (props: Props) => {
  const { onClick } = props
  const { tab } = useSelectedTab()
  const { tabs } = useTabs()

  return useMemo(
    () => (
      <>
        {tabs.map(({ path, title }) => (
          <Link key={path} passHref href={path}>
            <a>
              <Typography.Title
                className={styles.text}
                level={2}
                type={path === tab ? `success` : undefined}
                onClick={onClick}
              >
                {title}
              </Typography.Title>
            </a>
          </Link>
        ))}
        <Link passHref href='mailto:itmo.green@mail.ru'>
          <a>
            <Typography.Title
              className={styles.text}
              level={2}
              onClick={onClick}
            >
              Помощь
            </Typography.Title>
          </a>
        </Link>
      </>
    ),
    [onClick, tab, tabs],
  )
}
