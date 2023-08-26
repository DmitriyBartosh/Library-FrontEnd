import React from 'react'

import * as styles from './adminpanel.module.scss'
import { useStaticQuery, graphql } from "gatsby"
import Theme from './theme'
import Profile from './profile'

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
  `)

  const slug = slugQuery.allDirectionsJson.edges.find(item => item.node.slug === data.direction).node;

  return (
    <div className={styles.container}>
      <Profile data={data} slug={slug} />
      <Theme slug={slug} />
    </div>
  )
}

export default Expert