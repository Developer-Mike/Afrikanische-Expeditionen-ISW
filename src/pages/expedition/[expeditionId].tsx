import Head from 'next/head'
import styles from '@/styles/Expedition.module.scss'
import expeditions from 'public/expeditions'
import { Expedition } from '@/utils/interfaces'
import ExpeditionGlobe from '@/components/ExpeditionGlobe'

export default function Index({ expedition }: {
  expedition: Expedition
}) {
  return (
    <>
      <Head>
        <title>{expedition.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
      </Head>
      <main>
        <ExpeditionGlobe
          expedition={expedition} />
      </main>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { expeditionId } = context.query
  let expedition = expeditions.find(d => d.id == expeditionId)

  return {
    props: {
      expedition: expedition
    },
    notFound: expedition == null
  }
}
