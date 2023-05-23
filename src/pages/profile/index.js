import React from 'react'
import { useStateContext } from '../../context/ContextProvider'
import * as styles from '../../styles/pages/dashboard.module.scss'

function Index() {
  const { user } = useStateContext();

  return (
    <section className={styles.container}>
      <div className={styles.user}>
        <h3>Личный кабинет</h3>
        <p>{JSON.parse(user).name}</p>
        <p>{JSON.parse(user).email}</p>
      </div>
    </section>
  )
}

export default Index