import React, { useState } from 'react'
import { IoRemoveOutline, IoSyncOutline } from "react-icons/io5";
import cx from 'classname'
import { motion } from 'framer-motion';

import * as styles from './button.module.scss'

function Remove({ action, id }) {
  const [isLoading, setIsLoading] = useState(false)


  return (
    <button className={cx(styles.remove, isLoading && styles.loading)} onClick={() => {
      setIsLoading(true)
      action.mutate({
        id: id,
      })
    }}>
      {isLoading ?
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.25, repeat: Infinity }}
          className={styles.load}>
          <IoSyncOutline className={styles.svg} />
        </motion.div>
        :
        <div className={styles.icon}>
          <IoRemoveOutline className={styles.svg} />
        </div>
      }
      <p className={styles.text}>{isLoading ? "Удаление" : "Удалить"}</p>
    </button>
  )
}

export default Remove