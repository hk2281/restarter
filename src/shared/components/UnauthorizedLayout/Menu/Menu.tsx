import { Drawer } from 'antd'
import styles from '@/shared/components/UnauthorizedLayout/UnauthorizedLayout.module.scss'
import { TabsList } from '@/shared/components/UnauthorizedLayout/TabsList/TabsList'

interface Props {
  visible: boolean
  handleClose: () => void
}

export const Menu = ({ visible, handleClose }: Props) => {
  return (
    <Drawer
      className={styles.drawer}
      placement='left'
      title='RecycleStarter'
      visible={visible}
      width='100%'
      onClose={handleClose}
    >
      <div className={styles.tabs}>
        <TabsList onClick={handleClose} />
      </div>
    </Drawer>
  )
}
