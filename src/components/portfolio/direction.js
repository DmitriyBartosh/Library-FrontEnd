import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import * as styles from "./direction.module.scss";
import * as global from "../../styles/base/global.module.scss";
import { useStateContext } from "../../context/ContextProvider";
import Theme from "./theme";

function Direction() {
  const { subscribes, works } = useStateContext();

  const directionQuery = useStaticQuery(graphql`
    query {
      allDirectionsJson {
        edges {
          node {
            slug
            title
            active
            about
            price
            works {
              title
              slug
              time
              tags
              steps
              complexity
              description
            }
          }
        }
      }
    }
  `);

  const directions = directionQuery.allDirectionsJson.edges;
  const activeDirection = subscribes?.filter(
    (item) => item.active && item.transaction_status === "succeeded"
  );

  return (
    <div className={global.container}>
      <div className={styles.container}>
        {activeDirection?.map((item, index) => {
          const { plan } = item;
          const themes = directions.find(
            (item) => item.node.slug === plan
          ).node;

          return (
            <div className={styles.direction} key={`direction_${index}`}>
              <h3>{themes.title}</h3>
              <div className={styles.themes}>
                {themes.works.map((item, index) => {
                  const worksOnTheme = works.filter(
                    (work) =>
                      work.direction === themes.slug && work.theme === item.slug
                  );

                  return (
                    <Theme
                      key={`theme_${index}`}
                      data={item}
                      themes={themes}
                      worksOnTheme={worksOnTheme}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Direction;
