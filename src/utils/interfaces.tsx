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
}

export interface ExpeditionNode {
  groupId?: string
  expeditionId?: string

  lat: number
  lng: number
}