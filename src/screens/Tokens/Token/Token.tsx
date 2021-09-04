import { Card, Skeleton, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { api } from '@/api'

export const Token = () => {
  const [token, setToken] = useState(``)
  useEffect(() => {
    api
      .get(`/auth/registration-token`)
      .then(({ data }) => setToken(data.signup_url))
  }, [])

  return (
    <Card size='small'>
      {token ? (
        <Typography.Text copyable>{token}</Typography.Text>
      ) : (
        <Skeleton.Input active />
      )}
    </Card>
  )
}
