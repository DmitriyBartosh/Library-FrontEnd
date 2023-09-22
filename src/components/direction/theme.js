import React from "react";
import * as styles from "./theme.module.scss";

function Theme({ openDetail, title, description }) {
  return (
    <button onClick={openDetail} className={styles.container}>
      <div className={styles.head}>
        <p className={styles.description}>{description} / </p>
        <p className={styles.title}>{title}</p>
      </div>
      <div className={styles.preview}></div>
      <div className={styles.subscription}>
        <p>По подписке</p>
      </div>
    </button>
  );
}

export default Theme;
