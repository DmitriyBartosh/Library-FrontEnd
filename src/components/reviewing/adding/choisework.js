import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStateContext } from "../../../context/ContextProvider";
import { AiOutlineEdit } from "react-icons/ai";
import Selectwork from "./selectwork";
import * as styles from "./choisework.module.scss";

function Choisework({
  selectedDirection,
  selected,
  setSelected,
  choiseExpert,
  setChoiseExpert,
  directionData,
}) {
  const { works, reviews } = useStateContext();

  const addWork = (id, theme) => {
    const newWork = { id: id, theme: theme };

    const isAdded = selected.some((item) => item.id === newWork.id);

    if (isAdded) {
      const newArray = selected.filter((item) => item.id !== newWork.id);
      setSelected(newArray);
    } else {
      setSelected([...selected, newWork]);
    }
  };

  console.log(selectedDirection);

  // Отфильтрованные работы не на ревью
  const filteredWorks = works.filter(
    (work) => !reviews.some((review) => review.work_id === work.id)
  );

  // Отфильтрованные работы не на ревью и с выбранным направлением из selectedDirection
  const workList = filteredWorks.filter(
    (work) => work.direction === selectedDirection
  );

  // Заголовок для работы с направлением
  const title = directionData.find(
    (item) => item.node.slug === selectedDirection
  ).node.title;

  return (
    <div className={styles.container}>
      <div className={styles.works}>
        <div className={styles.head}>
          <div className={styles.title}>
            <AnimatePresence initial={false} mode="wait">
              {choiseExpert ? (
                <motion.h5
                  key="choiseworktitleone"
                  initial={{ y: "2rem" }}
                  animate={{ y: "0rem" }}
                  exit={{
                    y: "2rem",
                    transition: { delay: 0.4, duration: 0.6 },
                  }}
                  transition={{ ease: [0.15, 0.51, 0.5, 0.94], duration: 0.6 }}
                >
                  Работы на рецензирование
                </motion.h5>
              ) : (
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
              )}
            </AnimatePresence>
          </div>

          <motion.p
            animate={{ opacity: choiseExpert ? 0 : 1 }}
            className={styles.subtitle}
          >
            Выберите работы для рецензирования
          </motion.p>
        </div>

        <div className={styles.list}>
          <div className={styles.theme}>
            <AnimatePresence initial={false} mode="popLayout">
              {!choiseExpert && (
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

            <div className={styles.item}>
              {workList.map((item) => {
                const isChecked = selected.some(
                  (selectwork) => selectwork.id === item.id
                );

                return (
                  <Selectwork
                    data={item}
                    addWork={addWork}
                    isChecked={isChecked}
                    key={`design_work_${item.id}`}
                    choiseExpert={choiseExpert}
                  />
                );
              })}
            </div>
          </div>

          <AnimatePresence initial={false}>
            {choiseExpert && (
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
                className={styles.edit}
                onClick={() => setChoiseExpert(false)}
              >
                <p className={styles.text}>Изменить</p>
                <div className={styles.icon}>
                  <AiOutlineEdit className={styles.svg} />
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Choisework;
