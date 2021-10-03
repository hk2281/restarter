import { Button, Form, Input } from 'antd'
import styles from '@/screens/Settings/Password/Password.module.scss'
import { useHandleUpdatePassword } from '@/screens/Settings/Password/Password.hooks'

export const Password = () => {
  const [form] = Form.useForm()
  const { handleUpdatePassword } = useHandleUpdatePassword({ form })

  return (
    <Form
      className={styles.form}
      form={form}
      layout='vertical'
      onFinish={handleUpdatePassword}
    >
      <Form.Item label='Текущий пароль' name='current_password'>
        <Input.Password size='large' />
      </Form.Item>
      <Form.Item hasFeedback label='Новый пароль' name='new_password'>
        <Input.Password size='large' />
      </Form.Item>
      <Button block size='large' type='primary' onClick={form.submit}>
        Сменить пароль
      </Button>
    </Form>
  )
}
