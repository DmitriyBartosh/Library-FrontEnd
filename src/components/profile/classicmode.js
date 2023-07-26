import React from 'react'
import { useStateContext } from '../../context/ContextProvider';
import Linkwork from './linkwork';
import { IoArrowForwardSharp } from "react-icons/io5";
import * as styles from './classicmode.module.scss';
import { Link } from 'gatsby';

function Classicmode({ data }) {
  const { links } = useStateContext();

  const { works, slug } = data;

  return (
    <div className={styles.container}>
      {works.map((item, index) => {
        const { title, description, order } = item;
        const link = "/" + slug + "/" + item.slug;
        const linksAdded = links && (links[item.slug].length > 0);

        return <div className={styles.theme} key={`about_${index}`}>
          <div className={styles.about}>
            <h4>{title}</h4>
            <div className={styles.text}>
              <p>{description}</p>
              <div className={styles.tags}>
                {order.section.map((item, index) => {
                  return <p key={index}>#{item.replace(/\s+/g, '_')}</p>
                })}
              </div>
            </div>
          </div>

          <div className={styles.works}>
            <p className={styles.title}>{linksAdded ? 'Добавленные работы:' : 'Нет прикрепленных работ'}</p>
            {linksAdded &&
              <div className={styles.list}>
                {links && links[item.slug].map((item, index) => {

                  return <Linkwork data={item} index={index} key={`link_${index}`} />
                })}
              </div>
            }
            <Link to={link} className={styles.open}>
              <p className={styles.text}>{linksAdded ? 'Продолжить тему' : 'Начать тему'}</p>
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