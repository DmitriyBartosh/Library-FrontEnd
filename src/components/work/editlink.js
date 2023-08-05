import React, { useState } from 'react';
import cx from 'classname';
import { deleteLinkDesign, editLinkDesign } from '../../functions/user';
import { useStateContext } from '../../context/ContextProvider';
import { AnimatePresence, motion } from 'framer-motion';
import { IoTrashOutline, IoCloseOutline, IoCreateOutline, IoCheckmarkSharp, IoSyncOutline } from "react-icons/io5";
import * as styles from './editlink.module.scss';

function Editlink({ data, theme, id, index }) {
  const { updateLinkDesign } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [edited, setEdited] = useState(false);

  const [name, setName] = useState(data.name);
  const [link, setLink] = useState(data.link);

  const isDifferent = !(data.name === name && data.link === link);

  const closeEdit = () => {
    setLink(data.link);
    setName(data.name);
    setEdited(false);
  }


  return (
    <div className={cx(styles.container, edited && styles.edited)}>

      <div className={styles.name}>
        <p>{index + 1}.</p>
        <input placeholder='Имя работы' disabled={!edited} value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className={styles.link}>
        <input placeholder='Ссылка' disabled={!edited} value={link} onChange={(e) => setLink(e.target.value)} />
      </div>
      <div className={styles.navigate}>
        <AnimatePresence initial={false} mode='popLayout'>
          {edited ?
            <>
              <button
                className={cx(styles.save, isDifferent && styles.active)}
                disabled={!isDifferent || isLoading}
                onClick={() => editLinkDesign(index, id, name, link, theme, updateLinkDesign, setEdited, setIsLoading)}
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
              <button className={styles.back} onClick={() => closeEdit()}>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={styles.icon}
                  key="closeedit">
                  <IoCloseOutline className={styles.svg} />
                </motion.div>
              </button>
            </>
            :
            <>
              <button className={styles.edit} onClick={() => setEdited(true)}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={styles.icon}
                  key="editlink">
                  <IoCreateOutline className={styles.svg} />
                </motion.div>
              </button>
              <button
                disabled={isLoading}
                className={styles.del}
                onClick={() => deleteLinkDesign(index, theme, updateLinkDesign, setIsLoading)}>
                {isLoading ?
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.25, repeat: Infinity }}
                    className={styles.icon}
                    key="loading_del">
                    <IoSyncOutline className={styles.load} />
                  </motion.div>
                  :
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.icon}
                    key="dellink">
                    <IoTrashOutline className={styles.svg} />
                  </motion.div>
                }
              </button>
            </>
          }
        </AnimatePresence>

      </div>
    </div>
  )
}

export default Editlink