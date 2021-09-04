import { Button, Form, Input, Typography } from 'antd'
import Head from 'next/head'
import { UserOutlined } from '@ant-design/icons'
import { useSubmission } from '@/screens/Login/hooks/useSubmission'
import { OneAuthorizationStateRoute } from '@/utils/authorization'
import { UnauthorizedLayout } from '@/shared/components/UnauthorizedLayout'
import styles from '@/screens/Login/Login.module.scss'

export const Login = () => {
  const { handleSubmit } = useSubmission()

  return (
    <>
      <Head>
        <title>Вход</title>
      </Head>
      <OneAuthorizationStateRoute authorized={false}>
        <Typography.Title className={styles.title}>Вход</Typography.Title>
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
    </>
  )
}

Login.layout = UnauthorizedLayout
