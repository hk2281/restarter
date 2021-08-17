export interface Container {
  avg_fill_time: string
  avg_takeout_wait_time: string
  building: {
    id: number
    address: string
  }
  building_part?: null
  created_at: string
  cur_fill_time: string
  cur_takeout_wait_time: string
  email: string
  floor: number
  id: number
  is_full: true
  is_public: false
  kind: string
  location: string
  mass: number
  phone: string
  status: string
}
