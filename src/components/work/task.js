import React, { forwardRef } from 'react'
import { useStateContext } from '../../context/ContextProvider';
import * as styles from './task.module.scss';
import Addlink from './addlink';
import Editlink from './editlink';


const Task = forwardRef((props, ref) => {
  const { links } = useStateContext();
  const { title, theme, instruction } = props.pageContext;

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.head}>
        <h3>{title}</h3>
        <p dangerouslySetInnerHTML={{ __html: instruction }} />
      </div>
      <div className={styles.works}>
        <p>Работы по теме:</p>
        {links && links[theme].map((item, index) => {
          return <Editlink data={item} theme={theme} index={index} key={index} />
        })}
        <div className={styles.links}>
          <Addlink theme={theme} />
        </div>
      </div>
    </div>
  )
})

export default Task