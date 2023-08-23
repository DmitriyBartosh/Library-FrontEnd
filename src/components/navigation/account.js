import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { IoLayersOutline, IoHomeOutline, IoBookOutline } from "react-icons/io5";
import { useStateContext } from '../../context/ContextProvider'
import * as styles from './account.module.scss'

function Account({ themes }) {
  const { statusDirection, works, setShowReview } = useStateContext();
  const [haveWorks, setHaveWorks] = useState(false);

  const directionSelected = statusDirection?.design || statusDirection?.frontend || statusDirection?.photo;

  useEffect(() => {
    if (works) {
      for (let i = 0; i < themes.length; i++) {
        const theme = themes[i].slug;
        const work = works.filter(item => item.theme === theme);
        if (work?.length > 0) {
          setHaveWorks(true);
          break;
        } else {
          setHaveWorks(false);
        }
      }
    }
  }, [works, themes])


  return directionSelected ?
    <div className={styles.container}>
      <Link to='/profile' className={styles.portfolio}>
        <IoHomeOutline className={styles.icon} />
        <p className={styles.text}>Мое портфолио</p>
      </Link>
      {haveWorks &&
        <button className={styles.portfolio} onClick={() => setShowReview(true)}>
          <IoBookOutline className={styles.icon} />
          <p className={styles.text}>Рецензирование</p>
        </button>
      }

    </div>
    :
    <Link to='/directions' className={styles.portfolio}>
      <IoLayersOutline className={styles.icon} />
      <p className={styles.text}>Направления</p>
    </Link>
}

export default Account