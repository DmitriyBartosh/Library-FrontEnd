import React from 'react'
import cx from 'classname'
import Logo from '../images/svg/logowhite'
import * as styles from './footer.module.scss'
import * as global from '../styles/base/global.module.scss'

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.section}>
      <div className={cx(styles.container, global.container)}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <Logo className={styles.svg} />
          </div>
          <p>Наша Web-Студия</p>
          <p>Бесплатные материалы</p>
          <p>Личный кабинет</p>

        </div>
        <div className={styles.center}>
          <p>©2022 — {year}, Графикси by <span>Hey, Coddes</span></p>
        </div>
        <div className={styles.right}>
          <p><span>Контакты:</span></p>
          <p>Написать в <span>Telegram</span></p>
          <p>Написать в <span>WhatsApp</span></p>
          <p><span>Graphiksy@mail.ru</span></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer