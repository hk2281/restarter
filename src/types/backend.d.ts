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
}
