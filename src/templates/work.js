import React, { useEffect, useState, useRef } from 'react'
import { graphql } from "gatsby"
import { useScroll } from 'react-use';
import * as styles from '../styles/pages/work.module.scss'
import MetaTag from '../components/metaTag';
import Navbutton from '../components/work/navbutton';
import Task from '../components/work/task';
import Mainbutton from '../components/work/mainbutton';

function Work({ data, pageContext }) {
  const [minHeight, setMinHeight] = useState(0)
  const contentRef = useRef(null);
  const sectionRef = useRef([]);

  const mainRef = useRef(null);

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
          <Mainbutton contentRef={contentRef} scroll={y} section={mainRef} />

          {data.allFile.edges.map((item, index) => {
            const size = sectionRef.current[index]?.getBoundingClientRect();
            const ratio = Math.round((size?.height / minHeight) * 10) / 10;

            return <Navbutton contentRef={contentRef} data={item} scroll={y} height={size?.height} top={size?.top} ratio={ratio} index={index} key={`buttonnav_${index}`} />
          })}
        </nav>
      </div>
      <div className={styles.content} ref={contentRef}>
        <Task pageContext={pageContext} ref={mainRef} />
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