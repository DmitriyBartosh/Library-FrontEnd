import React from "react";
import { Link } from "gatsby";
import cx from "classname";
import {
  IoAddSharp,
  IoHomeOutline,
  IoChatbubbleOutline,
  IoCreateOutline,
} from "react-icons/io5";

import * as styles from "./rightnavigate.module.scss";

function Rightnavigate({ addWork, thereIsWork, backLink, openFeetback }) {
  return (
    <nav className={styles.container}>
      <div className={styles.block}>
        <Link to={backLink} className={styles.button}>
          <IoHomeOutline className={styles.icon} />
          <div className={styles.label}>
            <p className={styles.text}>Мое портфолио</p>
          </div>
        </Link>
      </div>
      <div className={styles.block}>
        <button
          className={styles.button}
          onClick={openFeetback}
          aria-label="Обратная связь"
        >
          <IoChatbubbleOutline className={styles.icon} />
          <div className={styles.label}>
            <p className={styles.text}>Обратная связь</p>
          </div>
        </button>

        <button className={cx(styles.button, styles.addwork)} onClick={addWork}>
          {thereIsWork ? (
            <>
              <IoCreateOutline className={styles.icon} />
              <div className={styles.label}>
                <p className={styles.text}>Изменить работу</p>
              </div>
            </>
          ) : (
            <>
              <IoAddSharp className={styles.icon} />
              <div className={styles.label}>
                <p className={styles.text}>Добавить работу</p>
              </div>
            </>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Rightnavigate;
