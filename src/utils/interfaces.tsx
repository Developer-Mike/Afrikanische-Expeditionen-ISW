export interface Expedition {
  id: string
  name: string
  person: Explorer
  color: string
  selectedColor: string
  nodes: ExpeditionNode[]
}

export interface Explorer {
  image: string
  name: string
  birth: number
  death: number|null
  description: string
}

export interface ExpeditionNode {
  expeditionId?: string

  file?: string
  lat: number
  lng: number
}

export interface ExpeditionArc {
  expeditionId?: string

  start: {
    lat: number
    lng: number
  }

  end: {
    lat: number
    lng: number
  }
}