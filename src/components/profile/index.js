import React from 'react'
import { navigate } from 'gatsby';
import { useStateContext } from '../../context/ContextProvider'
import Head from './head';

import Progress from './progress';

function Index() {
  const { user, statusDirection } = useStateContext();

  if (!(statusDirection?.design || statusDirection?.frontend || statusDirection?.photo)) {
    navigate("/directions");
    return null;
  }

  return (
    <section>
      <Head user={user} />
      <Progress statusDirection={statusDirection} />
    </section>
  )
}

export default Index