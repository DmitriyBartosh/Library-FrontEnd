import React, { useState, forwardRef } from 'react'
import cx from 'classname'
import * as styles from './specification.module.scss'

const Specification = forwardRef((props, ref) => {
  const { data, sumSections, selected, setSelected } = props;

  return (
    <div className={styles.container} data-section-number={0} ref={ref}>
      <div className={styles.choise}>
        <p className={styles.title}>Выберите техническоое задание:</p>
        <div className={styles.collection}>
          {data.map((item, index) => {
            const { title, complexity, time } = item.node.childMarkdownRemark.frontmatter;
            const { html, frontmatter } = item.node.childMarkdownRemark;

            return <button className={cx(styles.item, selected.index === index && styles.active)} key={index} onClick={() => setSelected({ frontmatter: frontmatter, html: html, index: index })}>
              <div className={styles.name}>
                <p>{title}</p>
              </div>
              <div className={styles.level}>
                <p>Сложность: <span>{complexity}</span></p>
                <p>Время выполнения: <span>{time}</span></p>
              </div>
            </button>
          })}
        </div>
      </div>
      <div className={styles.header}>
        <p>Техническое задание</p>
        <p>00 / 0{sumSections}</p>
      </div>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: selected.html }} />
    </div>
  )
})

export default Specification