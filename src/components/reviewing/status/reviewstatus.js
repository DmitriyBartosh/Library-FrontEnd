import React from 'react'
import { useStateContext } from '../../../context/ContextProvider'
import Work from './work'

import * as styles from './reviewstatus.module.scss'
import * as global from '../../../styles/base/global.module.scss'

function Reviewstatus() {
  const { reviews } = useStateContext();

  return reviews && reviews.length > 0 &&
    <div className={styles.container}>
      <div className={global.container}>
        <h4>Работы на рецензий</h4>
        <div className={styles.works}>
          {reviews.map((item, index) => {
            return <Work data={item} key={`reviewwork_${index}`} />
          })}
        </div>
      </div>
    </div>

}

export default Reviewstatus