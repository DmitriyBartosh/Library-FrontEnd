import React from "react";
import { useStateContext } from "../../context/ContextProvider";
import Linkwork from "./linkwork";

import * as styles from "./works.module.scss";

function Protfolio() {
  const { works } = useStateContext();

  return (
    <div className={styles.container}>
      <h1>Все работы</h1>
      <div className={styles.works}>
        {works?.map((item, index) => {
          return <Linkwork data={item} index={index} key={`link_${index}`} />;
        })}
      </div>
    </div>
  );
}

export default Protfolio;
