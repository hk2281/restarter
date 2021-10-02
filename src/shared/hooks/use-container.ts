import useSWR from 'swr'

interface Params {
  id?: number
}

export const useContainer = ({ id }: Params) => {
  return useSWR<Backend.Container>(!!id ? `/containers/${id}` : null)
}
