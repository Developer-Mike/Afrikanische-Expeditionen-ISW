export interface ExpeditionGroup {
  id: string

  title: string
  description: string
  expeditions: Expedition[]
}

export interface Expedition {
  id: string
  groupId?: string

  name: string
  color: string
  selectedColor: string
  nodes: ExpeditionNode[]
}

export interface ExpeditionNode {
  groupId?: string
  expeditionId?: string

  file?: string
  lat: number
  lng: number
}