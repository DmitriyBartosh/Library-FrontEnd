import React, { useState } from "react";
import cx from "classname";
import { Link } from "gatsby";
import { useStateContext } from "../../context/ContextProvider";
import Birdonbranch from "../../images/svg/birdonbranch";

import * as global from "../../styles/base/global.module.scss";
import * as styles from "./callback.module.scss";

function Callback() {
  const { isLoggedIn, subscribes } = useStateContext();
  const [phone, setPhone] = useState("");

  const isActiveSubscribe =
    Array.isArray(subscribes) && subscribes.some((item) => item.active);

  return (
    <>
      <section className={styles.join}>
        <div className={cx(styles.block, global.container)}>
          <h2>
            Только проверенная информация без духоты, воды и сложных терминов за
            200₽
          </h2>
          <div className={styles.action}>
            <Link
              to={
                isLoggedIn()
                  ? isActiveSubscribe
                    ? "/portfolio"
                    : "/profile"
                  : "/auth"
              }
              className={cx(global.buttontext, styles.buttonwhite)}
            >
              <p className={global.text}>
                {isLoggedIn()
                  ? "Начать творчество c Графикси"
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
          <input
            placeholder="Номер телефона"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className={cx(global.buttontext, styles.buttonblack)}>
            <p className={global.text}>Отправить</p>
          </button>
        </div>
      </section>
    </>
  );
}

export default Callback;
