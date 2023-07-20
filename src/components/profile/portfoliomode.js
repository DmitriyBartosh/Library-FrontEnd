import React from 'react'
import { useStateContext } from '../../context/ContextProvider';
import { IoArrowForwardSharp } from "react-icons/io5";
import * as styles from './portfoliomode.module.scss';
import Linkwork from './linkwork';
import { Link } from 'gatsby';

function Allworks({ data }) {
  const { links } = useStateContext();

  const { works } = data;

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {works.map((item, index) => {
          const { slug, title } = item;

          const work = links && links[slug];
          const link = "/" + data.slug + "/" + item.slug;

          return links && work.length > 0 &&
            <div className={styles.item} key={index}>
              <div className={styles.head}>
                <h4>{title}</h4>

              </div>

              <div className={styles.works}>
                {work.map((item, index) => {
                  return <Linkwork data={item} index={index} key={`works_${slug}_${index}`} />
                })}
                <Link to={link} className={styles.link}>
                  <p className={styles.text}>Открыть тему</p>
                  <div className={styles.icon}>
                    <IoArrowForwardSharp className={styles.svg} />
                  </div>
                </Link>
              </div>

            </div>

        })}
      </div>
    </div>
  )
}

export default Allworks