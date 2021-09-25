import { Button, Form, Input, Typography } from 'antd'
import Head from 'next/head'
import { useSubmission } from '@/screens/NewPassword/hooks/useSubmission'
import { OneAuthorizationStateRoute } from '@/utils/authorization'
import { UnauthorizedLayout } from '@/shared/components/UnauthorizedLayout'
import styles from '@/screens/NewPassword/NewPassword.module.scss'

export const NewPassword = () => {
  const { handleSubmit } = useSubmission()

  return (
    <>
      <Head>
        <title>Введите новый пароль</title>
      </Head>
      <OneAuthorizationStateRoute authorized={false}>
        <Typography.Title className={styles.title}>
          Введите новый пароль
        </Typography.Title>
        <Form onFinish={handleSubmit}>
          <Form.Item hasFeedback name='new_password'>
            <Input.Password placeholder='Новый пароль' size='large' />
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

NewPassword.layout = UnauthorizedLayout
