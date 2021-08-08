import useSWR from 'swr'

export const Containers = () => {
  const { data: containers } = useSWR(`/containers`)

  console.log(containers)

  return <></>
}
