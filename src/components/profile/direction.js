import React from 'react'
import { useLocalStorage } from 'react-use';

import Allworks from './portfoliomode';
import Toggle from './toggle';

import * as styles from './direction.module.scss';
import * as global from '../../styles/base/global.module.scss';
import Classicmode from './classicmode';


function Direction({ data }) {
  const [portfolioMode, setPortfolioMode] = useLocalStorage(data.slug + '_visual_mode', false);

  return (
    <div className={styles.container}>
      <div className={global.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h3>{data.title}</h3>
          </div>
          <div className={styles.right}>
            <Toggle portfolioMode={portfolioMode} setPortfolioMode={setPortfolioMode} />
          </div>
        </div>

        {portfolioMode ?
          <Allworks data={data} />
          :
          <Classicmode data={data} />
        }
      </div>
    </div>
  )
}

export default Direction;