import React from 'react'
import cx from 'classname'
import * as styles from './head.module.scss'
import * as global from '../../styles/base/global.module.scss'
import { Link } from 'gatsby'

function Head({ user }) {
  return (
    <div className={cx(styles.container, global.container)}>
      <div className={styles.info}>
        <div className={styles.avatar}>
          <p>ДБ</p>
        </div>
        <div className={styles.name}>
          <h3>{JSON.parse(user)?.name}</h3>
          <p>{JSON.parse(user)?.email}</p>
        </div>
      </div>
      <Link to='/subscription' className={styles.subscription}>
        <h4>Оформить подписку</h4>
        <p>Пока у вас нет доступа к самым интересным заданиям</p>
      </Link>
    </div>



  )
}

export default Head