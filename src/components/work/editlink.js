import React, { useState } from 'react';
import cx from 'classname';
import { useMutation, useQueryClient, useIsFetching } from '@tanstack/react-query';
import { editWork } from '../../functions/works';
import { AnimatePresence, motion } from 'framer-motion';
import { IoCloseOutline, IoCreateOutline, IoCheckmarkSharp, IoSyncOutline } from "react-icons/io5";
import * as styles from './editlink.module.scss';

function Editlink({ data }) {
  const isFetchingWorks = useIsFetching({ queryKey: ['getAllWorks'] })
  const queryClient = useQueryClient();

  const [edited, setEdited] = useState(false);
  const [link, setLink] = useState(data.link);

  const editWorkMutation = useMutation({
    mutationFn: editWork,
    onSuccess: () => {
      setEdited(false);
      queryClient.invalidateQueries({ queryKey: ['getAllWorks'] })
    }
  })

  const isDifferent = !(data.link === link);
  const isLoading = editWorkMutation.isLoading || isFetchingWorks;

  const closeEdit = () => {
    setLink(data.link);
    setEdited(false);
  }

  return (
    <div className={cx(styles.container, edited && styles.edited)}>
      <AnimatePresence initial={false} mode='popLayout'>
        {edited ?
          isDifferent ?
            <button
              className={cx(styles.save, isDifferent && styles.active)}
              disabled={!isDifferent || isLoading}
              onClick={() => editWorkMutation.mutate({ id: data.id, link: link })}
            >
              {isLoading ?
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.25, repeat: Infinity }}
                  className={styles.icon}
                  key='loading_save'>
                  <IoSyncOutline className={styles.load} />
                </motion.div>
                :
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={styles.icon}
                  key="savelink">
                  <IoCheckmarkSharp className={styles.svg} />
                </motion.div>
              }
            </button>
            :
            <button className={styles.back} onClick={() => closeEdit()}>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.icon}
                key="closeedit">
                <IoCloseOutline className={styles.svg} />
              </motion.div>
            </button>
          :
          <button className={styles.edit} onClick={() => setEdited(true)}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={styles.icon}
              key="editlink">
              <IoCreateOutline className={styles.svg} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
              className={styles.text}>
              Изменить
            </motion.p>
          </button>
        }
      </AnimatePresence>
      <div className={styles.link}>
        <input placeholder='Ссылка' disabled={!edited} value={link} onChange={(e) => setLink(e.target.value)} />
      </div>
    </div>
  )
}

export default Editlink