import Head from 'next/head'
import { Button, Form, Input, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { UnauthorizedLayout } from '@/shared/components/UnauthorizedLayout'
import styles from '@/screens/Help/Help.module.scss'
import { api } from '@/api'
import { PATH } from '@/config'

export const Help = () => {
  const router = useRouter()

  const handleSubmit = useCallback(
    async (values: unknown) => {
      try {
        await api.post(`/public-feedback`, values)
        await router.push({
          pathname: PATH.RESULT,
          query: {
            title: `Ваше обращение принято`,
            status: `success`,
          },
        })
      } catch (error) {
        console.error(error)
      }
    },
    [router],
  )

  return (
    <>
      <Head>
        <title>Помощь</title>
      </Head>
      <Typography.Title className={styles.title}>Помощь</Typography.Title>
      <Form onFinish={handleSubmit}>
        <Form.Item>
          <Typography.Text>
            Если у вас есть вопросы, предложения — пишите нам!
          </Typography.Text>
        </Form.Item>
        <Form.Item name='email'>
          <Input
            placeholder='Имя и/или почта?'
            prefix={<UserOutlined />}
            size='large'
            style={{ color: `#00000073` }}
          />
        </Form.Item>
        <Form.Item name='container_id'>
          <Input placeholder='ID Контейнера' size='large' />
        </Form.Item>
        <Form.Item name='msg'>
          <Input.TextArea placeholder='Напишите ваше сообщение' size='large' />
        </Form.Item>
        <Form.Item>
          <Button block htmlType='submit' size='large' type='primary'>
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

Help.layout = UnauthorizedLayout
