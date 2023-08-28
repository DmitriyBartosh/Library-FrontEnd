import React from 'react'
import { useStaticQuery, graphql } from 'gatsby';
import * as styles from './work.module.scss'

function Work({ data }) {
  const { work, status } = data;

  const workStatus = {
    'link checking': "В обрбаботке"
  }

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
      <div className={styles.block}>
        <p>{direction}</p>
      </div>
      <div className={styles.block}>
        <p>{theme}</p>
      </div>
      <div className={styles.block}>
        <p>{work.name}</p>
      </div>
      <div className={styles.block}>
        <p>{work.link}</p>
      </div>

      <div className={styles.block}>
        <p>{workStatus[status]}</p>
      </div>

    </div>
  )
}

export default Work