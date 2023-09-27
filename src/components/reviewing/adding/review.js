import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllExperts } from "../../../functions/review";
import { useStateContext } from "../../../context/ContextProvider";
import { addWorkToReview } from "../../../functions/review";

import Choisework from "./choisework";
import Experts from "./experts";
import Nextstep from "./nextstep";

import * as styles from "./review.module.scss";
import Choisedirection from "./choisedirection";

function Review() {
  const { token, works, subscribes, showReview, setShowReview } =
    useStateContext();

  // Выбираем только те направления, в которых активна подписка и добавлена хоть одна работа
  const directionWithWork =
    Array.isArray(subscribes) &&
    subscribes
      ?.filter((item) => item.active)
      .filter((element) => {
        const thereIsJob =
          Array.isArray(works) &&
          works.some((work) => work.direction === element.plan);
        return thereIsJob;
      })
      .map((item) => item.plan);

  const [isComplete, setIsComplete] = useState(false);

  const queryClient = useQueryClient();

  const [selected, setSelected] = useState([]);
  const [expert, setExpert] = useState(null);
  const [choiseExpert, setChoiseExpert] = useState(false);
  const [selectedDirection, setSelectedDirection] = useState(
    directionWithWork[0]
  );
  const [price, setPrice] = useState(0);

  const allExpertQuery = useQuery({
    queryKey: ["allexperts", selectedDirection],
    queryFn: () => getAllExperts(selectedDirection),
    enabled: !!token && selectedDirection !== null,
  });

  const addWorkToReviewMutation = useMutation({
    mutationFn: addWorkToReview,
    onSuccess: () => {
      setIsComplete(true);
      setSelected([]);
      setExpert(null);
      setChoiseExpert(false);
      queryClient.invalidateQueries({ queryKey: ["getAllWorksOnReview"] });
    },
  });

  const nextStep = () => {
    if (choiseExpert) {
      addWorkToReviewMutation.mutate({
        expert_id: expert.id,
        works: selected,
      });
    } else {
      setChoiseExpert(true);
    }
  };

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
  `);

  const directionData = direcionQuery.allDirectionsJson.edges;

  function changeDirection(direction) {
    if (direction !== selectedDirection) {
      setSelectedDirection(direction);
      setSelected([]);
      setExpert(null);
      setChoiseExpert(false);
    }
  }

  useEffect(() => {
    if (expert) {
      var cost = 0;
      for (let index = 0; index < selected.length; index++) {
        cost = cost + parseInt(expert.price[selected[index].theme]);
      }
      setPrice(cost);
    }
  }, [selected, expert]);

  return (
    <AnimatePresence initial={false}>
      {showReview && (
        <div className={styles.container} key="showreview">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%", transition: { duration: 0.6 } }}
            exit={{ x: "100%", transition: { duration: 0.4 } }}
            transition={{ ease: [0.57, 0.14, 0.49, 0.91] }}
            className={styles.block}
          >
            {isComplete ? (
              <div className={styles.complete}>
                <div className={styles.head}>
                  <h5>Работы приняты</h5>
                  <p>
                    Эксперт проверит что ссылка верна и работа выполнена в
                    полной мере, затем на странице профиля будет отображена
                    готовность проверить.
                  </p>
                </div>
                <div className={styles.close}>
                  <button
                    className={styles.button}
                    onClick={() => setShowReview(false)}
                  >
                    <p className={styles.text}>Понятно!</p>
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.steps}>
                <Choisedirection
                  directionWithWork={directionWithWork}
                  changeDirection={changeDirection}
                  directionData={directionData}
                  selectedDirection={selectedDirection}
                />
                <Choisework
                  selectedDirection={selectedDirection}
                  selected={selected}
                  setSelected={setSelected}
                  choiseExpert={choiseExpert}
                  setChoiseExpert={setChoiseExpert}
                  directionData={directionData}
                />
                <Experts
                  allExpertQuery={allExpertQuery}
                  expert={expert}
                  setExpert={setExpert}
                  choiseExpert={choiseExpert}
                />
                <Nextstep
                  addWorkToReviewMutation={addWorkToReviewMutation}
                  choiseExpert={choiseExpert}
                  selected={selected}
                  expert={expert}
                  nextStep={nextStep}
                  price={price}
                />
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.background}
            onClick={() => setShowReview(false)}
          />
        </div>
      )}
    </AnimatePresence>
  );
}

export default Review;
