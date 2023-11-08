import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { scrollTo } from "../../functions/smoothscroll";
import cx from "classname";
import * as styles from "./navbutton.module.scss";

function Navbutton({
  contentRef,
  navigateRef,
  data,
  scroll,
  height,
  top,
  ratio,
  index,
}) {
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(null);

  const timeoutRef = useRef(null);

  const { frontmatter } = data.node.childMarkdownRemark;

  useEffect(() => {
    // Отступ от которого секция в поле видимости верхней границы экрана считается активной
    const offset = -1 * (top - 74);

    // Если в верхняя граница находится в поле секции, то она активна и просчитываем прогресс для точки
    if (offset > 0 && offset < height + 74) {
      setIsActive(true);
      setProgress(offset / height);
    } else setIsActive(false);
  }, [height, top, scroll]);

  const scrollToSection = () => {
    const element = document.querySelector(
      `[data-section-number="${index + 1}"]`
    );
    contentRef.current.scrollTo({
      top: element.offsetTop - 55,
      behavior: "instant",
    });
  };

  useEffect(() => {
    const element = navigateRef.current;
    // Отступ сверху от двух элементов, заголовок и техническое задание
    const offsetTop = 90 * 2 + 15 * 3;
    // Отменить предыдущий setTimeout, если он существует
    clearTimeout(timeoutRef.current);

    // Установить новый setTimeout
    if (isActive) {
      timeoutRef.current = setTimeout(() => {
        const remainingScroll =
          element.scrollHeight - (element.scrollTop + element.clientHeight);
        // Считаем положение прокрутки исходя из индекса активного элемента
        const offset = offsetTop - 100 + index * 90 + index * 15;

        const from = element.scrollTop;
        // Если до конца прокрутки меньше пикселей чем задано изначально в анимации, то берем меньшее значение
        const to =
          offset - from > 0 && offset - from > remainingScroll
            ? from + remainingScroll
            : offset;

        // Рассчитываем время исходя из длины прокрутки
        const time = Math.min(Math.abs(to - from) * 4, 1200);

        scrollTo(element, from, to, time);
      }, 2500);
    }

    // Очистить setTimeout при размонтировании компонента
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [isActive]);

  const count = index >= 9 ? index + 1 : "0" + (index + 1);

  return (
    <motion.button
      className={cx(styles.container, isActive && styles.active)}
      initial={{ height: 0 }}
      key={`navbutton_${index}`}
      animate={{
        height: isActive ? 120 * ratio : 0,
        transition: { duration: 0.6, ease: [0.42, 0.5, 0.39, 1] },
      }}
      layout="size"
      onClick={scrollToSection}
    >
      <span className={styles.number}>{count}</span>
      <span className={styles.text}>{frontmatter.title}</span>
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

export default Navbutton;
