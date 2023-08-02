import React, { useEffect, useState, useRef } from 'react'
import { graphql } from "gatsby"
import { useScroll } from 'react-use';
import { useStateContext } from '../context/ContextProvider';
import * as styles from '../styles/pages/work.module.scss'
import MetaTag from '../components/metaTag';
import Navbutton from '../components/work/navbutton';
import Task from '../components/work/task';
import Specification from '../components/work/specification';
import Mainbutton from '../components/work/mainbutton';
import Secondbutton from '../components/work/secondbutton'

function Work({ data, pageContext }) {
  const [minHeight, setMinHeight] = useState(0)
  const [maxHeight, setMaxHeight] = useState(0)
  const contentRef = useRef(null);
  const sectionRef = useRef([]);

  const { fontSize } = useStateContext();

  const firstSpecification = data.allSpecification.edges[0].node.childMarkdownRemark;
  const [selectedSpecification, setSelectedSpecification] = useState({
    frontmatter: firstSpecification.frontmatter,
    html: firstSpecification.html,
    index: 0
  });

  const checklist = data.allChecklist.edges[selectedSpecification.index].node.childMarkdownRemark;

  const mainRef = useRef(null);
  const specificationRef = useRef(null)

  const specificationTop = specificationRef.current?.getBoundingClientRect().top;
  const specificationHeight = specificationRef.current?.getBoundingClientRect().height;
  const quantity = data.allChecklist.edges.length;


  const { y } = useScroll(contentRef);

  const sumSections = data.allSteps.edges.length;
  const specification = data.allSpecification.edges;

  useEffect(() => {
    const sections = contentRef.current.childNodes;

    let smallestHeight = Infinity;
    let biggestHeight = 0;
    for (let i = 0; i < sections.length; i++) {
      const elementHeight = sections[i].offsetHeight;
      if (elementHeight < smallestHeight) {
        smallestHeight = elementHeight;
      }
    }

    for (let i = 0; i < sections.length; i++) {
      const elementHeight = sections[i].offsetHeight;
      if (elementHeight > biggestHeight) {
        biggestHeight = elementHeight;
      }
    }
    setMaxHeight(biggestHeight);
    setMinHeight(smallestHeight);
  }, [contentRef])

  useEffect(() => {
    const links = contentRef.current.querySelectorAll("a");
    links.forEach((link) => link.setAttribute("target", "_blank"));
  }, [])


  return (
    <section className={styles.container}>
      <div className={styles.navigation}>
        <nav>
          <Mainbutton contentRef={contentRef} scroll={y} section={mainRef} theme={pageContext.title} />
          <Secondbutton selected={selectedSpecification.frontmatter} contentRef={contentRef} top={specificationTop} height={specificationHeight} scroll={y} section={mainRef} />
          {data.allSteps.edges.map((item, index) => {
            const size = sectionRef.current[index]?.getBoundingClientRect();
            const difference = maxHeight - minHeight;

            const ratio = Math.round(((Math.round(size?.height - minHeight) / difference) + 1) * 10) / 10;

            return <Navbutton contentRef={contentRef} data={item} scroll={y} height={size?.height} top={size?.top} ratio={ratio} index={index} key={`buttonnav_${index}`} />
          })}
        </nav>
      </div>
      <div className={styles.content} ref={contentRef} data-font-size={fontSize}>
        <Task pageContext={pageContext} ref={mainRef} checklist={checklist} quantity={quantity} />
        <Specification selected={selectedSpecification} setSelected={setSelectedSpecification} data={specification} sumSections={sumSections} ref={specificationRef} />
        {data.allSteps.edges.map((item, index) => {
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

export const Head = ({ pageContext }) => {
  const { title, description } = pageContext;

  const data = {
    title: `Графикси | ${title}`,
    description: description,
    image: "../images/persons/kateshmidt/1.jpg",
    slug: "/design/",
    keywords: "Слова",
    preview: "../images/tasklist/1.jpg"
  }


  return <MetaTag data={data} />
}


export const query = graphql`
query designWork($slug: String, $specification: String, $checklist: String)  {
allSteps: allFile(
  filter: {
    relativeDirectory: {eq: $slug}
  }
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
allChecklist: allFile(
  filter: {
    relativeDirectory: {eq: $checklist}
  }
  sort: {name: ASC}
) {
  edges {
    node {
      childMarkdownRemark {
        frontmatter {
          title
          hint
        }
        html
      }
    }
  }
}
allSpecification: allFile(
  filter: {
    relativeDirectory: {eq: $specification}
  }
  sort: {name: ASC}
) {
  edges {
    node {
      childMarkdownRemark {
        frontmatter {
          title
          time
          complexity
        }
        html
      }
    }
  }
}
}
`