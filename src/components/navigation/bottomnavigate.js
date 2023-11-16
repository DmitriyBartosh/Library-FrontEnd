import React from "react";
import { Link } from "gatsby";
import cx from "classname";
import {
  IoAddSharp,
  IoArrowBackSharp,
  IoHeartOutline,
  IoChatbubbleOutline,
  IoCreateOutline,
} from "react-icons/io5";

import * as styles from "./mobilenav.module.scss";

function Bottomnavigate({ addWork, thereIsWork, backLink }) {
  const isStandalone = window.navigator.standalone;

  return (
    <nav className={cx(styles.bottom, isStandalone && styles.standalone)}>
      <div className={styles.block}>
        <Link to={backLink} className={styles.button}>
          <IoArrowBackSharp className={styles.icon} />
        </Link>
      </div>
      <div className={styles.block}>
        <button className={styles.button}>
          <IoHeartOutline className={styles.icon} />
        </button>
        <button className={styles.button}>
          <IoChatbubbleOutline className={styles.icon} />
        </button>

        <button className={styles.addwork} onClick={addWork}>
          {thereIsWork ? (
            <>
              <p className={styles.text}>Изменить ссылку</p>
              <IoCreateOutline className={styles.icon} />
            </>
          ) : (
            <>
              <p className={styles.text}>Добавить работу</p>
              <IoAddSharp className={styles.icon} />
            </>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Bottomnavigate;
