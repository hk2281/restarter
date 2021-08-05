import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { PATH } from '@/config'
import { AuthContext } from '@/authorization'

interface Conditions {
  authorized: boolean
}

export const useShowPageConditionally = ({ authorized }: Conditions) => {
  const context = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (authorized !== context.authorized) {
      router.push(authorized ? PATH.LOGIN : PATH.CONTAINERS).then()
    }
  }, [authorized, context.authorized, router])

  return {
    shouldShow: !context.loading && context.authorized === authorized,
  }
}
