import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import * as styles from './progress.module.scss';
import * as global from '../../styles/base/global.module.scss'
import { useStateContext } from '../../context/ContextProvider';
import Direction from './direction';

function Progress({ copiedLink }) {
  const { statusDirection } = useStateContext();

  const works = ['Мудборд', 'Логотип', 'Визитка', 'Соц.сети', 'Плакат', 'Фирм стиль', 'Лонгрид', 'Что-то еще',]

  const design = useStaticQuery(graphql`
  query {
    directionsJson(title: {eq: "Графический дизайн"}) {
      title
      slug
      id
      about
      works {
        slug
        check
        description
        title
        order {
          section
          description
          title
        }
        preview {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`)

  return (
    <div className={styles.container}>
      {statusDirection?.design && <Direction data={design.directionsJson} copiedLink={copiedLink} />}
      {statusDirection?.frontend &&
        <div className={styles.block}>
          <div className={global.container}>
            <h3>FrontEnd разработка</h3>
            <div className={styles.progress}>
              <p className={styles.title}>Ваш прогресс</p>
              <p>Статистика выполненных заданий</p>
              <div className={styles.bar} />
              <div className={styles.works}>
                <div className={styles.list}>
                  {works.map((item, index) => {

                    return <div className={styles.item} key={index}>
                      <p>{item}</p>
                    </div>
                  })}
                </div>
                <div className={styles.advenced}>
                  <p className={styles.topic}>Тема 1</p>
                  <p className={styles.topic}>Тема 1</p>
                  <p className={styles.topic}>Тема 1</p>

                  <p className={styles.link}>ссылка уже на готовый проект </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {statusDirection?.photo &&
        <div className={styles.block}>
          <div className={global.container}>
            <h3>Фотография</h3>
            <div className={styles.progress}>
              <p className={styles.title}>Ваш прогресс</p>
              <p>Статистика выполненных заданий</p>
              <div className={styles.bar} />
              <div className={styles.works}>
                <div className={styles.list}>
                  {works.map((item, index) => {

                    return <div className={styles.item} key={index}>
                      <p>{item}</p>
                    </div>
                  })}
                </div>
                <div className={styles.advenced}>
                  <p className={styles.topic}>Тема 1</p>
                  <p className={styles.topic}>Тема 1</p>
                  <p className={styles.topic}>Тема 1</p>

                  <p className={styles.link}>ссылка уже на готовый проект </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Progress