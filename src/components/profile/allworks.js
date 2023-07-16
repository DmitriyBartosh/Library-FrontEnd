import React from 'react'
import { useStateContext } from '../../context/ContextProvider';
import * as styles from './allworks.module.scss';

function Allworks({ works, copiedLink }) {
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
                const { name, link } = item;

                return <button className={styles.work} key={`works_${slug}_${index}`} onClick={() => copiedLink(link)}>
                  <p className={styles.name}>{index + 1}. {name}</p>
                  <p className={styles.link}>{link}</p>
                </button>
              })}
            </div>

        })}
      </div>
    </div>
  )
}

export default Allworks