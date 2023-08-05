import React, { forwardRef } from 'react'
import cx from 'classname'
import { useStateContext } from '../../context/ContextProvider';
import * as styles from './task.module.scss';
import Addlink from './addlink';
import Editlink from './editlink';


const Task = forwardRef((props, ref) => {
  const { links } = useStateContext();
  const { html, frontmatter } = props.checklist;
  const { theme } = props.pageContext;

  const { data, selected, setSelected } = props;

  const workcomplete = links && links[theme].filter(item => item.id === selected.index).length > 0;


  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.choise}>
        <p className={styles.title}>Выберите задание:</p>
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
      <div className={styles.instruction}>
        <div className={styles.head}>
          <h3>Инструкция</h3>
          <div className={styles.checklist} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        <div className={styles.works}>
          {workcomplete ?
            links[theme].map((item, index) => {
              return item.id === selected.index && <Editlink id={selected.index} data={item} theme={theme} index={index} key={index} />
            })
            :
            <div className={styles.links}>
              <Addlink id={selected.index} theme={theme} hint={frontmatter.hint} title={frontmatter.title} />
            </div>
          }
        </div>
      </div>

    </div>
  )
})

export default Task