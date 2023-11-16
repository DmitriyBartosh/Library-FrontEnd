import React from "react";
import * as styles from "./linkwork.module.scss";

function Linkwork({ item, user }) {
  const { link, name } = item;

  return (
    <a className={styles.container} href={link} target="_blank">
      <p className={styles.theme}>{name}</p>
      <p className={styles.name}>{user.name}</p>
      <div className={styles.link}>{link}</div>
    </a>
  );
}

export default Linkwork;
