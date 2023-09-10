import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby';
import State from './state/state';

import * as styles from './work.module.scss'
import Detailed from './detailed';


function Work({ data }) {
  const { user, work } = data;

  const [showDetailed, setShowDetailed] = useState(false);

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
        <a href={work.link} target='_blank' rel="noreferrer" className={styles.title}>{work.name}</a>
        <p>{user.name}</p>
        <a href={`mailto:${user.email}`} className={styles.mail}>
          {user.email}
        </a>
      </div>
      <State data={data} setShowDetailed={setShowDetailed} />
      <Detailed data={data} showDetailed={showDetailed} setShowDetailed={setShowDetailed} />
    </div>
  )
}

export default Work