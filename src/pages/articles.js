import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import cx from "classname";
import { useSearchParam } from "react-use";
import { convertDate, convertDateJson } from "../functions/other";
import Topnavigate from "../components/navigation/topnavigate";

import * as global from "../styles/base/global.module.scss";
import * as styles from "../styles/pages/articles.module.scss";

function Articles() {
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

  const tag = useSearchParam("tag");

  console.log(tag);

  return (
    <>
      <Topnavigate />
      <section className={cx(styles.section, global.container)}>
        <p>Статьи</p>
        <div className={styles.list}>
          {data.allFile.edges.map((item, index) => {
            const { slug, title, preview } =
              item.node.childMarkdownRemark.frontmatter;
            const date = convertDateJson(item.node.birthTime);
            const image = getImage(preview);

            const prevDate =
              index !== 0 &&
              convertDate(data.allFile.edges[index - 1].node.birthTime);
            const currentDate = convertDate(
              data.allFile.edges[index].node.birthTime
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
    </>
  );
}

export default Articles;
