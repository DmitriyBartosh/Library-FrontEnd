import React from 'react'
import * as styles from './work.module.scss'

function Work({ data }) {
  const { user, work, status } = data;

  const workStatus = {
    'link checking': "В обрбаботке"
  }

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <p>{user.name}</p>
      </div>
      <div className={styles.block}>
        <p>{user.email}</p>
      </div>
      <div className={styles.block}>
        <p>{work.name}</p>
      </div>
      <div className={styles.block}>
        <p>{work.link}</p>
      </div>

      <div className={styles.block}>
        <p>{workStatus[status]}</p>
      </div>
    </div>
  )
}

export default Work