import styles from "@/styles/Globe.module.scss"
import { useEffect, useMemo, useRef, useState } from "react"
import { Expedition } from "@/utils/interfaces"
import { getArcs } from "@/utils/expeditionUtils"

let Globe = () => null
if (typeof window !== "undefined") Globe = require("react-globe.gl").default

export default function ExpeditionGlobe({ expedition }: {
    expedition: Expedition
}) {
    const [isCSR, setIsCSR] = useState(false)
    const globeRef = useRef()

    const arcs = useMemo(() => getArcs(expedition), expedition.nodes)

    useEffect(() => {
        setIsCSR(true)

        /*if (globeRef.current) {
            //@ts-ignore
            globeRef.current.controls().enableZoom = false
        }*/
    })

    return (
        <div id={styles.globe}>
            { isCSR && (<Globe ref={globeRef}
                globeImageUrl="/world_satelite.jpg"

                pointsData={expedition.nodes}
                pointLat={d => d.lat}
                pointLng={d => d.lng}
                pointRadius={d => d.file ? 1 : 0.5}
                pointColor={d => expedition.color}
                pointAltitude={0}

                arcsData={arcs}
                arcStartLat={d => d.start.lat}
                arcStartLng={d => d.start.lng}
                arcEndLat={d => d.end.lat}
                arcEndLng={d => d.end.lng}
                arcColor={d => expedition.color}
                arcAltitude={0.02}
                arcStroke={1}
            />) }
        </div>
    )
}