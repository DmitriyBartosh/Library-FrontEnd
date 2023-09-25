import React from "react";
import cx from "classname";
import { useStateContext } from "../../../context/ContextProvider";
import { IoArrowForwardSharp } from "react-icons/io5";
import Work from "./work";

import * as styles from "./reviewstatus.module.scss";
import * as global from "../../../styles/base/global.module.scss";

function Reviewstatus() {
  const { reviews } = useStateContext();

  console.log(reviews);

  return (
    <div className={global.container}>
      <div className={styles.container}>
        <h3>Рецензии от экспертов</h3>
        <div className={styles.works}>
          {reviews?.map((item, index) => {
            return <Work data={item} key={`reviewwork_${index}`} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Reviewstatus;
