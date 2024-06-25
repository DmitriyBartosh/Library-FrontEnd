import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Linkwork from "../linkwork";

import * as styles from "./detail.module.scss";

function Detail({ detail }) {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          sourceInstanceName: { eq: "works" }
          extension: { eq: "md" }
          relativeDirectory: { regex: "/specifications/" }
        }
      ) {
        edges {
          node {
            relativeDirectory
            childMarkdownRemark {
              html
              frontmatter {
                title
              }
            }
          }
        }
      }
    }
  `);

  const specification = data.allFile.edges.find(
    (edge) => edge.node.relativeDirectory === detail.specifications
  );

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>{detail.data.title}</h2>

      <h5 className={styles.subtitle}>Добавлена работа</h5>

      <div className={styles.work}>
        {detail.works.map((item, index) => {
          return <Linkwork data={item} index={index} key={`link_${index}`} />;
        })}
      </div>

      <h5 className={styles.subtitle}>Техническое задание</h5>

      <div className={styles.specification}>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{
            __html: specification.node.childMarkdownRemark.html,
          }}
        />
      </div>
    </div>
  );
}

export default Detail;
