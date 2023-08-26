import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Linkwork from '../linkwork'
import { getAllUserWorks } from '../../../functions/expert';
import * as styles from './theme.module.scss';

function Theme({ slug }) {
  const direction = slug.slug;

  const allUserWorksQuery = useQuery({
    queryKey: ['alluserlinks', direction],
    queryFn: () => getAllUserWorks(direction)
  })

  const { isLoading, data } = allUserWorksQuery;

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
          {slug.works.map((item, index) => {
            return <div className={styles.theme} key={`theme${index}`}>
              <h5>{item.title}</h5>
              <div className={styles.items}>
                {data.works.filter(work => work.theme === item.slug).map((item, index) => {
                  return <Linkwork item={item} user={item.user} key={index} />
                })}
              </div>
            </div>
          })}
        </div>
      }
    </div>
  )
}

export default Theme