import React from 'react'
import cx from 'classname'
import { AnimatePresence, motion } from 'framer-motion'
import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";
import * as styles from './toggle.module.scss';

function Toggle({ user, setUser }) {

  return (
    <button
      className={cx(styles.toggle, user.status && styles.active)}
      onClick={() => setUser({ ...user, status: !user.status })}>
      <motion.div layout='position' className={styles.label}>
        {user.status ?
          <p>Принимать</p>
          :
          <p>Не принимать</p>
        }
      </motion.div>
      <motion.div
        layout='position'
        className={styles.handle}>
        {user.status ?
          <IoCheckmarkSharp className={styles.icon} />
          :
          <IoCloseSharp className={styles.icon} />
        }
      </motion.div>
    </button>
  )
}

export default Toggle