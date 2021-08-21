interface BuildingPart {
  id: number
  num: number
}

export interface Building {
  id: number
  address: string
  itmo_worker_email: string
  containers_takeout_email: string
  building_part?: BuildingPart
}
