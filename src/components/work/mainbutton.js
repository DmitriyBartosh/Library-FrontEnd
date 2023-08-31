import React, { useState, useEffect } from 'react'
import cx from 'classname';
import { motion, AnimatePresence } from 'framer-motion'
import Flowertwo from '../../images/svg/flower/flowertwo';
import * as styles from './mainbutton.module.scss';

function Mainbutton({ selected, section, scroll, contentRef, theme }) {
  const [isActive, setIsActive] = useState(false);


  const scrollToSection = () => {
    contentRef.current.scrollTo({ top: 0, behavior: "instant" });
  };

  useEffect(() => {
    const size = section.current.getBoundingClientRect();

    let top = size?.top;
    let height = size?.height;

    // Отступ от которого секция в поле видимости верхней границы экрана считается активной
    const offset = -1 * (top - 75);

    // Если в верхняя граница находится в поле секции, то она активна и просчитываем прогресс для точки
    if ((offset > 0 && offset < height + 75) || offset === -0) {
      setIsActive(true);
    } else setIsActive(false);
  }, [section, scroll])


  return (
    <button className={cx(styles.container, !isActive && styles.hidden)} onClick={scrollToSection}>
      <div className={styles.head}>
        <p className={styles.title}>{theme}</p>
        <p>{selected.title}</p>
      </div>
      <AnimatePresence initial={false} mode='popLayout'>
        {isActive &&
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.4, ease: [0.25, 0.62, 0.58, 1] } }}
            exit={{ opacity: 0, y: -10 }} className={styles.level} key="level">
            <p>Сложность: <span>{selected.complexity}</span></p>
            <p>Сроки: <span>{selected.time}</span></p>
          </motion.div>
        }
      </AnimatePresence>
      <Flowertwo className={styles.flowerbottom} />
    </button>
  )
}

export default Mainbutton