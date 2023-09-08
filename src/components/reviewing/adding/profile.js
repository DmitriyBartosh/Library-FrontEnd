import React from 'react'
import cx from 'classname'
import { motion } from 'framer-motion'
import { IoPersonCircleOutline } from 'react-icons/io5'
import * as styles from './profile.module.scss'
import { Link } from 'gatsby';

function Profile({ data, index, setExpert, expert }) {
  const { id, price, name, about, status, avatar, backtowork, slug } = data;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 + index * 15 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.3 + index * 0.1, duration: 0.4 } }}
      disabled={!status}
      onClick={() => setExpert({ id: id, price: price })}
      className={cx(styles.container, !status && styles.offline, data.id === expert?.id && styles.selected)}>
      <div className={styles.left}>
        <div className={styles.avatar}>
          <img src={`${process.env.GATSBY_API_BASE_URL}${avatar}`} className={styles.image} />
        </div>
        <Link to={`/expert/${slug}`} className={styles.personpage} target='_blank'>
          <div className={styles.icon}>
            <IoPersonCircleOutline className={styles.svg} />
          </div>
          <p className={styles.text}>@{slug}</p>
        </Link>
      </div>

      <div className={styles.info}>
        <div className={styles.head}>
          <p className={styles.name}>{name}</p>
          <p className={styles.about}>{about}</p>
        </div>
        {status ?
          <div className={styles.status}>
            <p>Доступен для рецензии</p>
          </div>
          :
          <div className={styles.status}>
            <p>Вернется: <span>{backtowork}</span></p>
          </div>
        }
      </div>

    </motion.button>
  )
}

export default Profile