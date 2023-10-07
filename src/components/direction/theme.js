import React from "react";
import * as styles from "./theme.module.scss";

function Theme({ openDetail, title, description, icon }) {
  console.log(`../../images/direction/${icon}`);
  const Component = React.lazy(() => import(`../../images/direction/${icon}`));
  return (
    <button onClick={openDetail} className={styles.container}>
      <p className={styles.subscribe}>По подписке</p>
      <div className={styles.preview}>
        <React.Suspense>
          <Component className={styles.icon} />
        </React.Suspense>
      </div>
      <div className={styles.head}>
        <p className={styles.description}>{description}</p>
        <p className={styles.title}>{title}</p>
      </div>
      <div className={styles.footer}>
        <div className={styles.line} />
        <p className={styles.text}>Необходимы базовые навыки программ</p>
      </div>
    </button>
  );
}

export default Theme;
