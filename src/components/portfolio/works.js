import React from "react";
import { useStateContext } from "../../context/ContextProvider";
import Linkwork from "./linkwork";

import * as styles from "./works.module.scss";
import * as global from "../../styles/base/global.module.scss";

function Protfolio() {
  const { works } = useStateContext();

  return (
    <div className={global.container}>
      <div className={styles.container}>
        <h3>Все работы</h3>
        <div className={styles.works}>
          {works?.map((item, index) => {
            return <Linkwork data={item} index={index} key={`link_${index}`} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Protfolio;
