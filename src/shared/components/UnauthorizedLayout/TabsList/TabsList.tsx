import Link from 'next/link'
import { Typography } from 'antd'
import { useMemo } from 'react'
import { tabs } from '@/shared/components/UnauthorizedLayout/TabsList/tabs'
import styles from '@/shared/components/UnauthorizedLayout/TabsList/TabsList.module.scss'
import { useSelectedTab } from '@/shared/components/UnauthorizedLayout/TabsList/hooks/use-selected-tab'

interface Props {
  onClick: () => void
}

export const TabsList = (props: Props) => {
  const { onClick } = props
  const { tab } = useSelectedTab()

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
      </>
    ),
    [onClick, tab],
  )
}
