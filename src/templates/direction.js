import React from "react";
import cx from "classname";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby";

import Main from "../components/navigation/main";
import * as styles from "../styles/pages/directions.module.scss";
import * as global from "../styles/base/global.module.scss";

function Direction(context) {
  const { about, title, works } = context.pageContext.data;
  console.log(context.pageContext.data);

  const directionQuery = useStaticQuery(graphql`
    query {
      allDirectionsJson {
        edges {
          node {
            slug
            title
            active
            about
            works {
              title
              slug
              tags
              description
            }
          }
        }
      }
    }
  `);

  const direction = directionQuery.allDirectionsJson.edges;

  return (
    <>
      <Main />
      <section className={cx(styles.section, global.container)}>
        <div className={styles.direction}>
          <div className={styles.title}>
            <h2>Направление {title}</h2>
          </div>

          <div className={styles.list}>
            {direction.map((item, index) => {
              const { title, slug, active } = item.node;

              console.log(active);

              return (
                <Link
                  to={`/directions/${slug}`}
                  className={cx(styles.link, !active && styles.hidden)}
                  activeClassName={styles.active}
                  key={`direction_${index}`}
                >
                  <p className={styles.text}>{title}</p>
                </Link>
              );
            })}
          </div>
        </div>
        <div className={styles.themes}>
          {works.map((item, index) => {
            const { title } = item;
            console.log(title);

            return (
              <div className={styles.theme} key={`theme_${index}`}>
                <p className={styles.title}>{title}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Direction;
