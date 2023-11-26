import React from "react";
import cx from "classname";
import * as styles from "./theme.module.scss";

function Theme({ openDetail, title, description, icon, free }) {
  const Component = React.lazy(() => import(`../../images/direction/${icon}`));
  return (
    <button
      aria-label="Тема"
      onClick={openDetail}
      className={cx(styles.container, free && styles.free)}
    >
      <div className={styles.subscribe}>
        <p>{free ? "Бесплатно" : "Доступно по подписке"}</p>
      </div>
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
