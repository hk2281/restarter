import useSWR from 'swr'
import { Building } from '@/screens/Signup/types/building'

interface Params {
  id?: number
}

interface Container {
  id: number
  kind: number
  mass: number
  building: Building
  building_part: null
  floor: number
  location: string
  is_full: boolean
  status: number
  is_public: boolean
  created_at: string
  email: string
  phone: string
  cur_fill_time: string
  cur_takeout_wait_time: string
  avg_fill_time: string
  avg_takeout_wait_time: string
}

export const useContainer = ({ id }: Params) => {
  const { data: container } = useSWR<Container>(
    !!id ? `/containers/${id}` : null,
  )

  return { container }
}
