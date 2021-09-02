import { Button, Form, Input } from 'antd'
import styles from '@/screens/Settings/Password/Password.module.scss'

export const Password = () => {
  return (
    <Form className={styles.form} layout='vertical'>
      <Form.Item label='Пароль' name='password'>
        <Input.Password size='large' />
      </Form.Item>
      <Form.Item
        hasFeedback
        dependencies={[`password`]}
        label='Подтвердите пароль'
        name='current_password'
        rules={[
          {
            required: true,
            message: `Подтвердите пароль`,
          },
          ({ getFieldValue }) => ({
            validator: (_, value) =>
              !value || getFieldValue(`password`) === value
                ? Promise.resolve()
                : Promise.reject(new Error(`Пароли не совпадают`)),
          }),
        ]}
      >
        <Input.Password size='large' />
      </Form.Item>
      <Button block size='large' type='primary'>
        Сменить пароль
      </Button>
    </Form>
  )
}
