import React from 'react'
import { useStaticQuery, graphql } from 'gatsby';
import * as styles from './work.module.scss'

function Work({ data }) {
  const { user, work, status } = data;

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

  console.log(user)

  const direction = slugQuery.allDirectionsJson.edges.find(edge => edge.node.slug === work.direction).node.title;
  const theme = slugQuery.allDirectionsJson.edges.find(edge => edge.node.slug === work.direction).node.works.find(item => item.slug === work.theme).title;

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <p className={styles.subtitle}>{direction} / {theme}</p>
        <a href={work.link} target='_blank' className={styles.title}>{work.name}</a>
        <p>{user.name}</p>
        <a href={`mailto:${user.email}`} className={styles.mail}>
          {user.email}
        </a>
      </div>
      <div className={styles.status}>
        {status === 'link checking' &&
          <div className={styles.block}>
            <button className={styles.current}>
              <p className={styles.text}>Все в порядке</p>
            </button>
            <button className={styles.fail}>
              <p className={styles.text}>Ошибка</p>
            </button>
          </div>
        }
      </div>
    </div>
  )
}

export default Work