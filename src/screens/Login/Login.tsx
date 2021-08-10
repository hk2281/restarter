import { Button, Form, Input, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useSubmission } from '@/screens/Login/hooks/useSubmission'
import { OneAuthorizationStateRoute } from '@/utils/authorization'
import { UnauthorizedLayout } from '@/shared/UnauthorizedLayout'

export const Login = () => {
  const { handleSubmit } = useSubmission()

  return (
    <OneAuthorizationStateRoute authorized={false}>
      <Typography.Title>Вход</Typography.Title>
      <Form onFinish={handleSubmit}>
        <Form.Item name='email'>
          <Input
            size='large'
            style={{ color: `#00000073` }}
            suffix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item name='password'>
          <Input.Password size='large' />
        </Form.Item>
        <Form.Item>
          <Button block htmlType='submit' size='large' type='primary'>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </OneAuthorizationStateRoute>
  )
}

Login.title = `Вход`
Login.layout = UnauthorizedLayout
