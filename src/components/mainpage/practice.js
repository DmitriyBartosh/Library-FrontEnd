import React from 'react'
import cx from 'classname'
import One from '../../images/svg/practice/one'
import Two from '../../images/svg/practice/two'
import Three from '../../images/svg/practice/three'
import Four from '../../images/svg/practice/four'
import { IoArrowForwardSharp } from "react-icons/io5";
import * as global from '../../styles/base/global.module.scss'
import * as styles from './practice.module.scss'

function Practice() {
  // В будущем тут будут список актуальных ссылок на статьи
  const articlesList = [
    'Как начать проект',
    'типографика',
    'FIGMA',
    'композиция',
    'цветовые сочетания'
  ]


  return (
    <>
      <div className={cx(styles.section, global.container)}>
        <div className={styles.title}>
          <h5>Практика на реальных задачах из жизни<br />
            от профессиональных специалистов<br />
            в области дизайна.</h5>
          <p className={styles.whatwedo}>чем будем  заниматься?</p>
        </div>
        <div className={styles.four}>
          <div className={styles.block}>
            <One className={styles.icon} />
            <p className={styles.description}>10 работ<br />
              в портфолио</p>
          </div>
          <div className={styles.block}>
            <Two className={styles.icon} />
            <p className={styles.description}>Теоретические<br />
              конспекты</p>
          </div>
          <div className={styles.block}>
            <Three className={cx(styles.icon, styles.delta)} />
            <p className={styles.description}>Дизайн-разбор<br />
              от экспертов</p>
          </div>
          <div className={styles.block}>
            <Four className={styles.icon} />
            <p className={styles.description}>Новые<br />
              победы и знакомства</p>
          </div>
        </div>
      </div>

      <div className={styles.articles}>
        <div className={styles.title}>
          <p>Коллекции статей</p>
          <IoArrowForwardSharp className={styles.svg} />
        </div>
        <div className={styles.list}>
          {articlesList.map((item, index) => {
            return <div key={index} className={styles.item}>
              <p>{item}</p>
            </div>
          })}
        </div>
      </div>
    </>

  )
}

export default Practice