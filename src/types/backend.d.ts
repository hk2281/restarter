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

  interface Container {
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
    room: string
    description: string
    mass: number
    phone: string
    status: string
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
    containers: Container[]
    created_at: string
    emptied_containers: number[]
    id: number
    mass: number
    worker_info: string
  }
}
