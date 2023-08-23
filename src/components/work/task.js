import React, { forwardRef } from 'react'
import cx from 'classname'
import { useStateContext } from '../../context/ContextProvider';
import * as styles from './task.module.scss';
import Addlink from './addlink';
import Editlink from './editlink';


const Task = forwardRef((props, ref) => {
  const { works } = useStateContext();
  const { html, frontmatter } = props.checklist;
  const { theme, direction } = props.pageContext;

  const { data, selected, setSelected } = props;

  // Все работы по теме
  const relatedwork = works && works.filter(item => item.direction === direction && item.theme === theme);
  // Прикреплена ли работа по теме
  const thereIsWork = relatedwork.some(item => item.name === selected.title);

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.choise}>
        <p className={styles.title}>Выберите задание:</p>
        <div className={styles.collection}>
          {data.map((item, index) => {
            const { title, complexity, time } = item.node.childMarkdownRemark.frontmatter;
            const { html, frontmatter } = item.node.childMarkdownRemark;

            return <button className={cx(styles.item, selected.title === frontmatter.title && styles.active)} key={index} onClick={() => setSelected({ frontmatter: frontmatter, html: html, title: frontmatter.title })}>
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
      <div className={styles.instruction}>
        <div className={styles.head}>
          <h3>Инструкция</h3>
          <div className={styles.checklist} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        <div className={styles.works}>
          {thereIsWork ?
            relatedwork.map((item, index) => {
              return item.name === selected.title && <Editlink data={item} key={index} />
            })
            :
            <div className={styles.links}>
              <Addlink direction={direction} theme={theme} hint={frontmatter.hint} title={frontmatter.title} />
            </div>
          }
        </div>
      </div>

    </div>
  )
})

export default Task