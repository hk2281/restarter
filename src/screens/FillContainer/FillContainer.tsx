import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { Button, Descriptions, Form, Typography } from 'antd'
import { UnauthorizedLayout } from '@/shared/components/UnauthorizedLayout'
import { useContainer } from '@/shared/hooks'
import { useFillContainer } from '@/screens/FillContainer/hooks'
import { PATH } from '@/config'

export const FillContainer = () => {
  const router = useRouter()
  const id = useMemo(
    () => parseInt(router.query.container as string),
    [router.query.container],
  )
  const { data: container } = useContainer({ id })
  const { fillContainer } = useFillContainer({ id })

  const handleFillContainer = useCallback(async () => {
    await fillContainer()
    await router.push({
      pathname: PATH.FILL_CONTAINER_SUCCESS,
      query: { container: id },
    })
  }, [fillContainer, id, router])

  return (
    <>
      <Head>
        <title>
          {useMemo(
            () => [container?.building.address, container?.location].join(`, `),
            [container?.building.address, container?.location],
          )}
        </title>
      </Head>
      <Form>
        <Form.Item>
          <Typography.Paragraph>
            Проверьте данные вашего контейнера
          </Typography.Paragraph>
          <Typography.Title>ID {id}</Typography.Title>
          <Descriptions bordered>
            <Descriptions.Item label='Здание'>
              {container?.building.address}
            </Descriptions.Item>
            <Descriptions.Item label='Аудитория'>
              {container?.location}
            </Descriptions.Item>
          </Descriptions>
        </Form.Item>
        <Form.Item>
          <Button
            block
            size='large'
            type='primary'
            onClick={handleFillContainer}
          >
            Да, заполнен
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

FillContainer.layout = UnauthorizedLayout
