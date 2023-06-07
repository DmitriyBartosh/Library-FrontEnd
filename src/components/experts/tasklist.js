import React from 'react'
import cx from 'classname'
import { AiOutlineArrowLeft } from "react-icons/ai";
import * as styles from './tasklist.module.scss'
import * as global from '../../styles/base/global.module.scss'

import img1 from '../../images/tasklist/1.jpg'
import img2 from '../../images/tasklist/2.jpg'
import img3 from '../../images/tasklist/3.jpg'
import img4 from '../../images/tasklist/4.jpg'
import img5 from '../../images/tasklist/5.jpg'
import img6 from '../../images/tasklist/6.jpg'
import img7 from '../../images/tasklist/7.jpg'
import img8 from '../../images/tasklist/8.jpg'
import img9 from '../../images/tasklist/9.jpg'
import img10 from '../../images/tasklist/10.jpg'

function Tasklist() {

  const data = [
    {
      number: '01',
      title: 'Мудборд и насмотренность',
      description: 'ЗДЕСЬ ПРО: ЦА, мудборд, список ресурсов для вдохновения',
      preview: img1,
      designparsing: false,
    },
    {
      number: '02',
      title: 'Создай визитку',
      description: 'ЗДЕСЬ ПРО: Шрифтовую пару, правило печати',
      preview: img2,
      designparsing: true,
    },
    {
      number: '03',
      title: 'Создаем плакат с помощью нейросетей',
      description: 'ЗДЕСЬ ПРО: цвет, композицию',
      preview: img3,
      designparsing: false,
    },
    {
      number: '04',
      title: 'Создание системы иконок',
      description: 'ЗДЕСЬ ПРО: ЦА, мудборд, список ресурсов для вдохновения',
      preview: img4,
      designparsing: false,
    },
    {
      number: '05',
      title: 'Серия постов для соц сетей',
      description: 'ЗДЕСЬ ПРО: ЦА, мудборд, список ресурсов для вдохновения',
      preview: img5,
      designparsing: false,
    },
    {
      number: '06',
      title: 'Разработка слайдов для презентации продукта',
      description: 'ЗДЕСЬ ПРО: Типографику, правило печати, основу композиции',
      preview: img6,
      designparsing: true,
    },
    {
      number: '07',
      title: 'Создание логотипа',
      description: 'ЗДЕСЬ ПРО: ЦА, мудборд, список ресурсов для вдохновения',
      preview: img7,
      designparsing: true,
    },
    {
      number: '08',
      title: 'Основы создания фирменного стиля',
      description: 'ЗДЕСЬ ПРО: ЦА, мудборд, список ресурсов для вдохновения',
      preview: img8,
      designparsing: true,
    },
    {
      number: '09',
      title: 'Создание упаковки',
      description: 'ЗДЕСЬ ПРО: ЦА, мудборд, список ресурсов для вдохновения',
      preview: img9,
      designparsing: false,
    },
    {
      number: '10',
      title: 'Создание этикетки',
      description: 'ЗДЕСЬ ПРО: ЦА, мудборд, список ресурсов для вдохновения',
      preview: img10,
      designparsing: true,
    }
  ]


  return (
    <div className={cx(styles.container, global.container)}>
      <h3>получить<br />
        пакет заданий</h3>
      <div className={styles.tasklist}>
        {data.map((item, index) => {
          const { number, title, description, preview, designparsing } = item;

          return <div className={styles.task} key={index}>
            <div className={styles.top}>
              <div className={styles.header}>
                <p>{number}</p>
                <AiOutlineArrowLeft className={styles.icon} />
              </div>
              <div className={styles.description}>
                <p className={styles.title}>{title}</p>
                <p>{description}</p>
              </div>
            </div>
            <div className={styles.bottom}>
              <img className={styles.preview} src={preview} alt={`обложка для ${title}`} />
              {designparsing ?
                <p className={styles.designparsing}>+ дизайн-разбор</p>
                :
                <div className={styles.plug} />
              }
            </div>
          </div>
        })}
      </div>

    </div>
  )
}

export default Tasklist