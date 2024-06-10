import React, { useEffect, useState, useRef } from "react";
import { graphql, navigate } from "gatsby";
import { useScroll, useEffectOnce } from "react-use";
import { useIsDesktop, useIsTablet } from "../hooks/mediaQuery";
import { useStateContext } from "../context/ContextProvider";

import MetaTag from "../components/metaTag";
import Navbutton from "../components/work/navbutton";
import Task from "../components/work/task";
import Specification from "../components/work/specification";
import Mainbutton from "../components/work/mainbutton";
import Secondbutton from "../components/work/secondbutton";
import Rightnavigate from "../components/navigation/rightnavigate";
import Addwork from "../components/work/addwork";
import Feedback from "../components/work/feedback";
import Bottomnavigate from "../components/navigation/bottomnavigate";

import * as styles from "../styles/pages/work.module.scss";

function Work({ data, pageContext }) {
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();

  const { works, subscribes, isLoggedIn } = useStateContext();
  const [isVisibleWork, setIsVisibleWork] = useState(false);

  const [feedback, setFeedback] = useState(false);

  const [minHeight, setMinHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [relatedwork, setRelatedwork] = useState(null);
  const [thereIsWork, setThereIsWork] = useState(null);

  const navigateRef = useRef(null);
  const contentRef = useRef(null);
  const sectionRef = useRef([]);

  const { theme, direction, free, programs, title } = pageContext;

  // Проверяем активна ли подписка на направление или тема бесплатная
  const isActiveSubscribe =
    subscribes &&
    subscribes.some((item) => item.plan === direction && item.active === true);

  useEffectOnce(() => {
    if (!isLoggedIn()) {
      navigate("/auth");
    }
    if (!isActiveSubscribe && !free) {
      navigate("/profile");
    }
  });

  const firstSpecification =
    data.allSpecification.edges[0].node.childMarkdownRemark;
  const [selectedSpecification, setSelectedSpecification] = useState({
    frontmatter: firstSpecification.frontmatter,
    html: firstSpecification.html,
    title: firstSpecification.frontmatter.title,
  });

  // ищем нужный чеклист по имени работы в выбранном селекте
  const checklist = data.allChecklist.edges
    .filter(
      (item) =>
        item.node.childMarkdownRemark.frontmatter.title ===
        selectedSpecification.title
    )
    .find((item) => item);

  const mainRef = useRef(null);
  const specificationRef = useRef(null);

  const specificationTop =
    specificationRef.current?.getBoundingClientRect().top;
  const specificationHeight =
    specificationRef.current?.getBoundingClientRect().height;

  const { y } = useScroll(contentRef);

  const sumSections =
    data.allSteps.edges.length > 9
      ? data.allSteps.edges.length
      : "0" + data.allSteps.edges.length;
  const specification = data.allSpecification.edges;

  useEffect(() => {
    const sections = contentRef.current?.childNodes;

    let smallestHeight = Infinity;
    let biggestHeight = 0;

    if (sections) {
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
    }
  }, [contentRef]);

  useEffect(() => {
    if (contentRef) {
      contentRef.current
        ?.querySelectorAll("a")
        .forEach((link) => link.setAttribute("target", "_blank"));
    }
  }, [contentRef]);

  useEffect(() => {
    if (works) {
      const related = works.filter(
        (item) => item.direction === direction && item.theme === theme
      );

      // Все работы по теме
      setRelatedwork(related);
      // Прикреплена ли работа по теме
      setThereIsWork(
        related.some((item) => item.name === selectedSpecification.title)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [works]);

  return (
    (isActiveSubscribe || free) && (
      <>
        <div className={styles.container}>
          <div className={styles.navigation} ref={navigateRef}>
            <nav>
              <Mainbutton
                selected={selectedSpecification.frontmatter}
                contentRef={contentRef}
                navigateRef={navigateRef}
                scroll={y}
                section={mainRef}
                theme={pageContext.title}
              />
              <Secondbutton
                selected={selectedSpecification.frontmatter}
                contentRef={contentRef}
                navigateRef={navigateRef}
                top={specificationTop}
                height={specificationHeight}
                scroll={y}
                section={mainRef}
              />
              {data.allSteps.edges.map((item, index) => {
                const size = sectionRef.current[index]?.getBoundingClientRect();
                const difference = maxHeight - minHeight;

                const ratio =
                  Math.round(
                    (Math.round(size?.height - minHeight) / difference + 1) * 10
                  ) / 10;

                return (
                  <Navbutton
                    contentRef={contentRef}
                    navigateRef={navigateRef}
                    data={item}
                    scroll={y}
                    height={size?.height}
                    top={size?.top}
                    ratio={ratio}
                    index={index}
                    key={`buttonnav_${index}`}
                  />
                );
              })}
            </nav>
          </div>
          <div className={styles.content} ref={contentRef}>
            <div className={styles.head}>
              <Task
                data={specification}
                selected={selectedSpecification}
                setSelected={setSelectedSpecification}
                ref={mainRef}
              />
              <Specification
                html={selectedSpecification.html}
                programs={programs}
                sumSections={sumSections}
                ref={specificationRef}
              />
            </div>

            {data.allSteps.edges.map((item, index) => {
              const { frontmatter, html } = item.node.childMarkdownRemark;

              return (
                <section
                  className={styles.section}
                  key={`sectionwork_${index}`}
                  ref={(el) => (sectionRef.current[index] = el)}
                  data-section-number={index + 1}
                >
                  <div className={styles.header}>
                    <p className={styles.title}>{frontmatter.title}</p>
                  </div>
                  <div
                    className={styles.text}
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </section>
              );
            })}
          </div>
          {isDesktop && (
            <Rightnavigate
              openFeetback={() => setFeedback(true)}
              addWork={() => setIsVisibleWork(true)}
              thereIsWork={thereIsWork}
            />
          )}
          {isTablet && (
            <Bottomnavigate
              openFeetback={() => setFeedback(true)}
              addWork={() => setIsVisibleWork(true)}
              thereIsWork={thereIsWork}
            />
          )}
        </div>
        <Addwork
          visible={isVisibleWork}
          close={() => setIsVisibleWork(false)}
          pageContext={pageContext}
          checklist={checklist.node.childMarkdownRemark}
          selected={selectedSpecification}
          relatedwork={relatedwork}
          thereIsWork={thereIsWork}
          setSelected={setSelectedSpecification}
        />
        <Feedback
          close={() => setFeedback(false)}
          visible={feedback}
          theme={title}
        />
      </>
    )
  );
}

export default Work;

export const Head = ({ pageContext }) => {
  const { title, description, slug } = pageContext;

  const data = {
    title: `Графикси | ${title}`,
    description: description,
    image: "../images/persons/kateshmidt/1.jpg",
    slug: `/${slug}`,
    keywords: "Слова",
    preview: "../images/tasklist/1.jpg",
  };

  return <MetaTag data={data} />;
};

export const query = graphql`
  query designWork($slug: String, $specification: String, $checklist: String) {
    allSteps: allFile(
      filter: { relativeDirectory: { eq: $slug } }
      sort: { childMarkdownRemark: { frontmatter: { count: ASC } } }
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
      filter: { relativeDirectory: { eq: $checklist } }
      sort: { name: ASC }
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
      filter: { relativeDirectory: { eq: $specification } }
      sort: { name: ASC }
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
`;
