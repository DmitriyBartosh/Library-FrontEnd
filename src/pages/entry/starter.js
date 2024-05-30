import React from "react";

import * as styles from "../../styles/pages/entrytest.module.scss";

function Starter() {
  return (
    <div>
      <div className={styles.info}>
        <h5 className={styles.title}>DesignStarter</h5>
        <p>
          Подробно опишем последовательность шагов, выполнив которые ты создашь
          первые работы, близкие к профессиональному уровню. Когда будешь готов,
          мы проведем DesignReview 360° для этих работ и поможем определить
          дальнейший путь развития.
        </p>
      </div>
    </div>
  );
}

export default Starter;
