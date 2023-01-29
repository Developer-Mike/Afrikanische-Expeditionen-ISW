import { Expedition, ExpeditionArc, ExpeditionNode } from "./interfaces"

export function getArcs(expedition: Expedition): ExpeditionArc[] {
  let arcs: ExpeditionArc[] = []
  var lastNode: ExpeditionNode|null = null

  expedition.nodes.forEach((node) => {
    if (lastNode != null) {
      arcs.push(
        {
          expeditionId: expedition.id,
          start: {
            lat: lastNode.lat,
            lng: lastNode.lng
          },
          end: {
            lat: node.lat,
            lng: node.lng
          }
        }
      )
    }

    lastNode = node
  })

  return arcs
}

export function globleArcs(expeditions: Expedition[]): ExpeditionArc[] {
  var arcs: ExpeditionArc[] = []

  expeditions.forEach((expedition) => {
    getArcs(expedition).forEach((arc) => {
      let globledArc = {...arc}
      globledArc.expeditionId = expedition.id

      arcs.push(globledArc)
    })
  })

  return arcs
}

export function globleNodes(expeditions: Expedition[]): ExpeditionNode[] {
  var nodes: ExpeditionNode[] = []

  expeditions.forEach((expedition) => {
    expedition.nodes.forEach((node) => {
      let globledNode = {...node}
      globledNode.expeditionId = expedition.id

      nodes.push(globledNode)
    })
  })

  return nodes
}