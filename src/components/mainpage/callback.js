import React, { useState } from "react";
import cx from "classname";
import { Link } from "gatsby";

import Birdonbranch from "../../images/svg/birdonbranch";
import * as styles from "./callback.module.scss";
import * as global from "../../styles/base/global.module.scss";

function Callback() {
  const [form, setForm] = useState({
    phone: "",
    message: "",
  });

  return (
    <>
      <section className={styles.join}>
        <div className={cx(styles.block, global.container)}>
          <h2>
            Только проверенная информация без духоты, воды и сложных терминов за
            200₽
          </h2>
          <div className={styles.action}>
            <Link to="/auth" className={styles.button}>
              <p className={styles.text}>Присоединиться к Графикси</p>
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
            value={form.phone}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <button className={styles.send}>
            <p className={styles.text}>Отправить</p>
          </button>
        </div>
      </section>
    </>
  );
}

export default Callback;
