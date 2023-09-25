import React from 'react'
import cx from 'classname'
import { IoListSharp, IoAppsSharp } from "react-icons/io5";
import { motion } from 'framer-motion'
import * as styles from './toggle.module.scss';

function Toggle({ portfolioMode, setPortfolioMode }) {

  return (
    <div className={styles.container}>
      <button className={cx(styles.block, !portfolioMode && styles.active)} onClick={() => setPortfolioMode(false)}>
        <IoListSharp className={styles.icon} />
      </button>
      <button className={styles.button} data-portofio={portfolioMode} onClick={() => setPortfolioMode(!portfolioMode)}>
        <motion.div
          className={styles.handle}
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }} />
      </button>
      <button className={cx(styles.block, portfolioMode && styles.active)} onClick={() => setPortfolioMode(true)}>
        <IoAppsSharp className={styles.icon} />
      </button>
    </div>
  )
}

export default Toggle