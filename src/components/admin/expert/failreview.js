import React, { useState } from 'react'
import { motion } from 'framer-motion'
import cx from 'classname'
import { IoAddOutline, IoSyncOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { workFailed } from '../../../functions/expert'

import Modal from '../../modal';

import * as styles from './failreview.module.scss'

function Failreview({ data, showFailReview, setShowFailReview }) {
  const [message, setMessage] = useState('')

  const queryClient = useQueryClient();

  const reviewFaildMutation = useMutation({
    mutationFn: workFailed,
    onSuccess: () => {
      setShowFailReview(false);
      queryClient.invalidateQueries({ queryKey: ['getAllWorksOnReviewForAdmin'] });
    }
  })

  return <Modal visible={showFailReview} close={() => setShowFailReview(false)}>
    <div className={styles.work}>
      <p className={styles.name}>{data.user.name}</p>
      <a href={`mailto:${data.user.email}`} className={styles.mail}>{data.user.email}</a>
      <a href={data.work.link} target='_blank' rel="noreferrer" className={styles.link}>{data.work.name}</a>
    </div>
    <div className={styles.message}>
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
    </div>
  </Modal>
}

export default Failreview