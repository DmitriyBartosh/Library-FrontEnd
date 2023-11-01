import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import cx from "classname";
import { useStateContext } from "../../../context/ContextProvider";
import { AiOutlineEdit } from "react-icons/ai";
import Selectwork from "./selectwork";

import * as global from "../../../styles/base/global.module.scss";
import * as styles from "./choisework.module.scss";

function Choisework({ review, setReview, directionData }) {
  const { works, reviews } = useStateContext();

  const addWork = (id, theme) => {
    const newWork = { id: id, theme: theme };

    const isAdded = review.works.some((item) => item.id === newWork.id);

    if (isAdded) {
      const newArray = review.works.filter((item) => item.id !== newWork.id);
      setReview({ ...review, works: newArray });
    } else {
      setReview({ ...review, works: [...review.works, newWork] });
    }
  };

  // Отфильтрованные работы не на ревью
  const filteredWorks = works.filter(
    (work) => !reviews.some((item) => item.work_id === work.id)
  );

  // Отфильтрованные работы не на ревью и с выбранным направлением из selectedDirection
  const workList = filteredWorks.filter(
    (work) => work.direction === review.direction
  );

  // Заголовок для работы с направлением
  const title = directionData.find(
    (item) => item.node.slug === review.direction
  ).node.title;

  return (
    <div className={styles.container}>
      <div className={styles.works}>
        <div className={styles.head}>
          <div className={styles.title}>
            <AnimatePresence initial={false} mode="wait">
              {review.select === "work" ? (
                <motion.h5
                  key="choiseworktitletwo"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  exit={{
                    y: "105%",
                    transition: { delay: 0.4, duration: 0.6 },
                  }}
                  transition={{ ease: [0.15, 0.51, 0.5, 0.94], duration: 0.6 }}
                >
                  Какие работы?
                </motion.h5>
              ) : (
                <motion.h5
                  key="choiseworktitleone"
                  initial={{ y: 50 }}
                  animate={{ y: 0 }}
                  exit={{
                    y: 50,
                    transition: { delay: 0.4, duration: 0.6 },
                  }}
                  transition={{ ease: [0.15, 0.51, 0.5, 0.94], duration: 0.6 }}
                >
                  Работы на рецензирование
                </motion.h5>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence initial={false} mode="popLayout">
            {review.select === "work" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.subtitle}
                key="description_choise_work"
              >
                <p>
                  Выбери <span>одну</span> или <span>несколько работ</span> на
                  рецензию.
                </p>
                <p>
                  Перед тем как <span>отправить работу</span> на рецензию,
                  убедитесь что проверили себя по <span>чек-листу.</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={styles.list}>
          <div className={styles.theme}>
            <AnimatePresence initial={false} mode="popLayout">
              {review.select === "work" && (
                <motion.h6
                  key="themename"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                      duration: 0.3,
                    },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0 } }}
                >
                  {title}
                </motion.h6>
              )}
            </AnimatePresence>

            {workList.length > 0 ? (
              <div className={styles.item}>
                {workList.map((item) => {
                  return (
                    <Selectwork
                      data={item}
                      addWork={addWork}
                      review={review}
                      key={`design_work_${item.id}`}
                    />
                  );
                })}
              </div>
            ) : (
              <div className={styles.item}>
                <p>Все работы проверены.</p>
              </div>
            )}
          </div>

          <AnimatePresence initial={false}>
            {review.select === "expert" && (
              <motion.button
                key="editworkchoise"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 1.2,
                    ease: [0.15, 0.51, 0.5, 0.94],
                    duration: 0.5,
                  },
                }}
                exit={{ opacity: 0, transition: { duration: 0 } }}
                className={cx(global.buttoncenter, styles.edit)}
                onClick={() => setReview({ ...review, select: "work" })}
              >
                <p className={global.text}>Изменить</p>
                <AiOutlineEdit className={global.icon} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Choisework;
