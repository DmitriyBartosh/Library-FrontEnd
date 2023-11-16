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
  const activeDirection = subscribes?.filter((item) => item.active);

  return (
    <div className={styles.container}>
      {activeDirection?.map((item, index) => {
        const { plan } = item;
        const themes = directions.find((item) => item.node.slug === plan).node;

        const sortedThemes = themes.works.sort((a, b) => {
          const worksOnThemeA = works.filter(
            (work) => work.direction === themes.slug && work.theme === a.slug
          );
          const worksOnThemeB = works.filter(
            (work) => work.direction === themes.slug && work.theme === b.slug
          );

          if (worksOnThemeA.length === 0 && worksOnThemeB.length > 0) {
            return -1;
          } else if (worksOnThemeA.length > 0 && worksOnThemeB.length === 0) {
            return 1;
          } else {
            return 0;
          }
        });

        return (
          Array.isArray(works) && (
            <div className={styles.direction} key={`direction_${index}`}>
              <h1>{themes.title}</h1>
              <div className={styles.themes}>
                {sortedThemes.map((item, index) => {
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
          )
        );
      })}
    </div>
  );
}

export default Direction;
