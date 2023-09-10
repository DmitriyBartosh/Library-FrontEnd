import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllExperts } from '../../../functions/review';
import { useStateContext } from '../../../context/ContextProvider';
import { addWorkToReview } from '../../../functions/review';

import Choisework from './choisework';
import Experts from './experts';
import Nextstep from './nextstep';

import * as styles from './review.module.scss'
import Choisedirection from './choisedirection';

function Review() {
  const { token, works, statusDirection, showReview, setShowReview } = useStateContext();

  const [isComplete, setIsComplete] = useState(false);

  const queryClient = useQueryClient();

  const [selected, setSelected] = useState([])
  const [expert, setExpert] = useState(null)
  const [choiseExpert, setChoiseExpert] = useState(false);
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [price, setPrice] = useState(0);

  const [directionWithWork, setDirectionWithWork] = useState([]);

  const allExpertQuery = useQuery({
    queryKey: ["allexperts", selectedDirection?.slug],
    queryFn: () => getAllExperts(selectedDirection?.slug),
    enabled: !!token && selectedDirection !== null
  })

  const addWorkToReviewMutation = useMutation({
    mutationFn: addWorkToReview,
    onSuccess: () => {
      setIsComplete(true);
      setSelected([]);
      setExpert(null);
      setChoiseExpert(false);
      queryClient.invalidateQueries({ queryKey: ['getAllWorksOnReview'] })
    }
  })

  const nextStep = () => {
    if (choiseExpert) {
      addWorkToReviewMutation.mutate({
        expert_id: expert.id,
        works: selected
      })
    } else {
      setChoiseExpert(true);
    }
  }

  const direcionQuery = useStaticQuery(graphql`
  query {
      allDirectionsJson {
        edges {
          node {
            slug
            title
            works {
              slug
              title
            }
          }
        }
      }
    }
  `)

  const directionData = direcionQuery.allDirectionsJson.edges;

  function changeDirection(direction) {
    if (direction.slug !== selectedDirection.slug) {
      setSelectedDirection(direction);
      setSelected([]);
      setExpert(null);
      setChoiseExpert(false);
    }
  }

  useEffect(() => {
    if (statusDirection && works?.length > 0) {
      // Записываем в массив все направления с значением true (Которые выбрал пользователь, для отображения в профиле)
      const active = Object.keys(statusDirection).filter(key => statusDirection[key] === true);
      // Записываем в массив все направления с значением true, в которых есть хоть одна работа на выбор
      const withWorks = active.filter(value => works.some(obj => obj.direction === value));

      setDirectionWithWork(withWorks)

      const onlyDirection = directionData && directionData.find(obj => obj.node.slug === withWorks[0]).node;
      setSelectedDirection(onlyDirection);
    }
  }, [statusDirection, works])

  useEffect(() => {
    if (expert) {
      var cost = 0;
      for (let index = 0; index < selected.length; index++) {
        cost = cost + parseInt(expert.price[selected[index].theme]);
      }
      setPrice(cost);
    }

  }, [selected, expert])


  return (
    <AnimatePresence initial={false}>
      {showReview &&
        <div className={styles.container} key="showreview">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%', transition: { duration: 0.6 } }}
            exit={{ x: '100%', transition: { duration: 0.4 } }}
            transition={{ ease: [0.57, 0.14, 0.49, 0.91] }}
            className={styles.block}>
            {isComplete ?
              <div className={styles.complete}>
                <div className={styles.head}>
                  <h5>Работы приняты</h5>
                  <p>Эксперт проверит что ссылка верна и работа выполнена в полной мере, затем на странице профиля будет отображена готовность проверить.</p>
                </div>
                <div className={styles.close}>
                  <button className={styles.button} onClick={() => setShowReview(false)}>
                    <p className={styles.text}>Понятно!</p>
                  </button>
                </div>
              </div>
              :
              <div className={styles.steps}>
                <Choisedirection
                  directionWithWork={directionWithWork}
                  changeDirection={changeDirection}
                  directionData={directionData}
                  selectedDirection={selectedDirection} />
                <Choisework
                  selectedDirection={selectedDirection}
                  selected={selected}
                  setSelected={setSelected}
                  choiseExpert={choiseExpert}
                  setChoiseExpert={setChoiseExpert} />
                <Experts
                  allExpertQuery={allExpertQuery}
                  expert={expert}
                  setExpert={setExpert}
                  choiseExpert={choiseExpert} />
                <Nextstep
                  addWorkToReviewMutation={addWorkToReviewMutation}
                  choiseExpert={choiseExpert}
                  selected={selected}
                  expert={expert}
                  nextStep={nextStep}
                  price={price} />
              </div>
            }

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