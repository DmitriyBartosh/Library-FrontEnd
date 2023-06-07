import React from 'react'
import cx from 'classname'
import Bird from '../../images/svg/bird'
import * as styles from './projects.module.scss'
import * as global from '../../styles/base/global.module.scss'

import { IoAddSharp } from "react-icons/io5";

import Logo from "../../images/svg/directions/logo";
import Firmstyle from '../../images/svg/directions/firmstyle'
import Visual from '../../images/svg/directions/visual'
import Presentation from '../../images/svg/directions/presentation'
import Poster from '../../images/svg/directions/poster'
import Landing from '../../images/svg/directions/landing'

function Projects() {
  const directionsList = [
    {
      title: 'Логотип',
      description: 'Научим работать с идеей, строить сетку, правильно отдавать файлы заказчику',
      icon: <Logo className={styles.svg} />,
    },
    {
      title: 'Фирменный стиль',
      description: 'ЦА, мудборд, список ресурсов для вдохновения, работа с паттернами',
      icon: <Firmstyle className={styles.svg} />,
    },
    {
      title: 'Визуал для соц сетей',
      description: 'ЦА, мудборд, список ресурсов для вдохновения, работа с паттернами',
      icon: <Visual className={styles.svg} />,
    },
    {
      title: 'Презентация',
      description: 'Научим работать с идеей, строить сетку, правильно отдавать файлы заказчику',
      icon: <Presentation className={styles.svg} />,
    },
    {
      title: 'Постеры',
      description: 'ЦА, мудборд, список ресурсов для вдохновения, работа с паттернами',
      icon: <Poster className={styles.svg} />,
    },
    {
      title: 'Лендинг',
      description: 'ЦА, мудборд, список ресурсов для вдохновения, работа с паттернами',
      icon: <Landing className={styles.svg} />,
    }
  ]

  return (
    <div className={styles.section}>
      <div className={cx(styles.header, global.container)}>
        <div className={styles.right} />
        <div className={styles.left}>
          <Bird className={styles.bird} />
        </div>
        <div className={styles.titleblock}>
          <h1>01</h1>
          <h3 className={styles.title}>
            <div className={styles.text}>
              <span>Какие проекты</span>
            </div>
            <div className={styles.text}>
              <span>я смогу собрать</span>
            </div>
            <div className={styles.text}>
              <span className={styles.orange}>в портфолио?</span>
            </div>
          </h3>
        </div>
      </div>

      <div className={cx(styles.directions, global.container)}>
        {directionsList.map((item, index) => {
          const { title, description, icon } = item;

          return <div className={styles.block} key={index}>
            <div className={styles.icon}>
              {icon}
            </div>
            <div className={styles.text}>
              <h5>{title}</h5>
              <p>{description}</p>
              <div className={styles.line} />
              <IoAddSharp className={styles.icon} />
            </div>

          </div>
        })}
      </div>

      <div className={styles.possibilities}>
        <p>
          <span>Графикси</span> - это площадка с профессиональными экспертами в области графического и веб дизайна, которые готовы поделиться своим пакетом заданий и проверить их в течение 24 часов после отправки.
        </p>
      </div>
    </div>
  )
}

export default Projects