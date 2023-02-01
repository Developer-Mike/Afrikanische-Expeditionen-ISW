export interface ExpeditionGroup {
  id: string

  title: string
  description: string
  color: string
  expeditions: Expedition[]
}

export interface Expedition {
  id: string
  groupId?: string

  file: string
  color: string
  nodes: ExpeditionNode[]
  labels: ExpeditionLabel[]
}

export interface ExpeditionNode {
  groupId?: string
  expeditionId?: string

  lat: number
  lng: number
}

export interface ExpeditionLabel {
  groupId?: string
  expeditionId?:string

  text: string
  lat: number
  lng: number
}