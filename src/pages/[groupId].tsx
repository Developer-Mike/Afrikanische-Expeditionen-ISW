import Head from 'next/head'
import styles from '@/styles/Group.module.scss'
import { cookedGroups } from 'public/expeditions/expeditions'
import { ExpeditionGroup } from '@/utils/interfaces'
import ExpeditionGlobe from '@/components/ExpeditionGlobe'
import { useState } from 'react'

export default function Index({ group }: {
  group: ExpeditionGroup
}) {
  const [selectedExpeditionId, setSelectedExpeditionId] = useState(group.expeditions[0].id)

  return (
    <>
      <Head>
        <title>{group.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
      </Head>

      <main>
        <div className={styles.expeditionInfo}>
          
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
