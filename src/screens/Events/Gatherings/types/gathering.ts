export interface Gathering {
  building: number
  building_part?: number
  confirmed_at?: string
  containers: number[]
  created_at: string
  emptied_containers: number[]
  id: number
  mass: number
  worker_info: string
}
