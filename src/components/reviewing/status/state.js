import React from 'react'
import { IoTimeOutline, IoDocumentTextOutline, IoCheckmarkSharp, IoDuplicateOutline } from "react-icons/io5";
import cx from 'classname'
import Pay from './pay';
import Del from './del'

import * as styles from './state.module.scss'

function State({ data, setShowlReview }) {
  const { status, expert } = data;

  return (
    <div className={styles.container}>

      {status === 'checking' &&
        <div className={cx(styles.block, styles.two)}>
          <div className={styles.message}>
            <p className={styles.text}>В обработке</p>
            <div className={styles.icon}>
              <IoTimeOutline className={styles.svg} />
            </div>
          </div>
          <Del id={data.id} />
        </div>
      }

      {status === 'fail' &&
        <div className={cx(styles.block, styles.two)}>
          <button className={styles.button} onClick={() => setShowlReview(true)}>
            <p className={styles.text}>Ошибка / исправить</p>
          </button>
          <Del id={data.id} />
        </div>
      }

      {status === 'verified' &&
        <div className={cx(styles.block, styles.two)}>
          <Pay data={data} price={expert.price} />
          <Del id={data.id} />
        </div>
      }

      {status === 'firstchecked' &&
        <div className={cx(styles.block, styles.one)}>
          <div className={styles.message}>
            <p className={styles.text}>Работа проверяется</p>
            <div className={styles.icon}>
              <IoDocumentTextOutline className={styles.svg} />
            </div>
          </div>
        </div>
      }

      {status === 'secondchecked' &&
        <div className={cx(styles.block, styles.one)}>
          <div className={styles.message}>
            <p className={styles.text}>Повторная проверка</p>
            <div className={styles.icon}>
              <IoDocumentTextOutline className={styles.svg} />
            </div>
          </div>
        </div>
      }

      {status === 'revision' &&
        <div className={cx(styles.block, styles.one)}>
          <button className={styles.button} onClick={() => setShowlReview(true)}>
            <p className={styles.text}>Внести правки</p>
            <div className={styles.icon}>
              <IoDuplicateOutline className={styles.svg} />
            </div>
          </button>
        </div>
      }

      {status === 'notcounted' &&
        <div className={cx(styles.block, styles.one)}>
          <button className={styles.button} onClick={() => setShowlReview(true)}>
            <p className={styles.text}>Не зачтена</p>
            <div className={styles.icon}>
              <IoCheckmarkSharp className={styles.svg} />
            </div>
          </button>
        </div>
      }

      {status === 'complete' &&
        <div className={cx(styles.block, styles.one)}>
          <button className={styles.button} onClick={() => setShowlReview(true)}>
            <p className={styles.text}>Зачтено</p>
            <div className={styles.icon}>
              <IoCheckmarkSharp className={styles.svg} />
            </div>
          </button>
        </div>
      }


    </div>
  )
}

export default State