import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby';
import State from './state';
import Detailed from './detailed';

import * as styles from './work.module.scss'

function Work({ data }) {
  const { work, link } = data;

  const [showReview, setShowlReview] = useState(false);

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
`)

  const direction = slugQuery.allDirectionsJson.edges.find(edge => edge.node.slug === work.direction).node.title;
  const theme = slugQuery.allDirectionsJson.edges.find(edge => edge.node.slug === work.direction).node.works.find(item => item.slug === work.theme).title;

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <p className={styles.subtitle}>{direction} / {theme}</p>
        <a href={link ? link : work.link} target='_blank' className={styles.title}>{work.name}</a>
      </div>
      <State
        data={data}
        setShowlReview={setShowlReview} />
      <Detailed
        data={data}
        showReview={showReview}
        setShowlReview={setShowlReview} />
    </div>
  )
}

export default Work