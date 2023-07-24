import React, { useState } from 'react'
import cx from 'classname'
import * as styles from './specification.module.scss'

function Specification({ data, sumSections }) {
  const defaultSpecification = data[0].node.childMarkdownRemark.html;

  const [selected, setSelected] = useState({ html: defaultSpecification, index: 0 });

  return (
    <div className={styles.container}>
      <div className={styles.choise}>
        <h5>Выберите одну из работ:</h5>
        <div className={styles.collection}>
          {data.map((item, index) => {
            const { title, complexity, time } = item.node.childMarkdownRemark.frontmatter;
            const { html } = item.node.childMarkdownRemark;

            return <button className={cx(styles.item, selected.index === index && styles.active)} key={index} onClick={() => setSelected({ html: html, index: index })}>
              <div className={styles.name}>
                <p>{title}</p>
              </div>
              <div className={styles.level}>
                <p>Сложность: {complexity}</p>
                <p>Время выполнения: {time}</p>
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
}

export default Specification