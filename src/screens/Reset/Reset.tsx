import { Button, Form, Input, Typography } from 'antd'
import Head from 'next/head'
import { UserOutlined } from '@ant-design/icons'
import { useSubmission } from '@/screens/Reset/hooks/useSubmission'
import { OneAuthorizationStateRoute } from '@/utils/authorization'
import { UnauthorizedLayout } from '@/shared/components/UnauthorizedLayout'
import styles from '@/screens/Reset/Reset.module.scss'

export const Reset = () => {
  const { handleSubmit } = useSubmission()

  return (
    <>
      <Head>
        <title>Сброс пароля</title>
      </Head>
      <OneAuthorizationStateRoute authorized={false}>
        <Typography.Title className={styles.title}>
          Сброс пароля
        </Typography.Title>
        <Form onFinish={handleSubmit}>
          <Form.Item name='email'>
            <Input
              placeholder='Почта'
              size='large'
              style={{ color: `#00000073` }}
              suffix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Button block htmlType='submit' size='large' type='primary'>
              Сбросить пароль
            </Button>
          </Form.Item>
        </Form>
      </OneAuthorizationStateRoute>
    </>
  )
}

Reset.layout = UnauthorizedLayout
