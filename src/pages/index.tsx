import Head from 'next/head'
import styles from '@/styles/Index.module.scss'
import expeditions from 'public/expeditions'
import OverviewGlobe from '@/components/OverviewGlobe'
import { Expedition } from '@/utils/interfaces'

export default function Index({ expeditions }: {
  expeditions: Expedition[]
}) {
  return (
    <>
      <Head>
        <title>Magellan</title>
        <meta name="viewport" content= "width=device-width, initial-scale=1.0, user-scalable=no"/>
      </Head>
      <main>
        <OverviewGlobe
          expeditions={expeditions} />
      </main>
    </>
  )
}

export async function getStaticProps(context: any) {
  return {
    props: {
      expeditions: expeditions
    }
  }
}
