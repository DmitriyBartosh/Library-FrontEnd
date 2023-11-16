import React from "react";
import cx from "classname";
import { Link } from "gatsby";
import * as styles from "./footer.module.scss";
import * as global from "../styles/base/global.module.scss";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.section}>
      <div className={cx(styles.container, global.container)}>
        <div className={styles.left}>
          <div className={styles.block}>
            <p className={styles.title}>
              <span>Сотрудничество:</span>
            </p>
            <a
              href="mailto:bartoshds@yandex.ru"
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              Bartoshds@yandex.ru
            </a>
            <a
              href="https://t.me/KateShmidt"
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              Написать в <span>Telegram</span>
            </a>
          </div>

          <div className={styles.block}>
            <Link to="/agreement" className={styles.link}>
              Соглашение
            </Link>
            <Link to="/privacy" className={styles.link}>
              Политика
            </Link>
          </div>
        </div>
        <div className={styles.center}>
          <p>
            ©2022 — {year} Графикси <br /> Создан командой{" "}
            <a
              href="https://heycoddes.ru"
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              Веб студией / Hey, Coddes
            </a>
          </p>
          <p>Бартош Дмитрий Сергеевич / ИНН 246007567440</p>
        </div>
        <div className={styles.right}>
          <div className={styles.block}>
            <p className={styles.title}>Наши соц. сети:</p>
            <a
              href="https://vk.com/graphiksi"
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              Вконтакте
            </a>
            <a
              href="https://t.me/+99YYKf-TELJkYWQy"
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              Телеграм
            </a>
          </div>

          <div className={styles.block}>
            <p className={styles.title}>Полезные ссылки</p>
            <Link to="/articles" className={styles.link}>
              Полезные материалы
            </Link>
            <Link to="/profile" className={styles.link}>
              Личный кабинет
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
