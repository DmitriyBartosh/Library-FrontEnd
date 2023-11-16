import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import State from "./state";
import Detailed from "./detailed";
import Payment from "./payment";

import * as styles from "./work.module.scss";
import Del from "./del";

function Work({ data }) {
  const { work, link, status } = data;
  const activeDeleteStatus = ["checking", "fail", "verified"].some(
    (item) => item === status
  );

  const [showReview, setShowlReview] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const [cost, setCost] = useState(0);

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

  const direction = slugQuery.allDirectionsJson.edges.find(
    (edge) => edge.node.slug === work.direction
  ).node.title;
  const theme = slugQuery.allDirectionsJson.edges
    .find((edge) => edge.node.slug === work.direction)
    .node.works.find((item) => item.slug === work.theme).title;

  useEffect(() => {
    const price = data.expert.price;
    const theme = data.work.theme;
    setCost(price[theme]);
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <p className={styles.subtitle}>
          {direction} / {theme}
        </p>
        <a
          href={link ? link : work.link}
          target="_blank"
          rel="noreferrer"
          className={styles.title}
        >
          {work.name}
        </a>
        {activeDeleteStatus && <Del id={data.id} />}
      </div>
      <State
        data={data}
        cost={cost}
        setShowlReview={setShowlReview}
        setShowPayment={setShowPayment}
      />
      <Detailed
        data={data}
        showReview={showReview}
        setShowlReview={setShowlReview}
      />
      <Payment
        data={data}
        cost={cost}
        setShowPayment={setShowPayment}
        showPayment={showPayment}
      />
    </div>
  );
}

export default Work;
