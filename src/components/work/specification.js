import React, { forwardRef } from 'react'
import * as styles from './specification.module.scss'

const Specification = forwardRef((props, ref) => {
  const { html } = props;

  return (
    <div className={styles.container} data-section-number={0} ref={ref}>
      <div className={styles.header}>
        <p className={styles.title}>Техническое задание</p>
      </div>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
})

export default Specification