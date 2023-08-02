import React, { forwardRef } from 'react'
import { useStateContext } from '../../context/ContextProvider';
import * as styles from './task.module.scss';
import Addlink from './addlink';
import Editlink from './editlink';


const Task = forwardRef((props, ref) => {
  const { links } = useStateContext();
  const { html, frontmatter } = props.checklist;
  const { theme } = props.pageContext;

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.head}>
        <h3>Инструкция</h3>
        <div className={styles.checklist} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <div className={styles.works}>
        {links[theme] && links[theme].map((item, index) => {
          return <Editlink data={item} theme={theme} index={index} key={index} />
        })}
        {links[theme] && links[theme].length < props.quantity &&
          <div className={styles.links}>
            <Addlink theme={theme} hint={frontmatter.hint} />
          </div>
        }
      </div>
    </div>
  )
})

export default Task