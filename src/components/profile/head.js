import React from "react";
import Info from "./info";

import * as styles from "./head.module.scss";
import { Link } from "gatsby";

function Head() {
  return (
    <div className={styles.container}>
      <Info />
      <div className={styles.promocode}>
        <Link to="/promocode" className={styles.link}>
          <p className={styles.title}>Активировать</p>
          <p>Промокод</p>
        </Link>
      </div>
    </div>
  );
}

export default Head;
