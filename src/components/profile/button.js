import React from 'react';
import { Link } from 'gatsby';
import { IoArrowForwardSharp } from "react-icons/io5";
import cx from 'classname'
import * as styles from './button.module.scss';

function Button({ isActive, item, setSelected, link }) {
  const { title } = item;

  return (
    <div className={cx(styles.container, isActive && styles.active)}>

      <button
        initial={{ background: "#f3eee1", color: "#43702c" }}
        animate={{
          background: isActive ? "#43702c" : "#f3eee1",
          color: isActive ? "#ffffff" : "#43702c"
        }}
        className={styles.detail}
        onClick={() => setSelected(item)}>
        <p className={styles.text}>{title}</p>
      </button>

      <Link
        animate={{ width: isActive ? 125 : 0 }}
        to={link}
        className={styles.link}
      >
        <p
          initial={{ x: -25, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.15 } }}
          exit={{ x: -15, opacity: 0 }}
          className={styles.text}
        >
          Начать
        </p>

        <IoArrowForwardSharp className={styles.icon} />
      </Link>

    </div>
  )
}

export default Button