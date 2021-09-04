import { Button, Form, Input } from 'antd'
import { useEffect } from 'react'
import styles from '@/screens/Settings/Profile/Profile.module.scss'
import { useHandleUpdateEmail } from '@/screens/Settings/Profile/Profile.hooks'

interface Props {
  user?: Backend.Me
}

export const Profile = ({ user }: Props) => {
  const [form] = Form.useForm()
  const { handleUpdateEmail } = useHandleUpdateEmail({ form })

  useEffect(() => {
    if (user) {
      form.setFieldsValue({ new_email: user.email })
    }
  }, [form, user])

  return (
    <Form
      className={styles.form}
      form={form}
      initialValues={user}
      layout='vertical'
      onFinish={handleUpdateEmail}
    >
      <Form.Item label='Почта' name='new_email'>
        <Input size='large' />
      </Form.Item>
      <Form.Item label='Пароль' name='current_password'>
        <Input.Password size='large' />
      </Form.Item>
      <Button block size='large' type='primary' onClick={form.submit}>
        Изменить данные
      </Button>
    </Form>
  )
}
