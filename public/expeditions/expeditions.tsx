import { Expedition, ExpeditionGroup, ExpeditionNode } from "@/utils/interfaces"

const expeditions: {[key: string]: Expedition} = {
  exampleExp: {
    id: "ex1",
    name: "Example 1",
    file: "/markdowns/example.md",
    color: "lightblue",
    selectedColor: "blue",
    nodes: [
      {
          lat: 0.0,
          lng: 0.0
      },
      {
          lat: 20.0,
          lng: -5.0
      },
      {
          lat: 10.0,
          lng: -30.0
      }
    ]
  },
  exampleExp2: {
    id: "ex2",
    name: "Example 2",
    file: "/markdowns/example.md",
    color: "limegreen",
    selectedColor: "green",
    nodes: [
      {
          lat: -5.0,
          lng: 10.0
      },
      {
          lat: 10.0,
          lng: -15.0
      }
    ]
  }
}

const groups: ExpeditionGroup[] = [
  {
    id: "magellan",
    title: "Reise von Magellan",
    description: "Lorem Ipsum",
    expeditions: [
      expeditions.exampleExp,
      expeditions.exampleExp2,
    ]
  }
]

export const cookedGroups = (() => {
  let cookingGroups = groups
  cookingGroups.forEach((group: ExpeditionGroup) => {
    group.expeditions.forEach((expedition: Expedition) => {
      expedition.groupId = group.id

      expedition.nodes.forEach((node: ExpeditionNode) => {
        node.groupId = group.id
        node.expeditionId = expedition.id
      })
    })
  })
  
  return cookingGroups
})()