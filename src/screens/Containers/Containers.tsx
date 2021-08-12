import { Card, Typography } from 'antd'
import useSWR from 'swr'
import Head from 'next/head'
import { Container } from '@/screens/Containers/types/container'
import { OneAuthorizationStateRoute } from '@/utils/authorization'
import { AuthorizedLayout } from '@/shared/components/AuthorizedLayout'

export const Containers = () => {
  const { data: containers } = useSWR<Container[]>(`/containers`)

  return (
    <>
      <Head>
        <title>Контейнеры</title>
      </Head>
      <OneAuthorizationStateRoute authorized={true}>
        {containers?.map((container) => (
          <Card key={container.id} title={container.location}>
            <Typography.Paragraph>
              {container.status} {container.kind}
            </Typography.Paragraph>
          </Card>
        ))}
      </OneAuthorizationStateRoute>
    </>
  )
}

Containers.layout = AuthorizedLayout
