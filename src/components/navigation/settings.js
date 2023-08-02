import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStateContext } from '../../context/ContextProvider'
import cx from 'classname'
import * as styles from './settings.module.scss'

function Settings() {

  const [visible, setVisible] = useState(false);
  const { fontSize, setFontSize } = useStateContext();

  const isSmall = visible || fontSize === "small";
  const isMedium = visible || fontSize === "medium";
  const isLarge = visible || fontSize === "large";

  function changeFontSize(size) {
    if (visible) {
      setFontSize(size)
      setVisible(false)
    } else {
      setVisible(true)
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.fontsize}>
        <AnimatePresence initial={false}>
          {isSmall &&
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: fontSize === "medium" ? 0.1 : 0.05 } }}
              exit={{ opacity: 0 }}
              layout='position'
              key="smalltext"
              className={cx(styles.small, fontSize === "small" && styles.active)}
              onClick={() => changeFontSize("small")}>
              <p className={styles.text}>Aa</p>
            </motion.button>
          }

          {isMedium &&
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: fontSize === "small" ? 0.3 : 0 } }}
              exit={{ opacity: 0 }}
              layout='position'
              key="mediumtext"
              className={cx(styles.medium, fontSize === "medium" && styles.active)}
              onClick={() => changeFontSize("medium")}>
              <p className={styles.text}>Aa</p>
            </motion.button>
          }

          {isLarge &&
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.25 } }}
              exit={{ opacity: 0 }}
              layout='position'
              key="largetext"
              className={cx(styles.large, fontSize === "large" && styles.active)}
              onClick={() => changeFontSize("large")}>
              <p className={styles.text}>Aa</p>
            </motion.button>
          }
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Settings