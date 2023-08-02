import React from 'react'

import * as styles from './adminpanel.module.scss'
import Theme from './theme'
import Profile from './profile'

function DesignExpert() {

  return (
    <div className={styles.container}>
      <Profile />
      <Theme />

    </div>
  )
}

export default DesignExpert