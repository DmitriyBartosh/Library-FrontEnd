import React, { useState } from 'react'
import { navigate } from 'gatsby';
import { useStateContext } from '../../context/ContextProvider'
import Head from './head';

import Progress from './progress';
import { useEffectOnce } from 'react-use';
import Copy from './copy';

function Index() {
  const { user, statusDirection } = useStateContext();

  const [isCopied, setIsCopied] = useState(false);

  const copiedLink = (link) => {
    setIsCopied(true);
    navigator.clipboard.writeText(link);
    setTimeout(() => {
      setIsCopied(false);
    }, 800);
  }

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
      <Progress statusDirection={statusDirection} copiedLink={copiedLink} />
      <Copy isCopied={isCopied} />
    </section>
  )
}

export default Index