import React from "react";
import Info from "./info";

import * as styles from "./head.module.scss";

function Head() {
  return (
    <div className={styles.container}>
      <Info />
    </div>
  );
}

export default Head;
