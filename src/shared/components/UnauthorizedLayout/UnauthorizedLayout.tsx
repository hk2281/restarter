import { ReactNode, useCallback, useMemo, useState } from 'react'
import { PageHeader } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import styles from './UnauthorizedLayout.module.scss'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { Menu } from '@/shared/components/UnauthorizedLayout/Menu/Menu'
import { TabsList } from '@/shared/components/UnauthorizedLayout/TabsList/TabsList'

interface Props {
  children: ReactNode
  ghost?: boolean
}

export const UnauthorizedLayout = (props: Props) => {
  const { children, ghost } = props
  const { matches } = useMediaQuery(`(min-width: 1024px)`)
  const [visible, setVisible] = useState(false)

  const handleOpen = useCallback(() => {
    setVisible(true)
  }, [])

  const handleClose = useCallback(() => {
    setVisible(false)
  }, [])

  return useMemo(
    () => (
      <>
        <PageHeader
          backIcon={!matches && <MenuOutlined />}
          className={styles.header}
          extra={matches && <TabsList />}
          title='RecyclingStarter'
          onBack={handleOpen}
        />
        {!matches && <Menu handleClose={handleClose} visible={visible} />}
        {ghost ? children : <div className={styles.content}>{children}</div>}
      </>
    ),
    [children, ghost, handleClose, handleOpen, matches, visible],
  )
}
