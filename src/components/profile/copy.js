import React from 'react'
import * as styles from './copy.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

function Copy({ isCopied }) {



  return <AnimatePresence>
    {isCopied &&
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.7, 0.58, 1] } }}
        exit={{ opacity: 0 }}
        className={styles.container}>
        <div
          className={styles.message}>
          <p className={styles.text}>Ссылка скопирована</p>
        </div>
      </motion.div>
    }
  </AnimatePresence>
}

export default Copy