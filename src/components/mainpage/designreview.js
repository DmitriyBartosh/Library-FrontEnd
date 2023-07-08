import React from 'react'
import cx from 'classname'
import * as styles from './designreview.module.scss'
import * as global from '../../styles/base/global.module.scss'
import * as button from '../../styles/base/button.module.scss'
import Flowerthree from '../../images/svg/flower/flowerthree'
import Flowerfour from '../../images/svg/flower/flowerfour'
import Birdonbranch from '../../images/svg/birdonbranch'
import { StaticImage } from 'gatsby-plugin-image'

function Designreview() {
  return (
    <div className={styles.section}>
      <div className={cx(styles.header, global.container)}>
        <div className={styles.right} />
        <div className={styles.left} />
        <div className={styles.titleblock}>
          <h3 className={styles.title}>
            <div className={styles.text}>
              <span>Как попасть</span>
            </div>
            <div className={cx(styles.text, styles.orange)}>
              <span>на дизайн - разбор?</span>
            </div>
          </h3>
        </div>
      </div>
      <div className={styles.cards}>
        <div className={cx(styles.item, styles.one)}>
          <p>разбор<br />
            до 10<br />
            проектов<br />
            от экпертов</p>
        </div>
        <div className={cx(styles.item, styles.two)}>
          <p className={styles.title}>Дизайн-разбор - это </p>
          <p>
            <span>Возможность взгляда со стороны профессиональных дизайнеров
              на ваши проекты.</span>
            <br /><br />
            Вы получите обратную связь
            в виде скринкастов в <span>течение 48 часов</span> после отправки проектов
            с разбором ваших сильных и слабых сторон.
            <br /><br />
            <span>А также конспект с инструкцией
              по улучшению именно вашего проекта</span>
          </p>
        </div>
        <div className={cx(styles.item, styles.three)}>
          <p>
            Мы мягко и дружелюбно
            направим тебя, а ты пополнишь свое портфолио сильными работами</p>
          <Flowerfour className={styles.flowerone} />
          <Flowerthree className={styles.flowertwo} />
        </div>
        <div className={cx(styles.item, styles.four)}>
          <p>48 часов
            на проверку</p>
          <svg viewBox="0 0 169 178" fill="none" className={styles.flowerthree}>
            <path
              d="M81.209 61.328S69.116-6.143 91.644.454c22.528 6.599 7.5 65.254 7.5 65.254S127.98 12.98 141.41 24.016c13.429 11.036-31.452 50.538-31.452 50.538s48.573-26.276 53.951-9.226c5.377 17.051-44.097 22.394-44.097 22.394s51.218 2.92 49.126 19.123c-2.093 16.204-58.661-2.744-58.661-2.744s39.911 32.758 29.941 47.911c-9.971 15.153-46.51-30.86-46.51-30.86s18.081 52.115-.552 56.611C74.523 182.26 74.61 121.21 74.61 121.21s-14.825 56.641-26.161 48.553c-11.337-8.087 16.278-59.326 16.278-59.326s-36.161 34.831-50.23 26.919c-14.07-7.913 45.84-41.634 45.84-41.634S8.015 117.823.545 101.269c-7.471-16.554 64.532-20.437 64.532-20.437S-7.8 71.342 1.125 58.117C10.049 44.89 67.72 66.67 67.72 66.67S21.793 18.118 38.449 13.593c16.656-4.526 42.76 47.736 42.76 47.736z"
              fill="#F8DB4C"
            />
          </svg>

        </div>
      </div>

      <div className={cx(styles.footer, global.container)}>
        <h5>Просто добавляй галочки рядом <br />
          с выполненными заданиямии <br />
          и получай обратную связь в течение<br />
          48 часов</h5>
        <p className={styles.experts}>кто в команде экспертов?</p>
      </div>

      <div className={styles.directions}>
        <div className={cx(styles.block, global.container)}>
          <div className={styles.left}>
            <StaticImage src='../../images/persons/kateshmidt/1.jpg' alt='Катерина Шмидт' className={styles.gatsbyimg} />
          </div>
          <div className={styles.right}>
            <div className={styles.title}>
              <h2 className={styles.main}>Графический<br />дизайн</h2>
              <p className={styles.second}>Пакет Технических Заданий:</p>
            </div>
            <div className={styles.description}>
              <p className={styles.listdirection}>Визитки<br />
                Фирменный стиль<br />
                Логотип<br />
                Презентации<br />
                Контент для соц сетей<br />
                Упаковка</p>
              <div className={styles.amountproject}>
                <div className={styles.info}>
                  <div className={styles.number}>
                    <p>10</p>
                  </div>
                  <p>
                    до 10<br />
                    скринкаст<br />
                    разборов
                  </p>
                </div>
                <div className={styles.info}>
                  <div className={styles.orangenumber}>
                    <p>10</p>
                  </div>
                  <p>
                    проектов<br />
                    в портфолио
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={cx(styles.block, global.container)}>
          <div className={styles.left}>
            <StaticImage src='../../images/persons/kateshmidt/1.jpg' alt='Катерина Шмидт' className={styles.gatsbyimg} />
          </div>
          <div className={styles.right}>
            <div className={styles.title}>
              <h2 className={styles.main}>Графический<br />дизайн</h2>
              <p className={styles.second}>Пакет Технических Заданий:</p>
            </div>
            <div className={styles.description}>
              <p className={styles.listdirection}>Визитки<br />
                Фирменный стиль<br />
                Логотип<br />
                Презентации<br />
                Контент для соц сетей<br />
                Упаковка</p>
              <div className={styles.amountproject}>
                <div className={styles.info}>
                  <div className={styles.number}>
                    <p>10</p>
                  </div>
                  <p>
                    до 10<br />
                    скринкаст<br />
                    разборов
                  </p>
                </div>
                <div className={styles.info}>
                  <div className={styles.orangenumber}>
                    <p>10</p>
                  </div>
                  <p>
                    проектов<br />
                    в портфолио
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cx(styles.callback, global.container)}>
        <div className={styles.invite}>
          <h3>Только проверенная
            информация без духоты, воды и сложных терминов
            за 200₽ навсегда</h3>
          <button className={button.orange}>Присоединиться к Графикси</button>
        </div>
        <Birdonbranch className={styles.icon} />
        <div className={styles.sendform}>
          <div className={styles.left}>
            <p>
              <span>Задать вопросы</span>
            </p>
            <p>Мы всегда на связи</p>
          </div>
          <div className={styles.right}>
            <div className={styles.form}>
              <input className={styles.input} placeholder='Введите телефон' />
              <button className={button.black}>Отправить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Designreview

