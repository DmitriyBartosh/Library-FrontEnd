import React, { useRef } from 'react'
import { useScroll, motion } from 'framer-motion'
import Birdonbranch from '../../images/svg/birdonbranch'
import Linenext from '../../images/svg/linenext'
import { IoCheckmarkSharp } from 'react-icons/io5'
import cx from 'classname'
import * as styles from './next.module.scss'
import * as button from '../../styles/base/button.module.scss'
import * as global from '../../styles/base/global.module.scss'

function Next() {
  const directionsRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: directionsRef,
    offset: ["start end", "end end"]
  });

  return (
    <div className={styles.section}>
      <div className={styles.steps}>
        <div className={cx(styles.header, global.container)}>
          <div className={styles.right} />
          <div className={styles.left} />
          <Birdonbranch className={styles.bird} />
          <div className={styles.titleblock}>
            <h3 className={styles.title}>
              <div className={styles.text}>
                <span>Окей,</span>
              </div>
              <div className={styles.text}>
                <span>а что дальше?</span>
              </div>
            </h3>
          </div>
        </div>

        <div className={global.container}>
          <div className={styles.grid}>
            <div className={styles.top}>
              <h5>На этом этапе ты сможешь<br /> собрать свое собственное<br /> портфолио и получить<br /> дизайн-разбор твоих работ</h5>
            </div>
            <div className={styles.top}>
              <p>После выбора специалиста тебе открывается персональный пакет Технических Заданий из жизни практикующих дизайнеров на месяц. </p>
            </div>
          </div>

          <div className={styles.line} />

          <div className={styles.grid}>
            <div className={styles.bottom}>
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
                <div className={styles.whitenumber}>
                  <p>10</p>
                </div>
                <p>
                  проектов<br />
                  в портфолио
                </p>
              </div>
            </div>
            <div className={styles.bottom}>
              <Linenext className={styles.icon} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.callback}>
        <h3>Мне нравится!<br />
          Хочу начать</h3>
        <button className={button.main}>Выбрать специалиста</button>
      </div>
      <div className={styles.directions} ref={directionsRef}>
        <motion.h6
          style={{ x: scrollYProgress * 150 }}
        >
          <span className={styles.bordertext}>Программирование Дизайн Фотография Иллюстрация Программирование Дизайн Фотография Иллюстрация Программирование Дизайн Фотография Иллюстрация Программирование Дизайн Фотография Иллюстрация</span>
        </motion.h6>
      </div>

      <div className={cx(styles.experts, global.container)}>
        <h4>Мы строго отбираем экспертов<br />
          и работаем только с самыми опытными</h4>
        <div className={styles.speakers}>
          <div className={styles.block} />
          <div className={styles.block} />
          <div className={styles.block} />
          <div className={styles.block} />
          <div className={styles.block} />
          <div className={styles.block} />
        </div>
        <div className={styles.selection}>
          <div className={styles.line} />
          <div className={styles.block}>
            <div className={styles.circle}>
              <IoCheckmarkSharp className={styles.icon} />
            </div>
            <p className={styles.title}>Софт скилы</p>
            <p>Мы за бережную
              и конструктивную коммуникацию
              между учеником и экспертом</p>
          </div>
          <div className={styles.block}>
            <div className={styles.circle}>
              <IoCheckmarkSharp className={styles.icon} />
            </div>
            <p className={styles.title}>Опыт работы</p>
            <p>От 5 лет
              в профильном направлении</p>
          </div>
          <div className={styles.block}>
            <div className={styles.circle}>
              <IoCheckmarkSharp className={styles.icon} />
            </div>
            <p className={styles.title}>Собеседование</p>
            <p>Проверяем самое важное:
              навыки и успешные кейсы
              из практики</p>
          </div>
          <div className={styles.block}>
            <div className={styles.circle}>
              <IoCheckmarkSharp className={styles.icon} />
            </div>
            <p className={styles.title}>Обучение</p>
            <p>И профессионалам
              важно учиться. Развиваем через
              вебинары и личные встречи</p>
          </div>
        </div>

        <div className={styles.pickup}>
          <button className={button.orange}>
            подобрать специалиста
          </button>
        </div>
      </div>
    </div>
  )
}

export default Next