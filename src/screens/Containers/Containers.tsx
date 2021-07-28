import useSWR from 'swr'
import { useAxios } from '@/api'

export const Containers = () => {
  const { axios } = useAxios()
  const { data: containers } = useSWR(`/containers`, axios.get, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  })

  console.log(containers)

  return <></>
}
