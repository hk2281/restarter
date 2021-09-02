import { Divider } from 'antd'
import { BellOutlined, UserOutlined } from '@ant-design/icons'
import useSWR from 'swr'
import { authorizedLayoutRenderer } from '@/shared/components/AuthorizedLayout'
import { Password } from '@/screens/Settings/Password/Password'
import { Profile } from '@/screens/Settings/Profile/Profile'
import { Notifications } from '@/screens/Settings/Notifications/Notifications'

export const Settings = () => {
  const { data: user } = useSWR<Backend.Me>(`/auth/users/me/`)

  return (
    <>
      <Divider orientation='left'>
        <UserOutlined /> Профиль
      </Divider>
      <Profile user={user} />
      <Password />
      <Divider orientation='left'>
        <BellOutlined /> Настройка уведомлений
      </Divider>
      <Notifications />
    </>
  )
}

Settings.layout = authorizedLayoutRenderer()
