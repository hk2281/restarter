import useSWR from 'swr'
import { api } from '@/api'

interface Params {
  building?: number
}

export const useTakeoutConditions = ({ building }: Params) => {
  return useSWR<Backend.TakeoutConditions>(
    building ? [`/takeout-conditions`, building] : null,
    async (url, building) =>
      (await api.get(url, { params: { building } })).data,
  )
}
