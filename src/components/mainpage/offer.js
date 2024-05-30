import React from "react";
import cx from "classname";
import One from "../../images/svg/practice/one";
import Two from "../../images/svg/practice/two";
import Three from "../../images/svg/practice/three";
import Four from "../../images/svg/practice/four";
import Flowerthree from "../../images/svg/flower/flowerthree";
import Flowerfour from "../../images/svg/flower/flowerfour";

import * as global from "../../styles/base/global.module.scss";
import * as styles from "./offer.module.scss";

function Practice() {
  return (
    <>
      <section className={global.container}>
        <div className={styles.section}>
          <div className={styles.head}>
            <h2>Что предлагаем: </h2>
            <p>
              <span>
                В Графикси ты сможешь познакомиться с направлением Графический
                Дизайн.
              </span>
              <br />
              <br />
              С помощью пакета Технических Заданий, инструкций, конспектов с
              теорией, которые мы тщательно собирали вместе с экспертами для
              тебя, ты сможешь создать классное портфолио и начать свой путь в
              карьере. <br />
              <br />
              На нашей площадке материал адаптируется под разный возраст,
              начиная с 12 лет и будет постоянно дополняться новыми
              направлениями, связанными с разработкой, фотографией и другими
              актуальными сферами!
            </p>
          </div>

          <div className={styles.four}>
            <div className={styles.block}>
              <div className={styles.text}>
                <p className={styles.title}>
                  ГОТОВЫЕ ТЕХНИЧЕСКИЕ
                  <br />
                  ЗАДАНИЯ C ГАЙДАМИ
                </p>
                <p className={styles.text}>
                  Мы создали теоретические материалы, которые помогут тебе
                  выполнять ТЗ и пополнять портфолио
                </p>
              </div>
              <One className={styles.icon} />
            </div>
            <div className={styles.block}>
              <div className={styles.text}>
                <p className={styles.title}>
                  САМОСТОЯТЕЛЬНОЕ
                  <br />
                  ИЗУЧЕНИЕ БЕЗ ДЕДЛАЙНОВ
                </p>
                <p className={styles.text}>
                  Мы топим за взрослое самостоятельное обучение с комфортными
                  временными рамками
                </p>
              </div>
              <Two className={styles.icon} />
            </div>
            <div className={styles.block}>
              <div className={styles.text}>
                <p className={styles.title}>РАЗБОРЫ ОТ ЭКСПЕРТОВ</p>
                <p className={styles.text}>
                  По желанию, ты сможешь выбрать и отправить проекты эксперту,
                  получить подробную обратную связь по их улучшению
                </p>
              </div>
              <Three className={styles.icon} />
            </div>
            <div className={styles.block}>
              <div className={styles.text}>
                <p className={styles.title}>НОВЫЕ ЗНАКОМСТВА И ПОБЕДЫ</p>
                <p className={styles.text}>
                  У нас есть общий чат со всеми пользователями, где мы
                  обмениваемся опытом и просто болтаем о насущном
                </p>
              </div>
              <Four className={styles.icon} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cards}>
        <div className={cx(styles.item, styles.one)}>
          <p>
            Пакет Технических
            <br />
            заданий
            <br />
            по граф.
            <br />
            дизайну
          </p>
        </div>
        <div className={cx(styles.item, styles.two)}>
          <p className={styles.title}>Разборы от экспертов это - </p>
          <p>
            Возможность взгляда со стороны на ваши проекты профессиональных
            экспертов, у которых уже получилось сильных и слабых сторон.
            <br />
            <br />
            Ты получишь обратную связь в виде скринкастов и конпектов в течение
            3 дней после отправки проекта с разбором ваших сильных и слабых
            сторон.
          </p>
        </div>
        <div className={cx(styles.item, styles.three)}>
          <p>
            Мы мягко и дружелюбно направим тебя, а ты пополнишь свое портфолио
            сильными работами.
          </p>
          <Flowerfour className={styles.flowerone} />
          <Flowerthree className={styles.flowertwo} />
        </div>
        <div className={cx(styles.item, styles.four)}>
          <p>
            Отправляй проекты на проверку в любое время, мы проверим их за 72
            часа
          </p>
          <svg viewBox="0 0 169 178" fill="none" className={styles.flowerthree}>
            <path
              d="M81.209 61.328S69.116-6.143 91.644.454c22.528 6.599 7.5 65.254 7.5 65.254S127.98 12.98 141.41 24.016c13.429 11.036-31.452 50.538-31.452 50.538s48.573-26.276 53.951-9.226c5.377 17.051-44.097 22.394-44.097 22.394s51.218 2.92 49.126 19.123c-2.093 16.204-58.661-2.744-58.661-2.744s39.911 32.758 29.941 47.911c-9.971 15.153-46.51-30.86-46.51-30.86s18.081 52.115-.552 56.611C74.523 182.26 74.61 121.21 74.61 121.21s-14.825 56.641-26.161 48.553c-11.337-8.087 16.278-59.326 16.278-59.326s-36.161 34.831-50.23 26.919c-14.07-7.913 45.84-41.634 45.84-41.634S8.015 117.823.545 101.269c-7.471-16.554 64.532-20.437 64.532-20.437S-7.8 71.342 1.125 58.117C10.049 44.89 67.72 66.67 67.72 66.67S21.793 18.118 38.449 13.593c16.656-4.526 42.76 47.736 42.76 47.736z"
              fill="#F8DB4C"
            />
          </svg>
        </div>
      </section>
    </>
  );
}

export default Practice;
