import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby';
import { IoTrashOutline } from "react-icons/io5";
import * as styles from './work.module.scss'

function Work({ data }) {
  const { work, status } = data;

  const [isCopied, setIsCopied] = useState(false);

  const copiedLink = (link) => {
    if (!isCopied) {
      setIsCopied(true);
      navigator.clipboard.writeText(link);

      setTimeout(() => {
        setIsCopied(false);
      }, 800);
    }
  }

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
      <div className={styles.head}>
        <p className={styles.subtitle}>{direction} / {theme}</p>
        <a href={work.link} target='_blank' className={styles.title}>{work.name}</a>
      </div>
      <div className={styles.status}>
        {status === 'link checking' &&
          <div className={styles.block}>
            <div className={styles.message}>
              <p>В обработке</p>
            </div>
            <button className={styles.cancel}>
              <div className={styles.icon}>
                <IoTrashOutline className={styles.svg} />
              </div>
            </button>
          </div>
        }
      </div>
    </div>
  )
}

export default Work