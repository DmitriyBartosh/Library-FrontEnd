import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import * as styles from './progress.module.scss';
import { useStateContext } from '../../context/ContextProvider';
import Direction from './direction';

function Progress() {
  const { statusDirection } = useStateContext();

  const design = useStaticQuery(graphql`
  query {
    directionsJson(title: {eq: "Графический дизайн"}) {
      title
      slug
      about
      works {
        slug
        title
        description
        tags
      }
    }
  }
`)

  return (
    <div className={styles.container}>
      {statusDirection?.design && <Direction data={design.directionsJson} />}
    </div>
  )
}

export default Progress