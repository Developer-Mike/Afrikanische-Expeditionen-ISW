import { Expedition, Explorer } from "@/utils/interfaces"

const persons: {[key: string]: Explorer} = {
  magellan: {
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Ferdinand_Magellan.jpg",
    name: "Ferdinand Magellan",
    birth: 1480,
    death: 1521,
    description: "Lorem Ipsum"
  }
}

const expeditions: Expedition[] = [
  {
    id: "mg1",
    name: "Weltumrundung",
    person: persons.magellan,
    color: "#ffffff",
    selectedColor: "#bbbbbb",
    nodes: [
      {
          file: "dsa",
          lat: 0.0,
          lng: 0.0
      },
      {
          file: "dsa",
          lat: 20.0,
          lng: -5.0
      },
      {
          lat: 10.0,
          lng: -30.0
      }
    ]
  }
]

export default expeditions