import Head from 'next/head'
import styles from '@/styles/Index.module.scss'
import { cookedGroups } from 'public/expeditions/expeditions'
import CustomGlobe from '@/components/CustomGlobe'
import { ExpeditionGroup } from '@/utils/interfaces'
import { useRef, useState } from 'react'
import { useRouter } from 'next/router'

export default function Index({ groups }: {
  groups: ExpeditionGroup[]
}) {
  const router = useRouter()
  const globeRef = useRef()
  const [selectedGroupId, _setSelectedGroupId] = useState<string|null>(null)

  function setSelectedGroupId(newSelectedGroupId: string) {
    _setSelectedGroupId(newSelectedGroupId)
    router.push(`#${newSelectedGroupId}`, undefined, { shallow: true })
  }

  return (
    <>
      <Head>
        <title>Afrikas Expeditionen</title>
        <meta name="viewport" content= "width=device-width, initial-scale=1.0, user-scalable=no"/>
      </Head>

      <main>
        <div className={styles.expeditionGroupsContainer}>
          { groups.map((group: ExpeditionGroup) => {
            return (
              <section key={group.id} id={group.id} className={styles.expeditionGroup} onClick={() => router.push(group.id)} style={{ borderColor: group.color }}>
                <h1>{group.title}</h1>
                <p>{group.description}</p>
              </section>
            )
          }) }
        </div>

        <CustomGlobe
          data={groups}
          selectedDataId={selectedGroupId}
          setSelectedDataId={setSelectedGroupId}
          globeRef={globeRef} />
      </main>
    </>
  )
}

export async function getStaticProps(context: any) {
  return {
    props: {
      groups: cookedGroups
    }
  }
}
