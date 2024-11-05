import { Button, Form, Input } from 'antd'
import styles from '@/screens/Settings/Password/Password.module.scss'
import { useHandleUpdatePassword } from '@/screens/Settings/Password/Password.hooks'
import {useWindowSize} from '../hooks/useWindowSize'
export const Password = () => {
  const [form] = Form.useForm()
  const { handleUpdatePassword } = useHandleUpdatePassword({ form })
  const { width } = useWindowSize();

  const layout = (width !== undefined && width < 768) ? 'horizontal' : 'vertical';
  
  return (
    <Form
      className={styles.form}
      form={form}
      layout={layout}
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
