import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import Profile from './profile';
import * as styles from './experts.module.scss'

function Expert({ choiseExpert, allExpertQuery, setExpert, expert }) {
  const offlineExpert = allExpertQuery.isSuccess && allExpertQuery.data.experts.filter(item => !item.status).length > 0;
  const onlineExpert = allExpertQuery.isSuccess && allExpertQuery.data.experts.filter(item => item.status).length > 0;

  return (
    <AnimatePresence initial={false} mode='popLayout'>
      {choiseExpert &&
        <div className={styles.container} key='expertlist'>
          <div className={styles.head}>
            <h5 className={styles.title}>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.5 } }}
                exit={{ opacity: 0, transition: { duration: 0 } }}
                key="experttitle"
              >Кто проверит?</motion.span>
            </h5>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.45, duration: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              key="expertdescription"
              className={styles.description}>
              Выберите эксперта которому хотите отправить работу на рецензирование.
            </motion.p>
          </div>

          {onlineExpert &&
            <div className={styles.block}>
              <motion.h6
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.45, duration: 0.5 } }}
                exit={{ opacity: 0, transition: { duration: 0 } }}
                key="checkactiveexpert">
                Активные
              </motion.h6>
              <div className={styles.list}>
                {allExpertQuery.isSuccess && allExpertQuery.data.experts.filter(item => item.status === true).map((item, index) => {
                  return <Profile data={item} setExpert={setExpert} expert={expert} index={index} key={`expert_${index}`} />
                })}
              </div>
            </div>
          }


          {offlineExpert &&
            <div className={styles.block}>
              {onlineExpert ?
                <motion.h6
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.5 } }}
                  exit={{ opacity: 0, transition: { duration: 0 } }}
                  key="checknonactiveexpert">
                  Заняты
                </motion.h6>
                :
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.45, duration: 0.5 } }}
                  exit={{ opacity: 0, transition: { duration: 0 } }}
                  key="noctiveexpert"
                  className={styles.noactiveexpert}>
                  <h6 className={styles.main}>Все эксперты заняты</h6>
                  <p className={styles.second}>В данный момент все эксперты заняты. В каждом профиле есть дата, после которой эксперт будет снова доступен.</p>
                </motion.div>
              }

              <div className={styles.list}>
                {allExpertQuery.data.experts.filter(item => item.status === false).map((item, index) => {
                  return <Profile data={item} setExpert={setExpert} expert={expert} index={index} key={`expert_${index}`} />
                })}
              </div>
            </div>
          }

        </div>
      }
    </AnimatePresence>
  )
}

export default Expert