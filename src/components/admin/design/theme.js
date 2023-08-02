import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Linkwork from '../linkwork'
import { getAllUserLinks } from '../../../functions/designexpert';
import * as styles from './theme.module.scss';

function Theme() {
  const alluserlinksQuery = useQuery({
    queryKey: ["alluserlinks"],
    queryFn: getAllUserLinks,
  })

  const { isLoading, data } = alluserlinksQuery;

  return (
    <div className={styles.container}>
      {isLoading ?
        <div className={styles.loading}>
          <p>Загрузка</p>
        </div>
        :
        <div className={styles.links}>
          <div className={styles.head}>
            <h4>Все работы по графическому дизайну</h4>
          </div>
          <div className={styles.theme}>
            <h5>Логотип</h5>
            <div className={styles.items}>
              {data.links.map((item) => {
                const { logo, user } = item;

                return logo.length > 0 &&
                  logo.map((item, index) => {
                    return <Linkwork item={item} user={user} key={index} />
                  })
              })
              }
            </div>
          </div>

          <div className={styles.theme}>
            <h5>Полиграфия</h5>
            <div className={styles.items}>
              {data.links.map((item) => {
                const { polygraphy, user } = item;

                return polygraphy.length > 0 &&
                  polygraphy.map((item, index) => {
                    return <Linkwork item={item} user={user} key={index} />
                  })
              })
              }
            </div>
          </div>

          <div className={styles.theme}>
            <h5>Постеры</h5>
            <div className={styles.items}>
              {data.links.map((item) => {
                const { poster, user } = item;

                return poster.length > 0 &&
                  poster.map((item, index) => {
                    return <Linkwork item={item} user={user} key={index} />
                  })
              })
              }
            </div>
          </div>

          <div className={styles.theme}>
            <h5>Социальные сети</h5>
            <div className={styles.items}>
              {data.links.map((item) => {
                const { socialmedia, user } = item;

                return socialmedia.length > 0 &&
                  socialmedia.map((item, index) => {
                    return <Linkwork item={item} user={user} key={index} />
                  })
              })
              }
            </div>
          </div>

        </div>
      }
    </div>
  )
}

export default Theme