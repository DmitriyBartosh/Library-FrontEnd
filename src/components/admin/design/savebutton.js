import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoSyncOutline, IoCheckmarkSharp } from "react-icons/io5";

import * as styles from './savebutton.module.scss'

function Savebutton({ action, user, price }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button
      className={styles.container}
      disabled={isLoading}
      onClick={() => {
        setIsLoading(true);
        action.mutate({
          user: user,
          price: price
        })
      }}
    >
      <p className={styles.text}>Сохранить изменения</p>
      {isLoading ?
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.25, repeat: Infinity }}
          className={styles.icon}>
          <IoSyncOutline className={styles.load} />
        </motion.div>
        :
        <div className={styles.icon}>
          <IoCheckmarkSharp className={styles.svg} />
        </div>
      }

    </button>
  )
}

export default Savebutton