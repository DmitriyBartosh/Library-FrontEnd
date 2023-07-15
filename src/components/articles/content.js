import React from 'react'
import * as styles from './content.module.scss'

function Content({ html, frontmatter, excerpt }) {
  const { title, subtitle } = frontmatter;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>{title}</h2>
        <h4>{subtitle}</h4>
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} className={styles.text} />
    </div>
  )
}

export default Content