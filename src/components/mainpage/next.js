import React from "react";
import Birdonbranch from "../../images/svg/birdonbranch";
import Linenext from "../../images/svg/linenext";
import cx from "classname";
import * as styles from "./next.module.scss";
import * as global from "../../styles/base/global.module.scss";

function Next() {
  return (
    <section className={styles.section}>
      <div className={styles.steps}>
        <div className={cx(styles.header, global.container)}>
          <div className={styles.right} />
          <div className={styles.left} />
          <Birdonbranch className={styles.bird} />
          <h3 className={styles.title}>
            <span>Окей,</span>
            <span>что я получу на выходе?</span>
          </h3>
        </div>

        <div className={global.container}>
          <div className={styles.grid}>
            <div className={styles.top}>
              <h5>
                На выходе ты соберешь минимум 10 работ в портфолио, пообщаешься
                с экспертами и повысишь свои шансы получения оффера мечты
              </h5>
            </div>
            <div className={styles.top}>
              <p>
                Мы постоянно пополняем базу новыми Техническими Заданиями,
                направлениями, теоретическими конспектами
              </p>
            </div>
          </div>

          <div className={styles.line} />

          <div className={styles.grid}>
            <div className={styles.bottom}>
              <div className={styles.info}>
                <div className={styles.number}>
                  <p>10</p>
                </div>
                <p>
                  проектов
                  <br />в портфолио
                </p>
              </div>
              <div className={styles.info}>
                <div className={styles.whitenumber}>
                  <p>10</p>
                </div>
                <p>
                  Разборов
                  <br />
                  от экспертов
                </p>
              </div>
            </div>
            <div className={styles.bottom}>
              <Linenext className={styles.icon} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Next;
