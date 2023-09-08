import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { IoWalletOutline, IoTimeOutline, IoDocumentTextOutline } from 'react-icons/io5'
import Checking from './checking'

import * as styles from './state.module.scss'

function State({ data, setShowFailReview, setShowMakeReview }) {
  const { id, status } = data;

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {status === 'checking' &&
          <Checking id={id} setShowFailReview={setShowFailReview} />
        }
        {status === 'verified' &&
          <div className={styles.block}>
            <p className={styles.text}>Ожидание оплаты</p>
            <div className={styles.icon}>
              <IoWalletOutline className={styles.svg} />
            </div>
          </div>
        }
        {status === 'fail' &&
          <div className={styles.block}>
            <p className={styles.text}>На доработке</p>
            <div className={styles.icon}>
              <IoTimeOutline className={styles.svg} />
            </div>
          </div>
        }
        {status === 'paid' &&
          <button className={styles.button} onClick={() => setShowMakeReview(true)}>
            <p className={styles.text}>Оставить рецензию</p>
            <div className={styles.icon}>
              <IoDocumentTextOutline className={styles.svg} />
            </div>
          </button>
        }
      </AnimatePresence>
    </div>
  )
}

export default State