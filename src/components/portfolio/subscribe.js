import React from 'react'
import { IoCheckmarkSharp } from "react-icons/io5";
import * as styles from './subscribe.module.scss'

function Subscribe({ status }) {
  return (
    <div className={styles.container}>
      {status ?
        <div className={styles.info}>
          <p className={styles.text}>
            Подписка <span>активна</span><br />
            до <span>5 июня</span>
          </p>
          <div className={styles.button}>
            <IoCheckmarkSharp className={styles.icon} />
          </div>

        </div>
        :
        <button className={styles.add}>
          <p>Оформить подписку</p>
        </button>
      }
    </div>
  )
}

export default Subscribe