import { Divider, Typography } from 'antd'
import { BellOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import useSWR from 'swr'
import { authorizedLayoutRenderer } from '@/shared/components/AuthorizedLayout'
import { Password } from '@/screens/Settings/Password/Password'
import { Profile } from '@/screens/Settings/Profile/Profile'
import { Notifications } from '@/screens/Settings/Notifications/Notifications'

export const Settings = () => {
  const { data: user } = useSWR<Backend.Me>(`/auth/users/me/`)

  return (
    <>
      <Typography.Title level={2}>Настройки</Typography.Title>
      <Divider orientation='left'>
        <UserOutlined /> Смена почты
      </Divider>
      <Profile user={user} />
      <Divider orientation='left'>
        <LockOutlined /> Смена пароля
      </Divider>
      <Password />
      <Divider orientation='left'>
        <BellOutlined /> Настройка уведомлений
      </Divider>
      <Notifications />
    </>
  )
}

Settings.layout = authorizedLayoutRenderer()
