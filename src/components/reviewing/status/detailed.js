import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoSyncOutline, IoCheckmarkSharp, IoOpenOutline } from 'react-icons/io5'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fixWorkToReview } from '../../../functions/review'
import Modal from '../../modal'

import * as styles from './detailed.module.scss'

function Detailed({ data, showReview, setShowlReview }) {
  const [link, setLink] = useState(data.work.link);

  const queryClient = useQueryClient();

  const fixWorkToReviewMutation = useMutation({
    mutationFn: fixWorkToReview,
    onSuccess: () => {
      setShowlReview(false);
      queryClient.invalidateQueries({ queryKey: ['getAllWorksOnReview'] });
    }
  })

  return (
    <Modal visible={showReview} close={() => setShowlReview(false)}>

      <div className={styles.container}>
        <div className={styles.work}>
          <p className={styles.name}>Эксперт / {data.expert.name}</p>
          <a href={data.work.link} target='_blank' rel="noreferrer" className={styles.titlelink}>{data.work.name}</a>
        </div>
        {data.status === 'fail' &&
          <>
            <p className={styles.hint}>Что исправить</p>

            <div className={styles.message}>
              <pre>{data.message_failure}</pre>
            </div>

            <div className={styles.editlink}>
              <input
                placeholder='Ссылка'
                disabled={fixWorkToReviewMutation.isLoading}
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <button className={styles.send}
              disabled={fixWorkToReviewMutation.isLoading}
              onClick={() => fixWorkToReviewMutation.mutate({ id: data.id, link: link })}
            >
              <p className={styles.text}>Исправлено</p>
              {fixWorkToReviewMutation.isLoading ?
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
          </>
        }

        {data.status === 'revision' &&
          <>
            <p className={styles.hint}>Рецензия на работу</p>
            <div className={styles.message}>
              <pre>{data.message_review}</pre>
            </div>
            <a href={data.link} target='_blank' rel="noreferrer" className={styles.linkreviewed}>
              <p className={styles.text}>
                Ссылка провереной работы
              </p>

            </a>
          </>
        }

        {data.status === 'complete' &&
          <>
            <p className={styles.hint}>Рецензия на работу</p>
            <div className={styles.message}>
              <pre>{data.message_review}</pre>
            </div>
            <a href={data.link} target='_blank' rel="noreferrer" className={styles.linkreviewed}>
              <p className={styles.text}>
                Ссылка провереной работы
              </p>
              <div className={styles.icon}>
                <IoOpenOutline className={styles.svg} />
              </div>
            </a>
          </>
        }
      </div>

    </Modal>
  )
}

export default Detailed