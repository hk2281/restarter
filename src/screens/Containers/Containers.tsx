import { Button, Card, Typography } from 'antd'
import useSWR from 'swr'
import Head from 'next/head'
import { Container } from '@/screens/Containers/types/container'
import { useHandleLogout } from '@/screens/Containers/hooks/useHandleLogout'
import { OneAuthorizationStateRoute } from '@/utils/authorization'

export const Containers = () => {
  const { data: containers } = useSWR<Container[]>(`/containers`)
  const { handleLogout } = useHandleLogout()

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
        <Button danger onClick={handleLogout}>
          Logout
        </Button>
      </OneAuthorizationStateRoute>
    </>
  )
}
