import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IoCheckmarkSharp } from 'react-icons/io5'
import cx from 'classname'
import * as styles from './selectwork.module.scss'

function Selectwork({ data, addWork, choiseExpert, isChecked }) {
  const { id, theme, name } = data;

  return <AnimatePresence initial={false} mode='popLayout'>
    {(!choiseExpert || isChecked) &&
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.49, 0.22, 0.27, 0.88] }}
        layout='position'
        className={cx(styles.container, isChecked && styles.checked, choiseExpert && styles.cursor)}
        onClick={() => addWork(id, theme)}
        disabled={choiseExpert}>
        <div className={styles.check}>
          <IoCheckmarkSharp className={styles.icon} />
        </div>
        <p className={styles.name}>{name}</p>
      </motion.button>
    }
  </AnimatePresence>

}

export default Selectwork