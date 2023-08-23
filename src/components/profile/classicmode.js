import React from 'react'
import { useStateContext } from '../../context/ContextProvider';
import Linkwork from './linkwork';
import { IoArrowForwardSharp } from "react-icons/io5";
import * as styles from './classicmode.module.scss';
import { Link } from 'gatsby';

function Classicmode({ data }) {
  const { works } = useStateContext();

  return (
    <div className={styles.container}>
      {data.works.map((item, index) => {
        const { title, description, tags } = item;
        const link = "/" + data.slug + "/" + item.slug;

        const worksAdded = works && (works.filter(work => work.theme === item.slug)?.length > 0);

        return <div className={styles.theme} key={`about_${index}`}>
          <div className={styles.about}>
            <h4>{title}</h4>
            <div className={styles.text}>
              <p>{description}</p>
              <div className={styles.tags}>
                {tags.map((item, index) => {
                  return <p key={index}>#{item.replace(/\s+/g, '_')}</p>
                })}
              </div>
            </div>
          </div>

          <div className={styles.works}>
            <p className={styles.title}>{worksAdded ? 'Добавленные работы:' : 'Нет прикрепленных работ'}</p>
            {worksAdded &&
              <div className={styles.list}>
                {works && works.filter(work => work.theme === item.slug).map((item, index) => {

                  return <Linkwork data={item} key={`link_${index}`} />
                })}
              </div>
            }
            <Link to={link} className={styles.open}>
              <p className={styles.text}>{worksAdded ? 'Продолжить тему' : 'Начать тему'}</p>
              <div className={styles.icon}>
                <IoArrowForwardSharp className={styles.svg} />
              </div>
            </Link>
          </div>
        </div>

      })}



    </div>
  )
}

export default Classicmode