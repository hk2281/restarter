import { Button, Form, Input, Typography } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { UnauthorizedLayout } from '@/shared/components/UnauthorizedLayout'
import { useContainer } from '@/shared/hooks'
import { PATH } from '@/config'

export const Fill = () => {
  const router = useRouter()
  const [id, setId] = useState<number>()
  const { container } = useContainer({ id })

  const handleFinish = useCallback(({ id }: { id: string }) => {
    setId(parseInt(id))
  }, [])

  useEffect(() => {
    if (container) {
      router
        .push({
          pathname: PATH.FILL_CONTAINER,
          query: { container: container.id },
        })
        .then()
    }
  }, [container, router])

  return (
    <>
      <Head>
        <title>Заполнить контейнер</title>
      </Head>
      <Typography.Paragraph>
        Введите идентификационный номер вашего контейнера
      </Typography.Paragraph>
      <Form onFinish={handleFinish}>
        <Form.Item name='id'>
          <Input placeholder='1234' size='large' />
        </Form.Item>
        <Form.Item>
          <Button block htmlType='submit' size='large' type='primary'>
            Ввести
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

Fill.layout = UnauthorizedLayout
