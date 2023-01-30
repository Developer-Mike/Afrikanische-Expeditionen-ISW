import Head from 'next/head'
import styles from '@/styles/Group.module.scss'
import { cookedGroups } from 'public/expeditions/expeditions'
import { Expedition, ExpeditionGroup } from '@/utils/interfaces'
import ExpeditionGlobe from '@/components/ExpeditionGlobe'
import { useEffect, useRef, useState } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useRouter } from 'next/router'
import path from 'path'
import fsPromises from 'fs/promises';

export default function Index({ group, markdowns }: {
  group: ExpeditionGroup
  markdowns: {[key: string]: string}
}) {
  const router = useRouter()
  const expeditionContainer = useRef()
  const [selectedExpeditionId, _setSelectedExpeditionId] = useState(group.expeditions[0].id)

  function setSelectedExpeditionId(newSelectedExpeditionId: string) {
    _setSelectedExpeditionId(newSelectedExpeditionId)
    router.push(`#${newSelectedExpeditionId}`, undefined, { shallow: true })
  }

  useEffect(() => {
    if (expeditionContainer.current) {
      // @ts-ignore
      expeditionContainer.current.addEventListener("scroll", e => {
        // @ts-ignore
        let selectedExpeditionIndex = parseInt(expeditionContainer.current?.scrollTop / (window.innerHeight / 2))
        let newSelectedExpeditionId = group.expeditions[selectedExpeditionIndex].id

        if (selectedExpeditionId != newSelectedExpeditionId) _setSelectedExpeditionId(newSelectedExpeditionId)
      })
    }
  })

  return (
    <>
      <Head>
        <title>{group.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
      </Head>

      <main>
        <div ref={expeditionContainer} className={styles.expeditionInfo}>
          { group.expeditions.map((expedition: Expedition) => {
            return (
              <section key={expedition.id} id={expedition.id} className={styles.expeditionSection}>
                <ReactMarkdown children={markdowns[expedition.id]} />
              </section>
            )
          }) }
        </div>

        <ExpeditionGlobe
          group={group} 
          {...{selectedExpeditionId, setSelectedExpeditionId}} />
      </main>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { groupId } = context.query
  let group = cookedGroups.find(group => group.id == groupId)

  let markdowns: {[key: string]: string} = {}
  for (let expedition of group?.expeditions!) {
    let filePath = path.join("public", "expeditions", "markdowns", expedition.file)
    markdowns[expedition.id] = await fsPromises.readFile(filePath, 'utf8')
  }

  return {
    props: {
      group: group,
      markdowns: markdowns
    },
    notFound: group == null
  }
}
