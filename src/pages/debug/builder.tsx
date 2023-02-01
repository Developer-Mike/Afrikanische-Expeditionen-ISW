import styles from '@/styles/Builder.module.scss'
import { ExpeditionNode } from '@/utils/interfaces'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

let Globe = () => null
if (typeof window !== "undefined") Globe = require("react-globe.gl").default

var loaded = false
export default function Index() {
  const [isCSR, setIsCSR] = useState(false)
  const globeRef = useRef()

  const [nodes, _setNodes] = useState<ExpeditionNode[]>([{}])
  const nodesRef = useRef(nodes)
  function setNodes(nodes: ExpeditionNode[]) {
    nodesRef.current = nodes
    _setNodes(nodes);
  }

  useEffect(() => {
    setIsCSR(true)
    
    if (loaded) return
    loaded = true
    console.log("Registering Events")

    window.addEventListener("mousedown", e => {
      if (!globeRef.current || e.button != 2) return
      // @ts-ignore
      let data = globeRef.current.toGlobeCoords(e.x, e.y)
      if (!data) return

      let newNode: ExpeditionNode = {
        lat: data.lat,
        lng: data.lng
      }

      let newNodes = [...nodesRef.current, newNode]
      setNodes(newNodes)
    })

    window.addEventListener("keydown", e => {
      if (e.key != "Backspace") return

      let newNodes = [...nodesRef.current]
      if (newNodes.length > 1) newNodes.pop()

      setNodes(newNodes)
    })
  }, [])

  return (
    <>
      <Head>
        <title>Builder</title>
        <meta name="viewport" content= "width=device-width, initial-scale=1.0, user-scalable=no"/>
      </Head>

      <main>
        <div className={styles.output}>
         [{nodes.slice(1).map(d => `{lat: ${d.lat}, lng: ${d.lng}}`).join(", ")}]
        </div>

        <div id={styles.globe}>
          { isCSR && 
          // @ts-ignore
          (<Globe ref={globeRef}
                  globeImageUrl="/edited-map.png"

                  pointsData={nodes}
                  pointLat={d => d.lat}
                  pointLng={d => d.lng}
                  pointColor={d => "white"}
                  pointRadius={d => 0.2}
                  pointAltitude={0}

                  pathsData={[nodes]}
                  pathPointLat={d => d.lat}
                  pathPointLng={d => d.lng}
                  pathColor={d => "white"}
                  pathPointAlt={0.005}
                  pathStroke={1}
                  pathTransitionDuration={0}
              />) }
        </div>
      </main>
    </>
  )
}