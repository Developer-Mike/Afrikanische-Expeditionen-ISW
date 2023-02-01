import Head from 'next/head'
import styles from '@/styles/Group.module.scss'
import { cookedGroups } from 'public/expeditions/expeditions'
import { Expedition, ExpeditionGroup } from '@/utils/interfaces'
import CustomGlobe from '@/components/CustomGlobe'
import { useEffect, useRef, useState } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'
import { useRouter } from 'next/router'
import path from 'path'
import fsPromises from 'fs/promises';

export default function Index({ group, expeditionTexts }: {
  group: ExpeditionGroup
  expeditionTexts: {[key: string]: string}
}) {
  const router = useRouter()
  const expeditionTextContainer = useRef()
  const globeRef = useRef()
  const [selectedExpeditionId, _setSelectedExpeditionId] = useState(group.expeditions[0].id)

  function setSelectedExpeditionId(newSelectedExpeditionId: string) {
    _setSelectedExpeditionId(newSelectedExpeditionId)
    router.push(`#${newSelectedExpeditionId}`, undefined, { shallow: true })
  }

  useEffect(() => {
    if (expeditionTextContainer.current) {
      // @ts-ignore
      expeditionTextContainer.current.addEventListener("scroll", e => {
        try {
        // @ts-ignore
          let children = expeditionTextContainer.current.childNodes
          for (let i = 0; i < children.length; i++) {
            let child = children[i]
            let position = child.getBoundingClientRect()

            if(position.top < window.innerHeight && position.bottom >= 0) {
              _setSelectedExpeditionId(child.id)
              return
            }
          }
        } catch(e) {}
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>{group.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
      </Head>

      <main>
        <div id={styles.sidePanel}>
          <div className={styles.progressDots}>
            { group.expeditions.map((expedition: Expedition) => {
              return (
                <div key={expedition.id} 
                className={selectedExpeditionId == expedition.id ? styles.selected : undefined}
                onClick={() => setSelectedExpeditionId(expedition.id)} />
              )
            })}
          </div>

          <div ref={expeditionTextContainer} className={styles.expeditionTextContainer}>
            { group.expeditions.map((expedition: Expedition) => {
              return (
                <section key={expedition.id} id={expedition.id} className={styles.expeditionSection}>
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {expeditionTexts[expedition.id]}
                  </ReactMarkdown>
                </section>
              )
            }) }
          </div>
        </div>

        <CustomGlobe
          data={group} 
          selectedDataId={selectedExpeditionId}
          setSelectedDataId={setSelectedExpeditionId}
          globeRef={globeRef} />
      </main>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { groupId } = context.query
  let group = cookedGroups.find(group => group.id == groupId)

  let expeditionTexts: {[key: string]: string} = {}
  if (group) {
    for (let expedition of group?.expeditions!) {
      let filePath = path.join("public", "expeditions", "markdowns", expedition.file)
      expeditionTexts[expedition.id] = await fsPromises.readFile(filePath, 'utf8')
    }
  }

  return {
    props: {
      group: group,
      expeditionTexts: expeditionTexts
    },
    notFound: group == null
  }
}
