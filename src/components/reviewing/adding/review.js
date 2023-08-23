import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby';
import { useStateContext } from '../../../context/ContextProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation, useQuery } from '@tanstack/react-query';

import { getAllDesignExperts } from '../../../functions/user';
import { addWorkToReview } from '../../../functions/review';

import Choisework from './choisework';
import Experts from './experts';
import Nextstep from './nextstep';

import * as styles from './review.module.scss'

function Review() {
  const { token, showReview, setShowReview } = useStateContext();

  const [selected, setSelected] = useState([])
  const [expert, setExpert] = useState(null)
  const [choiseExpert, setChoiseExpert] = useState(false);

  const designQuery = useStaticQuery(graphql`
  query {
    directionsJson(title: {eq: "Графический дизайн"}) {
      works {
        slug
        title
      }
    }
  }
`)

  const design = designQuery.directionsJson.works;

  const allDesignExpertQuery = useQuery({
    queryKey: ["alldesignexperts"],
    queryFn: getAllDesignExperts,
    enabled: !!token
  })

  const addWorkToReviewMutation = useMutation({
    mutationFn: addWorkToReview,
  })

  const nextStep = () => {
    if (choiseExpert) {
      addWorkToReviewMutation.mutate({
        expert_id: expert,
        works: selected
      })
    } else {
      setChoiseExpert(true);
    }
  }

  return (
    <AnimatePresence initial={false}>
      {showReview &&
        <div className={styles.container}>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%', transition: { duration: 0.6 } }}
            exit={{ x: '100%', transition: { duration: 0.4 } }}
            transition={{ ease: [0.57, 0.14, 0.49, 0.91] }}
            className={styles.steps}>
            <Choisework design={design} selected={selected} setSelected={setSelected} choiseExpert={choiseExpert} setChoiseExpert={setChoiseExpert} />
            <Experts allDesignExpertQuery={allDesignExpertQuery} expert={expert} setExpert={setExpert} choiseExpert={choiseExpert} />
            <Nextstep choiseExpert={choiseExpert} selected={selected} expert={expert} nextStep={nextStep} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.background}
            onClick={() => setShowReview(false)} />
        </div>
      }
    </AnimatePresence>
  )
}

export default Review