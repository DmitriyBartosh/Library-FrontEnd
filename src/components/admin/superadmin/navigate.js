import React from "react";
import cx from "classname";
import { Link } from "gatsby";

import * as styles from "../../../styles/pages/god.module.scss";
import * as global from "../../../styles/base/global.module.scss";

function Navigate() {
  return (
    <nav className={styles.navigate}>
      <Link
        to="/god"
        className={cx(global.buttontext, styles.button)}
        activeClassName={styles.active}
      >
        <p className={global.text}>Пользователи</p>
      </Link>
      <Link
        to="/god/promo"
        className={cx(global.buttontext, styles.button)}
        activeClassName={styles.active}
      >
        <p className={global.text}>Промокоды</p>
      </Link>
      <Link
        to="/god/entrytest"
        className={cx(global.buttontext, styles.button)}
        activeClassName={styles.active}
      >
        <p className={global.text}>Тестирование 360</p>
      </Link>
    </nav>
  );
}

export default Navigate;
