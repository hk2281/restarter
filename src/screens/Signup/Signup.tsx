import { Button, Form, Input, Typography } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import Head from 'next/head'
import { OneAuthorizationStateRoute } from '@/utils/authorization'
import { UnauthorizedLayout } from '@/shared/components/UnauthorizedLayout'
import { useHandleSignup } from '@/screens/Signup/hooks/useHandleSignup'

export const Signup = () => {
  const { handleSignup } = useHandleSignup()

  return (
    <>
      <Head>
        <title>Регистрация</title>
      </Head>
      <OneAuthorizationStateRoute authorized={false}>
        <Typography.Title>Регистрация</Typography.Title>
        <Form onFinish={handleSignup}>
          <Form.Item name='email'>
            <Input
              placeholder='mail@support.ru'
              prefix={<MailOutlined />}
              size='large'
            />
          </Form.Item>
          <Form.Item name='password'>
            <Input.Password placeholder='Пароль' size='large' />
          </Form.Item>
          <Form.Item
            hasFeedback
            dependencies={[`password`]}
            name='confirm'
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
            <Input.Password placeholder='Подтвердите пароль' size='large' />
          </Form.Item>
          <Form.Item>
            <Button block htmlType='submit' size='large' type='primary'>
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </OneAuthorizationStateRoute>
    </>
  )
}

Signup.layout = UnauthorizedLayout
