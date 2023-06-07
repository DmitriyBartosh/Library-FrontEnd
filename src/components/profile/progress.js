import React from 'react'
import cx from 'classname'
import { IoGameControllerOutline } from "react-icons/io5";
import * as styles from './progress.module.scss'
import * as global from '../../styles/base/global.module.scss'

function Progress() {
  const AchievementComplete = new Array(15).fill({ name: 'Достижение' });

  const AchievementOther = new Array(15).fill({ name: 'Достижение' });

  return (
    <div className={styles.container}>
      <div className={cx(styles.info, global.container)}>
        <h4>Прогресс</h4>
        <div className={styles.achievement}>
          {AchievementComplete.map((item, index) => {
            return <div className={cx(styles.item, styles.active)} key={index}>
              <IoGameControllerOutline className={styles.icon} />
              <p className={styles.name}>{item.name}</p>
              <p className={styles.complete}>Выполнено</p>
            </div>
          })}
          {AchievementOther.map((item, index) => {
            return <div className={cx(styles.item, styles.disable)} key={index}>
              <IoGameControllerOutline className={styles.icon} />
              <p className={styles.name}>{item.name}</p>
              <p className={styles.complete}>В процессе</p>
            </div>
          })}
        </div>
      </div>

    </div>
  )
}

export default Progress