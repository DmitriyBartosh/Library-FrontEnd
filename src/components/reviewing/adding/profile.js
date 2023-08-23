import React from 'react'
import cx from 'classname'
import { motion } from 'framer-motion'
import * as styles from './profile.module.scss'

function Profile({ data, index, setExpert, expert }) {
  const { name, settings } = data;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 + index * 15 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.3 + index * 0.1, duration: 0.4 } }}
      disabled={!settings.status}
      onClick={() => setExpert(data.id)}
      className={cx(styles.container, !settings.status && styles.offline, data.id === expert && styles.selected)}>
      <div className={styles.avatar}>
        <img src={`${process.env.GATSBY_API_BASE_URL}${settings.avatar}`} className={styles.image} />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>
          <p>{name}</p>
        </div>
        {settings.status ?
          <div className={styles.status}>
            <p>Доступен для проверки</p>
          </div>
          :
          <div className={styles.status}>
            <p>Вернется: <span>{settings.backtowork}</span></p>
          </div>
        }
      </div>
    </motion.button>
  )
}

export default Profile