import { Menu } from 'antd'
import Link from 'next/link'
import styles from '@/shared/components/AuthorizedLayout/Navigation/Navigation.module.scss'
import { tabs } from '@/shared/components/AuthorizedLayout/Navigation/tabs'
import { useMenu } from '@/shared/components/AuthorizedLayout/Navigation/hooks/use-menu'
import { CustomDivider } from '@/shared/components/AuthorizedLayout/Navigation/CustomDivider/CustomDivider'

export const Navigation = () => {
  const { handleSelect, selectedKey } = useMenu()

  return (
    <Menu
      className={styles.menu}
      mode='inline'
      selectedKeys={selectedKey ? [selectedKey] : []}
      style={{ width: 196 }}
      onSelect={handleSelect}
    >
      {tabs.map((tab) => (
        <Menu.Item key={tab.path} className={styles.menuItem}>
          <Link href={tab.path}>
            <a className={styles.link}>{tab.title}</a>
          </Link>
        </Menu.Item>
      ))}
      <CustomDivider />
      <Menu.Item key='logout' danger className={styles.menuItemDanger}>
        <a className={styles.link}>Выход</a>
      </Menu.Item>
    </Menu>
  )
}
