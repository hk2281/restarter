import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { tabs } from '@/shared/components/UnauthorizedLayout/TabsList/tabs'
import { PATH } from '@/config'

export const useSelectedTab = () => {
  const router = useRouter()

  return useMemo(
    () => ({
      tab:
        tabs
          .filter((tab) => tab.path !== PATH.HOME)
          .find((tab) => router.pathname.includes(tab.path))?.path || PATH.HOME,
    }),
    [router.pathname],
  )
}
