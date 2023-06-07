import React from 'react'
import { useStateContext } from '../../context/ContextProvider'
import Head from '../../components/profile/head';
import Progress from '../../components/profile/progress';

function Index() {
  const { user } = useStateContext();

  return (
    <section>
      <Head user={user} />
      <Progress />
    </section>
  )
}

export default Index