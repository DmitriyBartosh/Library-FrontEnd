import React from "react";
import * as styles from "./detailedhead.module.scss";

function Detailedhead({ data }) {
  return (
    <div className={styles.container}>
      <a
        href={data.link ? data.link : data.work.link}
        target="_blank"
        rel="noreferrer"
        className={styles.link}
      >
        {data.work.name}
      </a>
      <p className={styles.name}>Эксперт / {data.expert.name}</p>
    </div>
  );
}

export default Detailedhead;
