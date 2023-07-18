import React from 'react'
import cx from 'classname'
import { motion } from 'framer-motion'
import * as styles from './toggle.module.scss';

function Toggle({ portfolioMode, setPortfolioMode }) {

  return (
    <div className={styles.container}>
      <button className={cx(styles.block, !portfolioMode && styles.active)} onClick={() => setPortfolioMode(false)}>
        <p className={styles.text}>Классический вид</p>
      </button>
      <button className={styles.button} data-portofio={portfolioMode} onClick={() => setPortfolioMode(!portfolioMode)}>
        <motion.div
          className={styles.handle}
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }} />
      </button>
      <button className={cx(styles.block, portfolioMode && styles.active)} onClick={() => setPortfolioMode(true)}>
        <p className={styles.text}>Портфолио</p>
      </button>
    </div>
  )
}

export default Toggle