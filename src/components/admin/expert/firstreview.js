import React, { useState } from 'react'
import { motion } from 'framer-motion'
import cx from 'classname'
import { IoSyncOutline, IoCloseCircleOutline, IoCheckmarkSharp } from 'react-icons/io5'
import { workReview, workRevision } from '../../../functions/expert'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Modal from '../../modal'
import * as styles from './firstreview.module.scss'

function Makereview({ data, showMakeReview, setShowMakeReview }) {
  const [message, setMessage] = useState('')

  const queryClient = useQueryClient();

  const workReviewMutation = useMutation({
    mutationFn: workReview,
    onSuccess: () => {
      setShowMakeReview(false);
      queryClient.invalidateQueries({ queryKey: ['getAllWorksOnReviewForAdmin'] });
    }
  })

  const workRevisionMutation = useMutation({
    mutationFn: workRevision,
    onSuccess: () => {
      setShowMakeReview(false);
      queryClient.invalidateQueries({ queryKey: ['getAllWorksOnReviewForAdmin'] });
    }
  })

  const isMessage = message === '';

  return (
    <Modal visible={showMakeReview} close={() => setShowMakeReview(false)}>
      <div className={styles.work}>
        <p className={styles.name}>{data.user.name}</p>
        <a href={`mailto:${data.user.email}`} className={styles.mail}>{data.user.email}</a>
        <a href={data.work.link} target='_blank' rel="noreferrer" className={styles.link}>{data.work.name}</a>
      </div>
      <div className={styles.message}>
        <p className={styles.title}>Рецензия на работу</p>
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

      </div>
    </Modal>
  )
}

export default Makereview