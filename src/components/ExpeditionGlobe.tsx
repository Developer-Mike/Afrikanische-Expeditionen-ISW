import styles from "@/styles/Globe.module.scss"
import { useEffect, useMemo, useRef, useState } from "react"
import { Expedition, ExpeditionGroup, ExpeditionNode } from "@/utils/interfaces"

let Globe = () => null
if (typeof window !== "undefined") Globe = require("react-globe.gl").default

export default function ExpeditionGlobe({ group, selectedExpeditionId, setSelectedExpeditionId }: {
    group: ExpeditionGroup
    selectedExpeditionId: String
    setSelectedExpeditionId: Function
}) {
    const [isCSR, setIsCSR] = useState(false)
    const globeRef = useRef()

    const nodes = useMemo(() => { 
        return group.expeditions.flatMap((expedition: Expedition) => {
            return expedition.nodes
        })
    }, [group])

    useEffect(() => {
        setIsCSR(true)

        if (globeRef.current) {
            // @ts-ignore
            let controls = globeRef.current.controls()

            controls.minPolarAngle = Math.PI * 0.3
            controls.maxPolarAngle = Math.PI * 0.7

            controls.maxDistance = 200
            controls.minDistance = 200 // 50 - Disable Zoom

            setTimeout(() => {
                controls.update()
            }, 10)
        }
    }, [isCSR, globeRef.current])

    function getColor(element: ExpeditionNode): string {
        let expedition: Expedition = group.expeditions.find(expedition => expedition.id == element.expeditionId)!
        return element.expeditionId == selectedExpeditionId ? expedition.selectedColor : expedition.color
    }

    return (
        <div id={styles.globe}>
            { isCSR && (<Globe ref={globeRef}
                globeImageUrl="/world_satelite.jpg"

                pointsData={nodes}
                pointLat={d => d.lat}
                pointLng={d => d.lng}
                pointColor={getColor}
                pointRadius={d => d.file ? 0.3 : 0}
                pointAltitude={0}
                onPointClick={(d, _event, _data) => setSelectedExpeditionId(d.expeditionId)}

                pathsData={group.expeditions}
                pathLabel={null}
                pathPoints={d => d.nodes}
                pathPointLat={d => d.lat}
                pathPointLng={d => d.lng}
                pathColor={d => getColor(d.nodes[0])}
                pathPointAlt={0.005}
                pathStroke={5}
                pathTransitionDuration={0}
                onPathClick={(d, _event, _data) => setSelectedExpeditionId(d.id)}
            />) }
        </div>
    )
}