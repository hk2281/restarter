declare namespace Backend {
  interface Me {
    id: number
    email: string
    has_eco_group: boolean
  }

  interface BuildingPart {
    id: number
    num: number
  }

  interface Building {
    id: number
    address: string
    itmo_worker_email: string
    containers_takeout_email: string
    building_parts?: BuildingPart[]
  }

  type TakeoutConditions = {
    building: Pick<Building, 'id', 'address'>
    building_part: BuildingPart
    id: number
    ignore_reports?: number
    mass?: number
    office_days?: number
    public_days?: number
  }[]

  type Export = {
    id: number
    created_at: string
    building: number
    mass: number
    confirmed_at: string
    confirmed_mass: number
    wait_time: string
    fill_time: string
  }

  type Gathering = {
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
}
