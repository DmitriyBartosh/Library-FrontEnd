import React from "react";
import cx from "classname";
import { useStaticQuery, graphql, Link } from "gatsby";
import * as styles from "./experts.module.scss";
import * as global from "../../styles/base/global.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

function Experts() {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          sourceInstanceName: { eq: "experts" }
          relativeDirectory: { eq: "preview" }
        }
      ) {
        edges {
          node {
            name
            childMarkdownRemark {
              frontmatter {
                name
                direction
                themefromdireciton
                preview_photo {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }
      }
      allDirectionsJson {
        edges {
          node {
            slug
            works {
              title
            }
          }
        }
      }
    }
  `);

  const expert = data.allFile.edges;

  return (
    <section className={styles.section}>
      <h3>Эксперты площадки</h3>
      <div className={styles.list}>
        {expert.map((item, index) => {
          const { frontmatter } = item.node.childMarkdownRemark;
          const themes = data.allDirectionsJson.edges.find(
            (item) => item.node.slug === frontmatter.themefromdireciton
          ).node.works;
          const slug = item.node.name;

          const imagePreview = getImage(frontmatter.preview_photo);

          return (
            <div className={styles.item} key={index}>
              <div className={cx(styles.expert, global.container)}>
                <div className={styles.preview}>
                  <GatsbyImage
                    image={imagePreview}
                    alt={`Эксперт ${frontmatter.name}`}
                    className={styles.gatsbyimage}
                  />
                </div>
                <div className={styles.block}>
                  <div className={styles.head}>
                    <h4>Эксперт {frontmatter.name}</h4>
                    <Link
                      to={`/directions/${frontmatter.themefromdireciton}`}
                      className={styles.direction}
                    >
                      Направление: {frontmatter.direction}
                    </Link>
                  </div>
                  <div className={styles.info}>
                    <div className={styles.themes}>
                      <p className={styles.title}>
                        <span>Список тем:</span>
                      </p>
                      <div className={styles.all}>
                        {themes.map((item, index) => {
                          return <p key={index}>#{item.title}</p>;
                        })}
                      </div>
                    </div>

                    <Link
                      to={`/experts/${slug}`}
                      className={cx(global.buttontext, styles.buttonorange)}
                    >
                      <p className={global.text}>Подробнее</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Experts;
