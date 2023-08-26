import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion'
import { IoSyncOutline, IoCheckmarkSharp } from "react-icons/io5";
import { editExpert } from '../../../functions/expert';

import * as styles from './save.module.scss'

function Savebutton({ expert }) {
  const queryClient = useQueryClient();

  const editExpertMutation = useMutation({
    mutationFn: editExpert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getexpertforexpert'] })
    }
  })

  return (
    <motion.button
      className={styles.container}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.2, delay: 0.25 } }}
      exit={{ opacity: 0 }}
      disabled={editExpertMutation.isLoading}
      layout='position'
      key='savebutton'
      onClick={() => editExpertMutation.mutate({ expert })}
    >
      <p className={styles.text}>Сохранить</p>
      {editExpertMutation.isLoading ?
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.25, repeat: Infinity }}
          className={styles.icon}>
          <IoSyncOutline className={styles.load} />
        </motion.div>
        :
        <div className={styles.icon}>
          <IoCheckmarkSharp className={styles.svg} />
        </div>
      }
    </motion.button>
  )
}

export default Savebutton