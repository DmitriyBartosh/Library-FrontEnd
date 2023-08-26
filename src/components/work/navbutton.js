import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as styles from './navbutton.module.scss'


function Navbutton({ contentRef, data, scroll, height, top, ratio, index }) {
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(null)

  const { frontmatter } = data.node.childMarkdownRemark;

  useEffect(() => {
    // Отступ от которого секция в поле видимости верхней границы экрана считается активной
    const offset = -1 * (top - 31);

    // Если в верхняя граница находится в поле секции, то она активна и просчитываем прогресс для точки
    if (offset > 0 && offset < height + 31) {
      setIsActive(true);
      setProgress(offset / height)
    } else setIsActive(false);
  }, [height, top, scroll])

  const scrollToSection = () => {
    const element = document.querySelector(`[data-section-number="${index + 1}"]`);
    contentRef.current.scrollTo({ top: element.offsetTop - 30, behavior: "instant" });
  };



  return <motion.button
    className={styles.container}
    initial={{ background: "#f3eee1", height: 0 }}
    key={`navbutton_${index}`}
    whileHover={{
      background: "#436b4c",
      color: "#ffffff",
      transition: { duration: 0.3, ease: [0.42, 0.5, 0.39, 1] }
    }}
    animate={{
      height: isActive ? 150 * ratio : 0,
      background: isActive ? "#436b4c" : "#f3eee1",
      color: isActive ? "#ffffff" : "#436b4c",
      transition: { duration: 0.6, ease: [0.42, 0.5, 0.39, 1] }
    }}
    layout='size'
    onClick={scrollToSection}
  >
    <span className={styles.number}>0{index + 1}</span>
    <span className={styles.text}>{frontmatter.title}</span>
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
}

export default Navbutton