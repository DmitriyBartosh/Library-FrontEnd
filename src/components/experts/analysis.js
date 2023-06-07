import React from 'react'
import cx from 'classname'
import * as styles from './analysis.module.scss'
import * as global from '../../styles/base/global.module.scss'
import * as button from '../../styles/base/button.module.scss'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

function Analysis({ data, alt }) {
  return (
    <div className={cx(styles.container, global.container)}>
      <h3>Дизайн-разборы</h3>
      <div className={styles.about}>
        <div className={styles.left}>
          <p>Я мягко и дружелюбно <br />
            направлю тебя, а ты пополнишь <br />
            свое портфолио сильными работами
          </p>
        </div>
        <div className={styles.right}>
          <p>Дизайн-разбор - <span>это возможность получить взгляд
            со стороны профессионального дизайнера на ваши проекты.</span> Вы получите обратную связь в виде скринкастов  <span>в течение 24 часов</span> после отправки проектов с разбором ваших сильных и слабых сторон. А также конспект
            с инструкцией по улучшению именно вашего проекта</p>
        </div>
      </div>
      <div className={styles.photos}>
        {data.map((item, index) => {
          const imageUrl = getImage(item.childrenImageSharp[0])

          return <div className={styles.item} key={index}>
            <GatsbyImage image={imageUrl} className={styles.gatsbyimage} alt={alt} />
          </div>
        })}
      </div>
      <div className={styles.consultation}>
        <button className={button.orange}>получить разбор</button>
        <div className={styles.screencast}>
          <div className={styles.number}>
            <p>5</p>
          </div>
          <p>
            скринкаст<br />
            разборов
          </p>
        </div>
      </div>
      <div className={styles.footer}>
        <h3>Только проверенная информация <br />
          без духоты, воды и сложных терминов </h3>
        <div className={styles.offer}>
          <div className={styles.block}>
            <p>Подписка на <span>1 месяц</span><br />
              <span>200 руб.</span>
            </p>
            <button className={cx(button.white, styles.button)}>Оформить</button>
          </div>
          <div className={styles.block}>
            <p>Магазин<br />
              дизайн-разборов<br />
              1000 руб.
            </p>
            <button className={cx(button.white, styles.button)}>Купить</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analysis