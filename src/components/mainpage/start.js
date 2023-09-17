import React from "react";
import cx from "classname";
import Linesteps from "../../images/svg/linesteps";
import * as styles from "./start.module.scss";
import * as global from "../../styles/base/global.module.scss";

function Start() {
  return (
    <section className={styles.section}>
      <div className={cx(styles.header, global.container)}>
        <div className={styles.right} />
        <div className={styles.left} />

        <h3 className={styles.title}>
          <span>Как ты можешь</span>
          <span className={styles.orange}>начать?</span>
        </h3>
      </div>

      <div className={cx(styles.steps, global.container)}>
        <div className={styles.block}>
          <div className={styles.text}>
            <h5>1 шаг</h5>
            <p>
              Для того, чтобы начать работу, ты можешь ознакомиться с личными
              страничками и опытом наших экспертов, а также выбрать удобный
              пакет заданий для себя.
            </p>
          </div>
        </div>
        <div className={styles.block}>
          <Linesteps className={styles.icon} />
          <div className={styles.text}>
            <h5>2 шаг</h5>
            <p>
              Авторизуйся в личном кабинете и оплати подписку. После оформления
              в личном кабинете откроются нужные тебе задания и возможность
              связаться с экспертами.
            </p>
          </div>
        </div>
        <div className={styles.block}>
          <Linesteps className={styles.icon} />
          <div className={styles.text}>
            <h5>3 шаг</h5>
            <p>
              На этом этапе остается только получать удовольствие от процесса,
              изучать новые темы, выполнять Технические Задания, общаться с
              экспертами.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Start;
