import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import * as styles from "./progress.module.scss";
import { useStateContext } from "../../context/ContextProvider";
import Direction from "./direction";

function Progress() {
  const { statusDirection } = useStateContext();

  const directionQuery = useStaticQuery(graphql`
    query {
      allDirectionsJson {
        edges {
          node {
            slug
            title
            works {
              title
              slug
              tags
              description
            }
            about
          }
        }
      }
    }
  `);

  return (
    <div className={styles.container}>
      {statusDirection &&
        Object.entries(statusDirection).map(([key, value]) => {
          const directionData = directionQuery.allDirectionsJson.edges.find(
            (item) => item.node.slug === key
          ).node;
          return (
            value && <Direction data={directionData} key={`direction_${key}`} />
          );
        })}
    </div>
  );
}

export default Progress;
