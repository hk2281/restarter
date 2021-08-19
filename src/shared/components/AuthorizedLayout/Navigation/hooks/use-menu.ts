import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useHandleLogout } from '@/shared/components/AuthorizedLayout/Navigation/hooks/use-handle-logout'
import { tabs } from '@/shared/components/AuthorizedLayout/Navigation/tabs'

interface Params {
  key: string
}

export const useMenu = () => {
  const router = useRouter()
  const [selectedKey, setSelectedKey] = useState<string>()
  const { handleLogout } = useHandleLogout()
  const handleSelect = useCallback(
    async ({ key }: Params) => {
      if (key !== `logout`) {
        setSelectedKey(key)
      } else {
        await handleLogout()
      }
    },
    [handleLogout],
  )

  useEffect(() => {
    setSelectedKey(
      tabs.find((tab) => router.pathname.startsWith(tab.path))?.path,
    )
  }, [router.pathname])

  return useMemo(
    () => ({ handleSelect, selectedKey }),
    [handleSelect, selectedKey],
  )
}
