import { Button, Form, Input, Typography } from 'antd'
import Link from 'next/link'
import { UserOutlined } from '@ant-design/icons'
import { PATH } from '@/config'
import { useSubmission } from '@/screens/Login/hooks/useSubmission'

export const Login = () => {
  const { handleSubmit } = useSubmission()

  return (
    <>
      <Typography.Title>Вход</Typography.Title>
      <Form onFinish={handleSubmit}>
        <Form.Item name='email'>
          <Input style={{ color: `#00000073` }} suffix={<UserOutlined />} />
        </Form.Item>
        <Form.Item name='password'>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit'>Вход</Button>
        </Form.Item>
        <Form.Item>
          <Link passHref href={PATH.SIGNUP}>
            <Button htmlType='submit'>Регистрация</Button>
          </Link>
        </Form.Item>
      </Form>
    </>
  )
}
