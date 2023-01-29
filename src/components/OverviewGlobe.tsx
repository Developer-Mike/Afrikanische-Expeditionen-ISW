import styles from "@/styles/Globe.module.scss"
import { useEffect, useMemo, useRef, useState } from "react"
import { Expedition, ExpeditionArc, ExpeditionNode } from "@/utils/interfaces"
import { globleArcs, globleNodes } from "@/utils/expeditionUtils"

let Globe = () => null
if (typeof window !== "undefined") Globe = require("react-globe.gl").default

export default function OverviewGlobe({ expeditions }: {
    expeditions: Expedition[]
}) {
    const [isCSR, setIsCSR] = useState(false)
    const [selectedExpeditionId, setSelectedExpeditionId] = useState(null)
    const globeRef = useRef()

    const nodes = useMemo(() => globleNodes(expeditions), expeditions)
    const arcs = useMemo(() => globleArcs(expeditions), expeditions)

    useEffect(() => {
        setIsCSR(true)

        /*if (globeRef.current) {
            //@ts-ignore
            globeRef.current.controls().enableZoom = false
        }*/
    })

    function getColor(element: ExpeditionNode|ExpeditionArc): string {
        let expedition: Expedition = expeditions.find(d => d.id == element.expeditionId)!
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
                pointRadius={d => d.file ? 1 : 0.5}
                pointAltitude={0}
                onPointClick={(d, _event, _data) => setSelectedExpeditionId(d.expeditionId)}

                arcsData={arcs}
                arcStartLat={d => d.start.lat}
                arcStartLng={d => d.start.lng}
                arcEndLat={d => d.end.lat}
                arcEndLng={d => d.end.lng}
                arcColor={getColor}
                arcAltitude={0}
                arcStroke={1}
                onArcClick={(d, _event, _data) => setSelectedExpeditionId(d.expeditionId)}
            />) }
        </div>
    )
}