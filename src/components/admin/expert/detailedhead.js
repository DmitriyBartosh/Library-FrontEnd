import React from "react";
import * as styles from "./detailedhead.module.scss";

function Detailedhead({ data, link }) {
  return (
    <div className={styles.container}>
      <a
        href={link ? link : data.work.link}
        target="_blank"
        rel="noreferrer"
        className={styles.link}
      >
        {data.work.name}
      </a>
      <p className={styles.name}>
        Работа от <span>{data.user.name}</span>
      </p>
      <a href={`mailto:${data.user.email}`} className={styles.mail}>
        {data.user.email}
      </a>
    </div>
  );
}

export default Detailedhead;
