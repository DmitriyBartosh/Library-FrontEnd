import React from 'react'
import { motion } from 'framer-motion'
import { IoArrowForwardSharp } from 'react-icons/io5'
import * as styles from './nextstep.module.scss'

function Nextstep({ choiseExpert, selected, expert, nextStep }) {
  const isChoise = (selected.length === 0 && !choiseExpert) || (expert === null && choiseExpert)

  return (
    <motion.div
      layout='position'
      transition={{
        delay: choiseExpert ? 0.15 : 0,
        duration: 0.5,
        ease: [0.49, 0.22, 0.27, 0.88]
      }}
      className={styles.container}>
      <button className={isChoise ? styles.chois : styles.button} onClick={() => nextStep()}>
        {isChoise ?
          <p className={styles.text}>Выберите</p>
          :
          <p className={styles.text}>Продолжить</p>
        }
        <motion.div animate={{ rotate: isChoise ? -90 : 0, transition: { duration: 0.6, ease: [0.49, 0.22, 0.27, 0.88] } }} className={styles.icon}>
          <IoArrowForwardSharp className={styles.svg} />
        </motion.div>
      </button>
    </motion.div>
  )
}

export default Nextstep