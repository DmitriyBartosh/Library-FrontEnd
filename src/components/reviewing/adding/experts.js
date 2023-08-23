import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import Profile from './profile';
import * as styles from './experts.module.scss'

function Expert({ choiseExpert, allDesignExpertQuery, setExpert, expert }) {


  return (
    <AnimatePresence initial={false} mode='popLayout'>
      {choiseExpert &&
        <div className={styles.container} key='expertlist'>
          <div className={styles.head}>
            <h4 className={styles.title}>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.5 } }}
                exit={{ opacity: 0, transition: { duration: 0 } }}
                key="experttitle"
              >Кто проверит?</motion.span>
            </h4>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.45, duration: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              key="expertdescription"
              className={styles.description}>
              Выберите эксперта которому хотите отправить работу на рецензирование
            </motion.p>
          </div>


          <div className={styles.list}>
            <motion.h6
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.45, duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              key="checkactiveexpert">
              Активные
            </motion.h6>
            {allDesignExpertQuery.isSuccess && allDesignExpertQuery.data.experts.filter(item => item.settings.status === true).map((item, index) => {
              return <Profile data={item} setExpert={setExpert} expert={expert} index={index} key={`expert_${index}`} />
            })}
          </div>

          <div className={styles.list}>
            <motion.h6
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              key="checknonactiveexpert">
              Заняты
            </motion.h6>
            {allDesignExpertQuery.isSuccess && allDesignExpertQuery.data.experts.filter(item => item.settings.status === false).map((item, index) => {
              return <Profile data={item} setExpert={setExpert} expert={expert} index={index} key={`expert_${index}`} />
            })}
          </div>
        </div>
      }
    </AnimatePresence>
  )
}

export default Expert