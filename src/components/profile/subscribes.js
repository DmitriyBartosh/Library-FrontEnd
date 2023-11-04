import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import cx from "classname";
import { IoAddSharp } from "react-icons/io5";
import { useStateContext } from "../../context/ContextProvider";

import * as global from "../../styles/base/global.module.scss";
import * as styles from "./subscribes.module.scss";

function Subscribes() {
  const { subscribes } = useStateContext();

  const active = subscribes.filter((item) => item.active);

  const directionQuery = useStaticQuery(graphql`
    query {
      allDirectionsJson {
        edges {
          node {
            slug
            title
          }
        }
      }
    }
  `);
  const allDirection = directionQuery.allDirectionsJson.edges;

  console.log(allDirection);

  return (
    <div className={styles.container}>
      {active.length > 0 ? (
        <div className={styles.status}>
          {active.map((item, index) => {
            const { title } = allDirection.find(
              (dir) => dir.node.slug === item.plan
            ).node;

            return (
              <div key={`subscribe_${index}`} className={styles.item}>
                <div className={styles.name}>
                  <p>{title}</p>
                </div>
                <p className={styles.day}>
                  осталось <span>{item.days_left}</span> дн.
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <p>Ссылка на направление</p>
        </div>
      )}
    </div>
  );
}

export default Subscribes;
