import React from 'react'
import { Link } from 'gatsby'
import cx from 'classname'
import Bird from '../../images/svg/bird'
import Birdonbranch from '../../images/svg/birdonbranch'
import Flowerone from '../../images/svg/flower/flowerone'
import Flowertwo from '../../images/svg/flower/flowertwo'
import * as styles from './preview.module.scss'
import * as global from '../../styles/base/global.module.scss'
import * as button from '../../styles/base/button.module.scss'

function Preview() {
  return (
    <>
      <div className={styles.section}>
        <Bird className={styles.bird} />
        <Birdonbranch className={styles.birdonbranch} />
        <Flowerone className={styles.flower} />
        <div className={styles.mask}>
          <Flowertwo className={styles.flowers} />
        </div>
        <div className={styles.info}>
          <h1>Дай старт своей<br />
            карьере с Графикси</h1>
          <p>Сервис, который помогает улучшить портфолио
            и получить консультации от экспертов на любом
            этапе твоей карьеры  </p>
          <Link className={cx(button.main, styles.button)} to='/portfolio'>Собрать портфолио</Link>
        </div>
      </div>

      <div className={styles.about}>
        <div className={cx(styles.four, global.container)}>
          <div className={styles.block}>
            <p className={styles.title}>
              нагрузка
            </p>
            <p className={styles.description}>3-4 часа в неделю</p>
          </div>
          <div className={styles.block}>
            <p className={styles.title}>
              старт
            </p>
            <p className={styles.description}>по подписке</p>
          </div>
          <div className={styles.block}>
            <p className={styles.title}>
              длительность
            </p>
            <p className={styles.description}>1 месяц</p>
          </div>
          <div className={styles.block}>
            <p className={styles.title}>
              кол-во проектов
            </p>
            <p className={cx(styles.description, styles.orange)}>10 работ</p>
          </div>
        </div>
      </div>
    </>

  )
}

export default Preview