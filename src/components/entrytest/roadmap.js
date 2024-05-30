import React from "react";
import cx from "classname";
import { IoCloseSharp } from "react-icons/io5";

import * as styles from "./roadmap.module.scss";
import * as global from "../../styles/base/global.module.scss";

function Roadmap({ link, close }) {
  console.log(link);
  return (
    <div className={styles.container}>
      <button
        className={cx(global.buttoncenter, global.buttongreen, styles.close)}
        onClick={close}
      >
        <p className={global.text}>Закрыть</p>
        <IoCloseSharp className={global.icon} />
      </button>
      <div className={styles.content}>
        <iframe
          style={{ overflow: "hidden" }}
          title="Дорожная карта"
          scrolling="yes"
          src={link}
        />
      </div>
    </div>
  );
}

export default Roadmap;
