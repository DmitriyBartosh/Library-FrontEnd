import React from 'react'
import { useStateContext } from '../../context/ContextProvider';
import * as styles from './allworks.module.scss';
import Linkwork from './linkwork';

function Allworks({ works }) {
  const { links } = useStateContext();

  return (
    <div className={styles.container}>
      <h5>Готовые работы:</h5>
      <div className={styles.list}>
        {works.map((item, index) => {
          const { slug, title } = item;

          const work = links && links[slug];

          return links && work.length > 0 &&
            <div className={styles.item} key={index}>
              <p className={styles.title}>{title}</p>
              {work.map((item, index) => {
                return <Linkwork data={item} index={index} key={`works_${slug}_${index}`} />
              })}
            </div>

        })}
      </div>
    </div>
  )
}

export default Allworks