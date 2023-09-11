import React, { useState } from 'react'
import { motion } from 'framer-motion'
import cx from 'classname'
import { IoAddOutline, IoSyncOutline, IoCloseCircleOutline, IoCheckmarkSharp } from "react-icons/io5";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { workFailed, workReview, workRevision, workNotCounted } from '../../../functions/expert'
import Modal from '../../modal';

import * as styles from './detailed.module.scss'

function Detailed({ data, showDetailed, setShowDetailed }) {
  const { status, link } = data;
  const queryClient = useQueryClient();

  const [message, setMessage] = useState('');

  const isMessage = message === '';

  const reviewFaildMutation = useMutation({
    mutationFn: workFailed,
    onSuccess: () => {
      setShowDetailed(false);
      queryClient.invalidateQueries({ queryKey: ['getAllWorksOnReviewForAdmin'] });
    }
  })

  const workReviewMutation = useMutation({
    mutationFn: workReview,
    onSuccess: () => {
      setShowDetailed(false);
      queryClient.invalidateQueries({ queryKey: ['getAllWorksOnReviewForAdmin'] });
    }
  })

  const workRevisionMutation = useMutation({
    mutationFn: workRevision,
    onSuccess: () => {
      setShowDetailed(false);
      queryClient.invalidateQueries({ queryKey: ['getAllWorksOnReviewForAdmin'] });
    }
  })

  const workNotCountedMutation = useMutation({
    mutationFn: workNotCounted,
    onSuccess: () => {
      setShowDetailed(false);
      queryClient.invalidateQueries({ queryKey: ['getAllWorksOnReviewForAdmin'] });
    }
  })

  return (
    <Modal visible={showDetailed} close={() => setShowDetailed(false)}>
      <div className={styles.work}>
        <p className={styles.name}>{data.user.name}</p>
        <a href={`mailto:${data.user.email}`} className={styles.mail}>{data.user.email}</a>
        <a href={link ? link : data.work.link} target='_blank' rel="noreferrer" className={styles.link}>{data.work.name}</a>
      </div>
      {status === 'checking' &&
        <>
          <p className={styles.title}>Что исправить / добавить</p>
          <div className={styles.area}>
            <textarea
              rows="10"
              placeholder='Текст для комментерий'
              disabled={reviewFaildMutation.isLoading}
              value={message}
              onChange={(e) => setMessage(e.target.value)} />
          </div>
          <button
            className={cx(styles.send, reviewFaildMutation.isLoading && styles.loading)}
            disabled={reviewFaildMutation.isLoading}
            onClick={() => reviewFaildMutation.mutate({ id: data.id, message: message })}>
            <p className={styles.text}>Отправить сообщение</p>
            {reviewFaildMutation.isLoading ?
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.25, repeat: Infinity }}
                className={styles.load}>
                <IoSyncOutline className={styles.svg} />
              </motion.div>
              :
              <div className={styles.icon}>
                <IoAddOutline className={styles.svg} />
              </div>
            }
          </button>
        </>
      }

      {status === 'firstchecked' &&
        <>
          <p className={styles.title}>Рецензия</p>
          <div className={styles.area}>
            <textarea
              rows="10"
              placeholder='Кратко о работе'
              disabled={workRevisionMutation.isLoading || workReviewMutation.isLoading}
              value={message}
              onChange={(e) => setMessage(e.target.value)} />
          </div>
          <div className={styles.action}>

            <button
              className={cx(styles.accept, workReviewMutation.isLoading && styles.loading)}
              disabled={workReviewMutation.isLoading || isMessage}
              onClick={() => workReviewMutation.mutate({ id: data.id, message: message })}>
              <p className={styles.text}>Зачет</p>
              {workReviewMutation.isLoading ?
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.25, repeat: Infinity }}
                  className={styles.load}>
                  <IoSyncOutline className={styles.svg} />
                </motion.div>
                :
                <div className={styles.icon}>
                  <IoCheckmarkSharp className={styles.svg} />
                </div>
              }
            </button>

            <button
              className={cx(styles.cancel, workRevisionMutation.isLoading && styles.loading)}
              disabled={workRevisionMutation.isLoading || isMessage}
              onClick={() => workRevisionMutation.mutate({ id: data.id, message: message })}>
              <p className={styles.text}>На доработку</p>
              {workRevisionMutation.isLoading ?
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.25, repeat: Infinity }}
                  className={styles.load}>
                  <IoSyncOutline className={styles.svg} />
                </motion.div>
                :
                <div className={styles.icon}>
                  <IoCloseCircleOutline className={styles.svg} />
                </div>
              }
            </button>

          </div>
        </>

      }

      {status === 'secondchecked' &&
        <>
          <p className={styles.title}>Рецензия на работу</p>
          <div className={styles.message}>
            <pre>{data.message_revision}</pre>
          </div>
          <p className={styles.title}>Комментарии</p>
          <div className={styles.message}>
            <pre>{data.message_revision}</pre>
          </div>
          <p className={styles.title}>Заключительно</p>
          <div className={styles.area}>
            <textarea
              rows="10"
              placeholder='Кратко о работе'
              disabled={workRevisionMutation.isLoading || workReviewMutation.isLoading}
              value={message}
              onChange={(e) => setMessage(e.target.value)} />
          </div>
          <div className={styles.action}>

            <button
              className={cx(styles.accept, workReviewMutation.isLoading && styles.loading)}
              disabled={workReviewMutation.isLoading || isMessage}
              onClick={() => workReviewMutation.mutate({ id: data.id, message: message })}>
              <p className={styles.text}>Зачет</p>
              {workReviewMutation.isLoading ?
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.25, repeat: Infinity }}
                  className={styles.load}>
                  <IoSyncOutline className={styles.svg} />
                </motion.div>
                :
                <div className={styles.icon}>
                  <IoCheckmarkSharp className={styles.svg} />
                </div>
              }
            </button>

            <button
              className={cx(styles.cancel, workNotCountedMutation.isLoading && styles.loading)}
              disabled={workNotCountedMutation.isLoading || isMessage}
              onClick={() => workNotCountedMutation.mutate({ id: data.id, message: message })}>
              <p className={styles.text}>Не зачет</p>
              {workNotCountedMutation.isLoading ?
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.25, repeat: Infinity }}
                  className={styles.load}>
                  <IoSyncOutline className={styles.svg} />
                </motion.div>
                :
                <div className={styles.icon}>
                  <IoCloseCircleOutline className={styles.svg} />
                </div>
              }
            </button>
          </div>
        </>
      }

      {data.status === 'notcounted' &&
        <>
          <p className={styles.title}>Рецензия</p>
          <div className={styles.message}>
            <pre>{data.message_revision}</pre>
          </div>
          <p className={styles.title}>Что исправить</p>
          <div className={styles.message}>
            <pre>{data.message_notcounted}</pre>
          </div>
          <button className={styles.repeat}>
            <p className={styles.text}>Повторить рецензию</p>
            <div className={styles.icon}>
              <IoCheckmarkSharp className={styles.svg} />
            </div>
          </button>
        </>
      }

      {data.status === 'complete' &&
        <>
          {data.message_revision &&
            <>
              <p className={styles.title}>Первая проверка</p>
              <div className={styles.message}>
                <pre>{data.message_revision}</pre>
              </div>
            </>
          }
          {data.user_comment &&
            <>
              <p className={styles.title}>Комментарии</p>
              <div className={styles.message}>
                <pre>{data.user_comment}</pre>
              </div>
            </>
          }
          <p className={styles.title}>Рецензия</p>
          <div className={styles.message}>
            <pre>{data.message_review}</pre>
          </div>
        </>
      }


    </Modal>
  )
}

export default Detailed