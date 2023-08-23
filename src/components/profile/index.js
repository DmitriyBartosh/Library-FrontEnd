import React from 'react'
import { navigate } from 'gatsby';
import { checkBooleanObjectKeys } from '../../functions/other';
import { useEffectOnce } from 'react-use';
import { useStateContext } from '../../context/ContextProvider'

import Progress from './progress';
import Head from './head';
import Reviewstatus from '../reviewing/status/reviewstatus';

function Index() {
  const { user, statusDirection } = useStateContext();

  useEffectOnce(() => {
    if (statusDirection === null || !checkBooleanObjectKeys(statusDirection)) {
      navigate("/directions/");
    }
  })

  return (
    <section>
      <Head user={user} />
      <Reviewstatus />
      <Progress statusDirection={statusDirection} />
    </section>
  )
}

export default Index