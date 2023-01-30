import styles from "@/styles/Globe.module.scss"
import { useEffect, useMemo, useRef, useState } from "react"
import { Expedition, ExpeditionGroup, ExpeditionNode } from "@/utils/interfaces"

let Globe = () => null
if (typeof window !== "undefined") Globe = require("react-globe.gl").default

export default function OverviewGlobe({ groups, selectedGroupId, setSelectedGroupId }: {
    groups: ExpeditionGroup[]
    selectedGroupId: String
    setSelectedGroupId: Function
}) {
    const [isCSR, setIsCSR] = useState(false)
    const globeRef = useRef()

    const expeditions = useMemo(() => { 
        return groups.flatMap((group: ExpeditionGroup) => {
            return group.expeditions
        }) 
    }, groups)

    const nodes = useMemo(() => { 
        return expeditions.flatMap((expedition: Expedition) => {
            return expedition.nodes
        })
    }, groups)

    console.log(nodes)

    useEffect(() => {
        setIsCSR(true)

        /*if (globeRef.current) {
            //@ts-ignore
            globeRef.current.controls().enableZoom = false
        }*/
    })

    function getColor(element: ExpeditionNode): string {
        let group: ExpeditionGroup = groups.find(group => group.id == element.groupId)!
        let expedition: Expedition = group.expeditions.find(expedition => expedition.id == element.expeditionId)!

        return element.groupId == selectedGroupId ? expedition.selectedColor : expedition.color
    }

    return (
        <div id={styles.globe}>
            { isCSR && (<Globe ref={globeRef}
                globeImageUrl="/world_satelite.jpg"

                pointsData={nodes}
                pointLat={d => d.lat}
                pointLng={d => d.lng}
                pointColor={getColor}
                pointRadius={d => d.file ? 1 : 0}
                pointAltitude={0}
                onPointClick={(d, _event, _data) => setSelectedGroupId(d.groupId)}

                pathsData={expeditions}
                pathPoints={d => d.nodes}
                pathPointLat={d => d.lat}
                pathPointLng={d => d.lng}
                pathColor={d => getColor(d.nodes[0])}
                pathPointAlt={0.005}
                pathStroke={5}
                pathTransitionDuration={0}
                onPathClick={(d, _event, _data) => setSelectedGroupId(d.groupId)}
            />) }
        </div>
    )
}