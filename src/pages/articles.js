import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql, Link, navigate } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import cx from "classname";
import { useSearchParam } from "react-use";
import { useIsDesktop, useIsTablet } from "../hooks/mediaQuery";
import { convertDate, convertDateJson } from "../functions/other";
import Topnavigate from "../components/navigation/topnavigate";
import Topmobilenavigate from "../components/navigation/topmobilenavigate";
import Footer from "../components/footer";
import MetaTag from "../components/metaTag";

import * as global from "../styles/base/global.module.scss";
import * as styles from "../styles/pages/articleslist.module.scss";

function Articles() {
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();

  const tag = useSearchParam("tag");
  const [tagParams, setTagParams] = useState(tag);
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: { sourceInstanceName: { eq: "articles" } }
        sort: { birthTime: ASC }
      ) {
        edges {
          node {
            birthTime
            childMarkdownRemark {
              timeToRead
              frontmatter {
                slug
                title
                tags
                preview {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const uniqueTags = [
    ...new Set(
      data.allFile.edges.flatMap(
        (obj) => obj.node.childMarkdownRemark.frontmatter.tags
      )
    ),
  ];

  const filterArticles =
    tagParams === null
      ? data.allFile.edges
      : data.allFile.edges.filter((item) =>
          item.node.childMarkdownRemark.frontmatter.tags.includes(tagParams)
        );

  function selectTag(name) {
    if (name === tagParams) {
      setTagParams(null);
      navigate(`/articles`);
    } else {
      setTagParams(name);
      navigate(`/articles?tag=${name}`);
    }
  }

  useEffect(() => {
    setTagParams(tag);
  }, [tag]);

  return (
    <>
      {isDesktop && <Topnavigate />}
      {isTablet && <Topmobilenavigate />}
      <section className={cx(global.container, global.top)}>
        <h1 className={styles.head}>Полезные статьи</h1>
        <div className={styles.tags}>
          <button
            className={cx(
              global.buttontext,
              styles.tag,
              tagParams === null && styles.active
            )}
            onClick={() => {
              setTagParams(null);
              navigate(`/articles`);
            }}
          >
            <p className={global.text}>Все статьи</p>
          </button>
          {uniqueTags.map((item, index) => {
            return (
              <button
                className={cx(
                  global.buttontext,
                  styles.tag,
                  item === tagParams && styles.active
                )}
                onClick={() => selectTag(item)}
                key={`tag-button_${index}`}
              >
                <p className={global.text}>{item}</p>
              </button>
            );
          })}
        </div>
        <div className={styles.list}>
          {filterArticles.map((item, index) => {
            const { slug, title, preview } =
              item.node.childMarkdownRemark.frontmatter;
            const date = convertDateJson(item.node.birthTime);
            const image = getImage(preview);

            const prevDate =
              index !== 0 &&
              convertDate(filterArticles[index - 1].node.birthTime);
            const currentDate = convertDate(
              filterArticles[index].node.birthTime
            );

            const notunique = prevDate === currentDate;

            return (
              <div
                key={`article-link_${index}`}
                className={cx(styles.link, notunique && styles.notunique)}
              >
                <div className={styles.date}>
                  <p className={styles.day}>{date.day}</p>
                  <p className={styles.month}>{date.month}</p>
                </div>
                <Link to={`/articles/${slug}`} className={styles.article}>
                  <h2 className={styles.title}>{title}</h2>
                  <div className={styles.preview}>
                    <GatsbyImage
                      className={styles.gatsbyimage}
                      image={image}
                      alt={`Постер к статье ${title}`}
                    />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
}

export const Head = () => {
  const title = "Полезные статьи";
  const description =
    "Полезные статьи которые пригодятся тебе при изучении материалов от наших экспертов";

  const data = {
    title: `Графикси | ${title}`,
    description: description,
    slug: `/articles`,
    preview: "/preview.png",
  };

  return <MetaTag data={data} />;
};

export default Articles;
