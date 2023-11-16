import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import cx from "classname";
import Profile from "./profile";
import * as styles from "./experts.module.scss";

function Expert({ review, setReview, allExpertQuery }) {
  const offlineExpert =
    allExpertQuery.isSuccess &&
    allExpertQuery.data.experts.filter((item) => !item.status).length > 0;
  const onlineExpert =
    allExpertQuery.isSuccess &&
    allExpertQuery.data.experts.filter((item) => item.status).length > 0;

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {review.select === "expert" && (
        <div className={styles.container} key="expertlist">
          <div className={styles.head}>
            <h5 className={styles.title}>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.4, duration: 0.5 },
                }}
                exit={{ opacity: 0, transition: { duration: 0 } }}
                key="experttitle"
              >
                Кто проверит?
              </motion.span>
            </h5>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.45, duration: 0.3 },
              }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              key="expertdescription"
              className={styles.description}
            >
              <p>
                <span>Знакомься</span> с нашими экспертами{" "}
                <span>нажав на фото</span> и выбирай кому хочешь отдать работу
                на рецензию.
              </p>
              <p>
                Прежде чем перейти к оплате, <span>эксперт проверит</span>{" "}
                правильно ли ты понял наше техническое задани и{" "}
                <span>выполнил работу в полной мере</span>.
              </p>
              <p>
                Мы не затягиваем с проверкой работ, поэтому рецензия работ{" "}
                <span>будет готова в течении трех дней!</span> Если вдруг
                опаздаем, сделаем рецензию бесплатно.
              </p>
            </motion.div>
          </div>

          {onlineExpert && (
            <div className={styles.block}>
              <motion.h6
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.45, duration: 0.5 },
                }}
                exit={{ opacity: 0, transition: { duration: 0 } }}
                key="checkactiveexpert"
              >
                Список экспертов
              </motion.h6>
              <div className={styles.list}>
                {allExpertQuery.isSuccess &&
                  allExpertQuery.data.experts
                    .filter((item) => item.status === true)
                    .map((item, index) => {
                      return (
                        <Profile
                          data={item}
                          setReview={setReview}
                          review={review}
                          index={index}
                          key={`expert_${index}`}
                        />
                      );
                    })}
              </div>
            </div>
          )}

          {offlineExpert && (
            <div className={cx(styles.block, styles.offlinetitle)}>
              {onlineExpert ? (
                <motion.h6
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: 0.6, duration: 0.5 },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0 } }}
                  key="checknonactiveexpert"
                >
                  Скоро вернутся
                </motion.h6>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: 0.45, duration: 0.5 },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0 } }}
                  key="noctiveexpert"
                  className={styles.noactiveexpert}
                >
                  <h6>Все эксперты заняты</h6>
                  <p>
                    В данный момент все эксперты заняты. В каждом профиле есть
                    дата, после которой эксперт будет снова доступен.
                  </p>
                </motion.div>
              )}

              <div className={styles.list}>
                {allExpertQuery.data.experts
                  .filter((item) => item.status === false)
                  .map((item, index) => {
                    return (
                      <Profile
                        data={item}
                        setReview={setReview}
                        review={review}
                        index={index}
                        key={`expert_${index}`}
                      />
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}

export default Expert;
