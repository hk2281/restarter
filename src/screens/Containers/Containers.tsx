import useSWR from 'swr'
import { api } from '@/api'

export const Containers = () => {
  const { data: containers } = useSWR(`/containers`, api.get, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  })

  console.log(containers)

  return <></>
}
