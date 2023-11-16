import React from "react";
import cx from "classname";
import { useStaticQuery, graphql } from "gatsby";
import Theme from "./theme";
import Profile from "./profile";
import Review from "./review";

import * as global from "../../../styles/base/global.module.scss";

function Expert({ data }) {
  const slugQuery = useStaticQuery(graphql`
    query {
      allDirectionsJson {
        edges {
          node {
            slug
            title
            works {
              title
              slug
            }
          }
        }
      }
    }
  `);

  const slug = slugQuery.allDirectionsJson.edges.find(
    (item) => item.node.slug === data.direction
  ).node;

  return (
    <section className={cx(global.container, global.top)}>
      <Profile data={data} slug={slug} />
      <Review />
      <Theme slug={slug} />
    </section>
  );
}

export default Expert;
