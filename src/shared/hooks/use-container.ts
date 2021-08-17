import useSWR from 'swr'
import { Container } from '@/screens/Containers/types/container'

interface Params {
  id?: number
}

export const useContainer = ({ id }: Params) => {
  return useSWR<Container>(!!id ? `/containers/${id}` : null)
}
