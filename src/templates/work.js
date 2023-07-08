import React, { useEffect, useState, useRef } from 'react'
import { graphql } from "gatsby"
import { motion } from 'framer-motion'
import { useScroll } from 'react-use';
import * as styles from '../styles/pages/work.module.scss'
import MetaTag from '../components/metaTag';

function NavButton({ contentRef, data, scroll, height, top, ratio, index }) {
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
    className={styles.button}
    key={index}
    initial={{ background: "#f3eee1", height: 0 }}
    whileHover={{
      background: "#43702c",
      color: "#ffffff",
      transition: { duration: 0.3, ease: [0.42, 0.5, 0.39, 1] }
    }}
    animate={{
      height: isActive ? 150 * ratio : 0,
      background: isActive ? "#43702c" : "#f3eee1",
      color: isActive ? "#ffffff" : "#43702c",
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

function Work({ data }) {
  const [minHeight, setMinHeight] = useState(0)
  const contentRef = useRef(null)
  const sectionRef = useRef([])

  const { y } = useScroll(contentRef);

  const sumSections = data.allFile.edges.length;


  useEffect(() => {
    const sections = contentRef.current.childNodes;

    let smallestHeight = Infinity;
    for (let i = 0; i < sections.length; i++) {
      const elementHeight = sections[i].offsetHeight;
      if (elementHeight < smallestHeight) {
        smallestHeight = elementHeight;
      }
    }
    setMinHeight(smallestHeight);

  }, [contentRef])



  return (
    <section className={styles.container}>
      <div className={styles.navigation}>
        <nav>
          {data.allFile.edges.map((item, index) => {
            const size = sectionRef.current[index]?.getBoundingClientRect();
            const ratio = Math.round((size?.height / minHeight) * 10) / 10;

            return <NavButton contentRef={contentRef} data={item} scroll={y} height={size?.height} top={size?.top} ratio={ratio} index={index} key={`buttonnav_${index}`} />
          })}
        </nav>
      </div>
      <div className={styles.content} ref={contentRef}>
        {data.allFile.edges.map((item, index) => {
          const { frontmatter, html } = item.node.childMarkdownRemark;

          return <div
            className={styles.section}
            key={`sectionwork_${index}`}
            ref={el => sectionRef.current[index] = el}
            data-section-number={index + 1}
          >
            <div className={styles.header}>
              <p>{frontmatter.title}</p>
              <p>0{index + 1} / 0{sumSections}</p>
            </div>
            <div className={styles.text} dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        })}
      </div>
    </section>
  )
}

export default Work

export const Head = () => {
  const data = {
    title: "Заголовок",
    description: "Описание к нему",
    image: "../images/persons/kateshmidt/1.jpg",
    slug: "/design/",
    keywords: "Слова",
    preview: "../images/tasklist/1.jpg"
  }


  return <MetaTag data={data} />
}

export const query = graphql`
query designWork($slug: String)  {
  allFile(
    filter: {relativeDirectory: { eq: $slug } }
    sort: {name: ASC}
  ) {
    edges {
      node {
        childMarkdownRemark {
          frontmatter {
            title
          }
          html
        }
      }
    }
  }
}
`