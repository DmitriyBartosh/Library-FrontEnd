import React from 'react'
import { IoAddOutline, IoCreateOutline } from "react-icons/io5";

import * as styles from './button.module.scss'

function Button({ isExpert, openModal }) {

  return isExpert ?
    <button className={styles.edit} onClick={() => openModal()}>
      <div className={styles.icon}>
        <IoCreateOutline className={styles.svg} />
      </div>
      <p className={styles.text}>Редактировать</p>
    </button>
    :
    <button className={styles.add} onClick={() => openModal()}>
      <div className={styles.icon}>
        <IoAddOutline className={styles.svg} />
      </div>
      <p className={styles.text}>Добавить</p>
    </button>



}

export default Button