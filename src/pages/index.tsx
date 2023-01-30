import Head from 'next/head'
import styles from '@/styles/Index.module.scss'
import { cookedGroups } from 'public/expeditions/expeditions'
import OverviewGlobe from '@/components/OverviewGlobe'
import { Expedition, ExpeditionGroup } from '@/utils/interfaces'
import { useState } from 'react'

export default function Index({ groups }: {
  groups: ExpeditionGroup[]
}) {
  const [selectedGroupId, setSelectedGroupId] = useState(null)

  return (
    <>
      <Head>
        <title>Magellan</title>
        <meta name="viewport" content= "width=device-width, initial-scale=1.0, user-scalable=no"/>
      </Head>

      <main>
        <div>

        </div>

        <OverviewGlobe
          groups={groups}
          {...{selectedGroupId, setSelectedGroupId}} />
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
