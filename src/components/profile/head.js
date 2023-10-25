import React from "react";
import cx from "classname";
import Info from "./info";

import * as global from "../../styles/base/global.module.scss";
import * as styles from "./head.module.scss";
import { Link } from "gatsby";

function Head() {
  return (
    <div className={global.container}>
      <div className={styles.container}>
        <Info />
        <div className={styles.promocode}>
          <Link to="/promocode" className={styles.link}>
            <p className={styles.title}>Активировать</p>
            <p>Промокод</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Head;
