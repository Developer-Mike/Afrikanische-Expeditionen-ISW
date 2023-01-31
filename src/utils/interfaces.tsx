export interface ExpeditionGroup {
  id: string

  title: string
  description: string
  expeditions: Expedition[]
}

export interface Expedition {
  id: string
  groupId?: string

  file: string
  color: string
  selectedColor: string
  nodes: ExpeditionNode[]
}

export interface ExpeditionNode {
  groupId?: string
  expeditionId?: string

  lat: number
  lng: number
}