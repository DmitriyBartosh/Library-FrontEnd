import React from 'react'
import { IoChevronForwardSharp } from "react-icons/io5";
import * as styles from './linkwork.module.scss'

function Linkwork({ item, user }) {
  const { link, name } = item;

  return (
    <a className={styles.container} href={link}>
      <div className={styles.text}>
        <p className={styles.name}>{name}</p>
        <p>{user.name}</p>
      </div>
      <IoChevronForwardSharp className={styles.icon} />
    </a>
  )
}

export default Linkwork