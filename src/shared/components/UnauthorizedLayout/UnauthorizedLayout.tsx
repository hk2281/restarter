import { ReactNode, useCallback, useMemo, useState } from 'react'
import { Drawer, PageHeader, Typography } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import styles from './UnauthorizedLayout.module.scss'
import { TabsList } from '@/shared/components/UnauthorizedLayout/TabsList/TabsList'

interface Props {
  children: ReactNode
}

export const UnauthorizedLayout = (props: Props) => {
  const { children } = props
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
          backIcon={<MenuOutlined />}
          className={styles.header}
          title='RecyclingStarter'
          onBack={handleOpen}
        />
        <Drawer
          className={styles.drawer}
          placement='left'
          title='Recycling Starter'
          visible={visible}
          width='100%'
          onClose={handleClose}
        >
          <div className={styles.tabs}>
            <TabsList onClick={handleClose} />
          </div>
          <Typography.Text>Помощь / Вопросы</Typography.Text>
          <Typography.Link>mail@support.ru</Typography.Link>
        </Drawer>
        <div className={styles.content}>{children}</div>
      </>
    ),
    [children, handleClose, handleOpen, visible],
  )
}
