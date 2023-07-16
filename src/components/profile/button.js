import React from 'react';
import { Link } from 'gatsby';
import { IoArrowForwardSharp } from "react-icons/io5";
import cx from 'classname'
import * as styles from './button.module.scss';

function Button({ isActive, item, setSelected, link }) {
  const { title } = item;

  return (
    <div className={cx(styles.container, isActive && styles.active)}>

      <button className={styles.detail} onClick={() => setSelected(item)}>
        <p className={styles.text}>{title}</p>
      </button>

      <Link to={link} className={styles.link}>
        <p className={styles.text}>Открыть</p>
        <IoArrowForwardSharp className={styles.icon} />
      </Link>

    </div>
  )
}

export default Button