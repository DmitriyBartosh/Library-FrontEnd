import React from 'react'
import { navigate } from 'gatsby';
import { useStateContext } from '../../context/ContextProvider'
import Head from './head';

import Progress from './progress';
import { useEffectOnce } from 'react-use';

function Index() {
  const { user, statusDirection } = useStateContext();

  useEffectOnce(() => {
    if (statusDirection !== null) {
      if (!(statusDirection?.design || statusDirection?.frontend || statusDirection?.photo)) {
        navigate("/directions/");
      }
    }
  })

  return (
    <section>
      <Head user={user} />
      <Progress statusDirection={statusDirection} />
    </section>
  )
}

export default Index