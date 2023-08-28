import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllWorksOnReview } from '../../../functions/review'
import { useStateContext } from '../../../context/ContextProvider'
import * as styles from './reviewstatus.module.scss'
import * as global from '../../../styles/base/global.module.scss'
import Work from './work'

function Reviewstatus() {
  const { token } = useStateContext();

  const directionQuery = useQuery({
    queryKey: ["getAllWorksOnReview"],
    queryFn: getAllWorksOnReview,
    enabled: !!token
  })

  useEffect(() => {
    console.log(directionQuery)
  }, [directionQuery])




  return directionQuery.data && directionQuery.data.length > 0 &&
    <div className={styles.container}>
      <div className={global.container}>
        <h4>Работы на рецензий</h4>
        <div className={styles.works}>
          {directionQuery.data.map((item, index) => {
            return <Work data={item} key={`reviewwork_${index}`} />
          })}
        </div>
      </div>
    </div>

}

export default Reviewstatus