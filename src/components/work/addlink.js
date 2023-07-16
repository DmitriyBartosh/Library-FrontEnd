import React, { useState } from 'react'
import cx from 'classname'
import { motion, AnimatePresence } from 'framer-motion';
import { useStateContext } from '../../context/ContextProvider';
import { addLinkDesign } from '../../functions/user';
import { IoAddCircleOutline, IoCloseOutline, IoCheckmarkSharp, IoSyncOutline } from "react-icons/io5";
import * as styles from './addlink.module.scss'

function Addlink({ theme }) {
  const { updateLinkDesign } = useStateContext();

  const [isAdded, setIsAdded] = useState(false);

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isDifferent = name !== "" && link !== "";

  const closeEdit = () => {
    setLink("");
    setName("");
    setIsAdded(false);
  }

  return <AnimatePresence initial={false} mode='popLayout'>
    {isAdded ?
      <motion.div
        initial={{ opacity: 0, x: 0, y: 15 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, transition: { duration: 0 } }}
        key="addedlink"
        className={styles.container}>
        <div className={styles.input}>
          <input placeholder='Имя работы' value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className={styles.input}>
          <input placeholder='Ссылка' value={link} onChange={(e) => setLink(e.target.value)} />
        </div>

        <div className={styles.navigation}>
          <button
            className={cx(styles.save, isDifferent && styles.active)}
            disabled={!isDifferent || isLoading}
            onClick={() => addLinkDesign(name, link, theme, setIsLoading, closeEdit, updateLinkDesign)}
          >
            {isLoading ?
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

          </button>
          <button className={styles.back} onClick={() => closeEdit()}>
            <div className={styles.icon}>
              <IoCloseOutline className={styles.svg} />
            </div>
          </button>
        </div>
      </motion.div>
      :
      <motion.button
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        key="startaddlink"
        onClick={() => setIsAdded(true)}
        className={styles.button}>
        <IoAddCircleOutline className={styles.icon} />
        <p className={styles.text}>Добавить работу</p>
      </motion.button>
    }
  </AnimatePresence>
}

export default Addlink