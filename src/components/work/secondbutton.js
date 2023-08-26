import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import * as styles from './secondbutton.module.scss';

function Secondbutton({ selected, scroll, top, height, contentRef }) {
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    // Отступ от которого секция в поле видимости верхней границы экрана считается активной
    const offset = -1 * (top - 31);

    // Если в верхняя граница находится в поле секции, то она активна и просчитываем прогресс для точки
    if (offset > 0 && offset < height + 31) {
      setIsActive(true);
      setProgress(offset / height);
    } else setIsActive(false);
  }, [height, top, scroll])

  const scrollToSection = () => {
    const element = document.querySelector(`[data-section-number="${0}"]`);
    contentRef.current.scrollTo({ top: element.offsetTop - 30, behavior: "instant" });
  };

  return (
    <motion.button
      initial={{ height: 0 }}
      key={`specification_button`}
      whileHover={{
        transition: { duration: 0.3, ease: [0.42, 0.5, 0.39, 1] }
      }}
      animate={{
        height: isActive ? 125 : 0,
        transition: { duration: 0.6, ease: [0.42, 0.5, 0.39, 1] }
      }}
      layout='size'
      className={styles.container}
      onClick={scrollToSection}>

      <div className={styles.name}>
        <p>{selected.title}</p>
      </div>
      <AnimatePresence initial={false} mode='popLayout'>
        {isActive &&
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.4, ease: [0.25, 0.62, 0.58, 1] } }}
            exit={{ opacity: 0, y: -10 }} className={styles.level} key="level">
            <p>Сложность: <span>{selected.complexity}</span></p>
            <p>Время выполнения: <span>{selected.time}</span></p>
          </motion.div>
        }
      </AnimatePresence>



      <motion.span
        className={styles.dot}
        animate={{
          top: `calc((100% - 42px) * ${progress} + 12px)`,
          opacity: isActive ? 1 : 0,
          visibility: isActive ? 'visible' : 'hidden',
          transition: { opacity: { duration: 0.6, ease: [0.42, 0.5, 0.39, 1] }, top: { duration: 0.15 } }
        }}
      />

    </motion.button>
  )
}

export default Secondbutton