import styles from "@/styles/CustomGlobe.module.scss"
import { useEffect, useMemo, useRef, useState } from "react"
import { Expedition, ExpeditionGroup, ExpeditionLabel, ExpeditionNode } from "@/utils/interfaces"
import { shadeColor } from "@/utils/colorUtils"

let Globe = () => null
if (typeof window !== "undefined") Globe = require("react-globe.gl").default

export default function CustomGlobe({ data, selectedDataId, setSelectedDataId }: {
    data: ExpeditionGroup|ExpeditionGroup[]
    selectedDataId: String|null
    setSelectedDataId: Function
}) {
    const isSingleGroup = !Array.isArray(data)

    const [isCSR, setIsCSR] = useState(false)
    const globeRef = useRef()

    const expeditions = useMemo(() => { 
        if (isSingleGroup) return data.expeditions
        else {
            return data.flatMap((group: ExpeditionGroup) => {
                return group.expeditions
            }) 
        } 
    }, [data])

    /* const nodes = useMemo(() => { 
        return expeditions.flatMap((expedition: Expedition) => {
            return expedition.nodes
        })
    }, [data]) */

    const labels = useMemo(() => { 
        return expeditions.flatMap((expedition: Expedition) => {
            return expedition.labels
        })
    }, [data])

    useEffect(() => {
        setIsCSR(true)

        if (globeRef.current) {
            // @ts-ignore
            let controls = globeRef.current.controls()

            controls.minPolarAngle = Math.PI * 0.4
            controls.maxPolarAngle = Math.PI * 0.8

            controls.maxDistance = 200
            controls.minDistance = 50

            setTimeout(() => {
                controls.update()
            }, 10)
        }
    }, [isCSR, globeRef.current])

    function getColor(element: ExpeditionNode|ExpeditionLabel): string {
        let group: ExpeditionGroup = isSingleGroup ? data : data.find(group => group.id == element.groupId)!
        let expedition: Expedition = group.expeditions.find(expedition => expedition.id == element.expeditionId)!
        
        if (isSingleGroup) {
            if (element.expeditionId != selectedDataId) return expedition.color
            else return shadeColor(expedition.color, -30)
        } else {
            if (element.groupId != selectedDataId) return group.color
            else return shadeColor(group.color, -30)
        }
    }

    return (
        <div id={styles.globe}>
            { isCSR && (<Globe ref={globeRef}
                globeImageUrl="/edited-map.png"

                /*pointsData={nodes}
                pointLat={d => d.lat}
                pointLng={d => d.lng}
                pointColor={getColor}
                pointRadius={d => d.file ? 0.3 : 0}
                pointAltitude={0}
                onPointClick={(d, _event, _data) => setSelectedDataId(isSingleGroup ? d.expeditionId : d.groupId)}*/

                pathsData={expeditions}
                pathLabel={null}
                pathPoints={d => d.nodes}
                pathPointLat={d => d.lat}
                pathPointLng={d => d.lng}
                pathColor={d => getColor(d.nodes[0])}
                pathPointAlt={0}
                pathStroke={5}
                pathTransitionDuration={0}
                onPathClick={(d, _event, _data) => setSelectedDataId(isSingleGroup ? d.id : d.groupId)}

                labelsData={labels.filter(label => isSingleGroup && label.expeditionId == selectedDataId)}
                labelLat={d => d.lat}
                labelLng={d => d.lng}
                labelColor={d => getColor(d)}
                labelSize={0.5}
                labelsTransitionDuration={200}
            />) }
        </div>
    )
}