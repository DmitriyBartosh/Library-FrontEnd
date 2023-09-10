import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { IoWalletOutline, IoTimeOutline, IoDocumentTextOutline, IoAlertCircleOutline, IoCheckmarkDoneSharp } from 'react-icons/io5'
import Checking from './checking'

import * as styles from './state.module.scss'

function State({ data, setShowDetailed }) {
  const { id, status } = data;

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {status === 'checking' &&
          <Checking id={id} setShowDetailed={setShowDetailed} />
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
            <p className={styles.text}>Исправляются ошибки</p>
            <div className={styles.icon}>
              <IoAlertCircleOutline className={styles.svg} />
            </div>
          </div>
        }
        {status === 'revision' &&
          <div className={styles.block}>
            <p className={styles.text}>Вносятся правки</p>
            <div className={styles.icon}>
              <IoTimeOutline className={styles.svg} />
            </div>
          </div>
        }
        {status === 'firstchecked' &&
          <button className={styles.button} onClick={() => setShowDetailed(true)}>
            <p className={styles.text}>Проверить</p>
            <div className={styles.icon}>
              <IoDocumentTextOutline className={styles.svg} />
            </div>
          </button>
        }

        {status === 'secondchecked' &&
          <button className={styles.button} onClick={() => setShowDetailed(true)}>
            <p className={styles.text}>Вторая проверка</p>
            <div className={styles.icon}>
              <IoDocumentTextOutline className={styles.svg} />
            </div>
          </button>
        }

        {status === 'complete' &&
          <button className={styles.button} onClick={() => setShowDetailed(true)}>
            <p className={styles.text}>Проверено</p>
            <div className={styles.icon}>
              <IoCheckmarkDoneSharp className={styles.svg} />
            </div>
          </button>
        }
      </AnimatePresence>
    </div>
  )
}

export default State