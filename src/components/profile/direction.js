import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

import * as styles from "./direction.module.scss";
import * as global from "../../styles/base/global.module.scss";
import { useStateContext } from "../../context/ContextProvider";

function Direction() {
  const { subscribes } = useStateContext();

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

          console.log(themes);

          return (
            <div className={styles.direction} key={`direction_${index}`}>
              <h3>{themes.title}</h3>
              <div className={styles.themes}>
                {themes.works.map((item, index) => {
                  const { title, time, tags, complexity } = item;

                  return (
                    <div className={styles.item} key={`theme_${index}`}>
                      <div className={styles.head}>
                        <p className={styles.title}>{title}</p>
                        <div className={styles.tags}>
                          {tags.map((item, index) => {
                            return <p key={`tag_${index}`}>#{item}</p>;
                          })}
                        </div>
                      </div>
                      <div className={styles.complexity}>
                        <p>
                          Сложность: <span>{complexity}/10</span>
                        </p>
                        <p>
                          Время: <span>{time}</span>
                        </p>
                      </div>
                      <div className={styles.action}>
                        <Link
                          to={`/${themes.slug}/${item.slug}`}
                          className={styles.subscription}
                        >
                          <p className={styles.text}>Продолжить</p>
                        </Link>
                      </div>
                    </div>
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
