import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollTo } from "../../functions/smoothscroll";
import cx from "classname";
import * as styles from "./secondbutton.module.scss";

function Secondbutton({
  selected,
  scroll,
  top,
  height,
  contentRef,
  navigateRef,
}) {
  const timeoutRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    // Отступ от которого секция в поле видимости верхней границы экрана считается активной
    const offset = -1 * (top - 75);

    // Если в верхняя граница находится в поле секции, то она активна и просчитываем прогресс для точки
    if (offset > 0 && offset < height + 75) {
      setIsActive(true);
      setProgress(offset / height);
    } else setIsActive(false);
  }, [height, top, scroll]);

  const scrollToSection = () => {
    const element = document.querySelector(`[data-section-number="${0}"]`);
    contentRef.current.scrollTo({
      top: element.offsetTop - 74,
      behavior: "instant",
    });
  };

  useEffect(() => {
    const element = navigateRef.current;
    // Отменить предыдущий setTimeout, если он существует
    clearTimeout(timeoutRef.current);

    // Установить новый setTimeout
    if (isActive) {
      timeoutRef.current = setTimeout(() => {
        const from = element.scrollTop;
        // Рассчитываем время исходя из длины прокрутки
        const time = Math.min(from * 4, 1200);

        scrollTo(element, from, 50, time);
      }, 1200);
    } else {
      clearTimeout(timeoutRef.current);
    }

    // Очистить setTimeout при размонтировании компонента
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [isActive]);

  return (
    <motion.button
      className={cx(styles.container, isActive && styles.active)}
      initial={{ height: 0 }}
      key="secondbutton"
      animate={{
        height: isActive ? 150 : 0,
        transition: { duration: 0.6, ease: [0.42, 0.5, 0.39, 1] },
      }}
      layout="size"
      onClick={scrollToSection}
    >
      <div className={styles.head}>
        <span className={styles.number}>00</span>
        <AnimatePresence initial={false} mode="popLayout">
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.3,
                  duration: 0.4,
                  ease: [0.25, 0.62, 0.58, 1],
                },
              }}
              exit={{ opacity: 0, y: -10 }}
              className={styles.level}
              key="level"
            >
              <p>
                Сложность: <span>{selected.complexity}</span>
              </p>
              <p>
                Сроки: <span>{selected.time}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={styles.text}>
        <p>Техническое задание</p>
      </div>

      <motion.span
        className={styles.dot}
        animate={{
          top: `calc((100% - 42px) * ${progress} + 12px)`,
          opacity: isActive ? 1 : 0,
          visibility: isActive ? "visible" : "hidden",
          transition: {
            opacity: { duration: 0.6, ease: [0.42, 0.5, 0.39, 1] },
            top: { duration: 0.15 },
          },
        }}
      />
    </motion.button>
  );
}

export default Secondbutton;
