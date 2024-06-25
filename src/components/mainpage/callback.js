import React from "react";
import cx from "classname";
import { Link } from "gatsby";
import { useStateContext } from "../../context/ContextProvider";
import Birdonbranch from "../../images/svg/birdonbranch";

import * as global from "../../styles/base/global.module.scss";
import * as styles from "./callback.module.scss";

function Callback() {
  const { isLoggedIn } = useStateContext();

  return (
    <>
      <section className={styles.join}>
        <div className={cx(styles.block, global.container)}>
          <h2>
            Пройди DesignReview 360°
            <br /> и получи обратную связь
            <br /> от практикующих дизайнеров <br />
            <a
              href="https://heycoddes.ru"
              target="_blank"
              rel="noreferrer"
              className={styles.heycoddes}
            >
              Веб студии Hey, Coddes
            </a>
          </h2>
          <div className={styles.action}>
            <Link
              to={isLoggedIn() ? "/portfolio" : "/auth"}
              className={cx(global.buttontext, styles.buttonwhite)}
            >
              <p className={global.text}>
                {isLoggedIn()
                  ? "Перейти в Мое портфолио"
                  : "Присоединиться к Графикси"}
              </p>
            </Link>
            <Birdonbranch className={styles.bird} />
          </div>
        </div>
      </section>
      <section className={cx(styles.form, global.container)}>
        <div className={styles.block}>
          <p>
            <span>Задать вопросы</span>
          </p>
          <p>Мы всегда на связи</p>
        </div>
        <div className={styles.input}>
          <a
            href="https://vk.com/graphiksi"
            target="_blank"
            rel="noreferrer"
            className={cx(global.buttontext, styles.buttontransparent)}
          >
            <p className={global.text}>Написать в ВК</p>
          </a>
          <a
            href="https://t.me/KateShmidt"
            target="_blank"
            rel="noreferrer"
            className={cx(global.buttontext, styles.buttonblack)}
          >
            <p className={global.text}>Написать в Telegram</p>
          </a>
        </div>
      </section>
    </>
  );
}

export default Callback;
