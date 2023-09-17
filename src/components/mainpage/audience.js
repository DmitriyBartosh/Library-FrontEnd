import React from "react";
import cx from "classname";

import Bird from "../../images/svg/bird";
import Flowerfive from "../../images/svg/flower/flowerfive";
import Logo from "../../images/svg/directions/logo";
import Firmstyle from "../../images/svg/directions/firmstyle";
import Presentation from "../../images/svg/directions/presentation";
import Visual from "../../images/svg/directions/visual";

import * as styles from "./audience.module.scss";
import * as global from "../../styles/base/global.module.scss";

function Audience() {
  return (
    <section className={styles.container}>
      <div className={cx(styles.header, global.container)}>
        <div className={styles.right} />
        <div className={styles.left}>
          <Bird className={styles.bird} />
        </div>

        <h3 className={styles.title}>
          <span>Тебе точно подойдет площадка</span>
          <span className={styles.orange}>если ты:</span>
        </h3>
      </div>

      <div className={cx(styles.three, global.container)}>
        <div className={styles.block}>
          <p className={styles.number}>01</p>
          <p className={styles.title}>
            Начинающий специалист творческих профессий
          </p>
          <ul className={styles.list}>
            <li>
              Студенты, которые хотят начать работать на удалёнке пока учатся
            </li>
            <li>
              Выпускники школ и ВУЗов, которые находятся в поиске основной
              работы
            </li>
            <li>
              Есть опыт работы в базовых программах (Adobe Illustrator /
              Photoshop, Figma)
            </li>
          </ul>
        </div>
        <div className={styles.block}>
          <p className={styles.number}>02</p>
          <p className={styles.title}>
            Специалист из смежных профессий, который хочет сменить работу
          </p>
          <ul className={styles.list}>
            <li>
              Таргетологи, маркетологи, иллюстраторы с базовыми навыками (Adobe
              Illustrator / Photoshop, Figma)
            </li>
          </ul>
          <Flowerfive className={styles.flower} />
        </div>
        <div className={styles.block}>
          <p className={styles.number}>03</p>
          <p className={styles.title}>
            Начинающий специалист творческих профессий
          </p>
          <ul className={styles.list}>
            <li>
              Для тех, кто хочет оставаться конкурентным на рынке и освежить
              портфолио новыми проектами
            </li>
          </ul>
        </div>
      </div>

      <div className={cx(styles.examples, global.container)}>
        <h3>
          Вот несколько примеров тем,
          <br />
          которые мы разбираем:
        </h3>
        <div className={styles.list}>
          <div className={styles.block}>
            <div className={styles.text}>
              <p className={styles.title}>Логотип</p>
              <p>
                Поймешь откуда берутся идеи для концепций, метафоры. Разберешься
                с тем как строить сетку, поработаешь с вектором, мокапами
              </p>
            </div>
            <Logo className={styles.icon} />
          </div>
          <div className={styles.block}>
            <div className={styles.text}>
              <p className={styles.title}>Фирменный стиль</p>
              <p>
                Разберешь ЦА, композиционные приемы, типографику. Узнаешь, что
                такое графические константы, цветовая схема
              </p>
            </div>
            <Firmstyle className={styles.icon} />
          </div>
          <div className={styles.block}>
            <div className={styles.text}>
              <p className={styles.title}>Презентация</p>
              <p>
                Разберешь типы презентаций и их структуру, композицию, ритм,
                стилистические приемы, инфографику.
              </p>
            </div>
            <Presentation className={styles.icon} />
          </div>
          <div className={styles.block}>
            <div className={styles.text}>
              <p className={styles.title}>Социальные сети</p>
              <p>
                Попробуешь себя в роли SMM специалиста и поработаешь с
                контент-планом и на его основе разработаешь стиль для соц. сетей
              </p>
            </div>
            <Visual className={styles.icon} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Audience;
