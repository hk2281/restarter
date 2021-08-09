import Head from 'next/head'
import { Rules } from '@/screens/Rules'
import {UnauthorizedLayout} from "@/shared/UnauthorizedLayout";

const RulesPage = () => {
  return (
    <>
      <Head>
        <title>Rules page</title>
      </Head>
      <Rules />
    </>
  )
}

RulesPage.layout = UnauthorizedLayout
export default RulesPage
