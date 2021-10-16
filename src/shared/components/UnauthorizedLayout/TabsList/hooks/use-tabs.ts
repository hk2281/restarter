import { useContext, useMemo } from 'react'
import { AuthContext } from '@/utils/authorization'
import { PATH } from '@/config'

export const useTabs = () => {
  const { authorized } = useContext(AuthContext)
  const tabs = useMemo(
    () => [
      { path: PATH.HOME, title: `Главная` },
      {
        path: authorized ? PATH.CONTAINERS : PATH.LOGIN,
        title: authorized ? `Личный кабинет` : `Вход`,
      },
      { path: PATH.RULES, title: `Правила сбора` },
      { path: PATH.ABOUT, title: `О нас` },
      { path: PATH.HELP, title: `Помощь` },
    ],
    [authorized],
  )
  return { tabs }
}
