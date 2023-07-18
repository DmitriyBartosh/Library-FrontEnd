import React from 'react'
import { useStateContext } from '../../context/ContextProvider';
import * as styles from './portfoliomode.module.scss';
import Linkwork from './linkwork';

function Allworks({ works }) {
  const { links } = useStateContext();

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {works.map((item, index) => {
          const { slug, title } = item;

          const work = links && links[slug];

          return links && work.length > 0 &&
            <div className={styles.item} key={index}>
              <div className={styles.head}>
                <h5 className={styles.title}>{title}</h5>
              </div>

              <div className={styles.works}>
                {work.map((item, index) => {
                  return <Linkwork data={item} index={index} key={`works_${slug}_${index}`} />
                })}
              </div>
            </div>

        })}
      </div>
    </div>
  )
}

export default Allworks