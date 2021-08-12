import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { PATH } from '@/config'
import { useTabs } from '@/shared/components/UnauthorizedLayout/TabsList/hooks/use-tabs'

export const useSelectedTab = () => {
  const router = useRouter()
  const { tabs } = useTabs()

  return useMemo(
    () => ({
      tab:
        tabs
          .filter((tab) => tab.path !== PATH.HOME)
          .find((tab) => router.pathname.startsWith(tab.path))?.path ||
        PATH.HOME,
    }),
    [router.pathname, tabs],
  )
}
