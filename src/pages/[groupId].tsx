import Head from 'next/head'
import styles from '@/styles/Group.module.scss'
import { cookedGroups } from 'public/expeditions/expeditions'
import { Expedition, ExpeditionGroup } from '@/utils/interfaces'
import ExpeditionGlobe from '@/components/ExpeditionGlobe'
import { useEffect, useRef, useState } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useRouter } from 'next/router'
import path from 'path'

export default function Index({ group }: {
  group: ExpeditionGroup
}) {
  const router = useRouter()
  const expeditionContainer = useRef()
  const [selectedExpeditionId, _setSelectedExpeditionId] = useState(group.expeditions[0].id)

  function setSelectedExpeditionId(newSelectedExpeditionId: string) {
    router.push(`#${selectedExpeditionId}`, undefined, { shallow: true })
    _setSelectedExpeditionId(newSelectedExpeditionId)
  }

  useEffect(() => {
    if (expeditionContainer.current) {
      expeditionContainer.current.addEventListener("scroll", e => {
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
            let filePath = path.join("public", expedition.file);
            let fileContents = fs.readFileSync(filePath, 'utf8');

            return (
              <section id={expedition.id} className={styles.expeditionSection}>
                <ReactMarkdown children={fileContents} />
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

  return {
    props: {
      group: group
    },
    notFound: group == null
  }
}
