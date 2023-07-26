import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoTextSharp } from "react-icons/io5";
import * as styles from './settings.module.scss'

function Settings() {
  const [visible, setVisible] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.fontsize}>
        <AnimatePresence>
          {visible &&
            <div className={styles.size}>
              <button className={styles.small}>
                <IoTextSharp className={styles.icon} />
              </button>
              <button className={styles.medium}>
                <IoTextSharp className={styles.icon} />
              </button>
              <button className={styles.big}>
                <IoTextSharp className={styles.icon} />
              </button>
            </div>
          }
        </AnimatePresence>
        <button className={styles.toggle} onClick={() => setVisible(!visible)}>
          <IoTextSharp className={styles.icon} />
        </button>
      </div>


    </div>
  )
}

export default Settings