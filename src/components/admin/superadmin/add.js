import React, { useState } from 'react'
import cx from 'classname'
import { motion } from 'framer-motion';
import { IoAddOutline, IoSyncOutline } from "react-icons/io5";

import * as styles from './button.module.scss'

function Add({ action, id }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button className={cx(styles.add, isLoading && styles.loading)} onClick={() => {
      setIsLoading(true);
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
          <IoAddOutline className={styles.svg} />
        </div>
      }
      <p className={styles.text}>{isLoading ? "Добавление" : "Добавить"}</p>
    </button>
  )
}

export default Add