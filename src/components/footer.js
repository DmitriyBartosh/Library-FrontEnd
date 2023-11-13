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
          <div className={styles.logo}></div>
          <a href="https://heycoddes.ru" target="_blank" rel="noreferrer">
            Наша Web-Студия
          </a>
          <Link to="/articles">Полезные материалы</Link>
          <Link to="/profile">Личный кабинет</Link>
          <Link to="/agreement">Соглашение</Link>
          <Link to="/privacy">Политика</Link>
        </div>
        <div className={styles.center}>
          <p>
            ©2022 — {year}, Графикси сделан{" "}
            <a href="https://heycoddes.ru" target="_blank" rel="noreferrer">
              Hey, Coddes
            </a>
          </p>
          <p>Бартош Дмитрий Сергеевич / ИНН 246007567440</p>
        </div>
        <div className={styles.right}>
          <p>
            <span>Контакты:</span>
          </p>
          <a href="mailto:bartoshds@yandex.ru" target="_blank" rel="noreferrer">
            bartoshds@yandex.ru
          </a>
          <a href="https://t.me/KateShmidt" target="_blank" rel="noreferrer">
            Написать в <span>Telegram</span>
          </a>
          <a href="https://wa.me/+79538533877" target="_blank" rel="noreferrer">
            Написать в <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
