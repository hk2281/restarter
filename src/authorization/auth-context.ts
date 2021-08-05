import { createContext } from 'react'

interface AuthContextInterface {
  setAuthorized: (authorized: boolean) => void
  authorized: boolean
  loading: boolean
}

export const AuthContext = createContext<AuthContextInterface>({
  setAuthorized: () => null,
  authorized: false,
  loading: true,
})
