import React from 'react'
import cx from 'classname'
import Linesteps from '../../images/svg/linesteps'
import * as styles from './start.module.scss'
import * as global from '../../styles/base/global.module.scss'

function Start() {
  return (
    <div className={styles.section}>
      <div className={cx(styles.header, global.container)}>
        <div className={styles.right} />
        <div className={styles.left} />
        <div className={styles.titleblock}>
          <h1>02</h1>
          <h3 className={styles.title}>
            <div className={styles.text}>
              <span>Как  я могу</span>
            </div>
            <div className={styles.text}>
              <span className={styles.orange}>начать?</span>
            </div>
          </h3>
        </div>
      </div>

      <div className={cx(styles.steps, global.container)}>
        <div className={styles.block}>
          <div className={styles.text}>
            <h5>1 шаг</h5>
            <p>Для того, чтобы начать работу,ты можешь
              ознакомиться с личными страничками
              и опытом наших экспертов, а также выбрать удобный пакет заданий для себя.</p>
          </div>

        </div>
        <div className={styles.block}>
          <Linesteps className={styles.icon} />
          <div className={styles.text}>
            <h5>2 шаг</h5>
            <p>Авторизоваться в личном кабинете
              и оплатить подписку. Таким образом откроются нужные тебе задания.</p>
          </div>

        </div>
        <div className={styles.block}>
          <Linesteps className={styles.icon} />
          <div className={styles.text}>
            <h5>3 шаг</h5>
            <p>На этом этапе остается только получать удовольствие от процесса и осваивать навыки с помощью экспертов и их компетенций.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Start