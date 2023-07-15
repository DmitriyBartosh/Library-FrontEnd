import React, { useState } from 'react'
import cx from 'classname'
import { motion } from 'framer-motion';
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

  const isDifferent = !(name === "" && link === "");

  const closeEdit = () => {
    setLink("");
    setName("");
    setIsAdded(false);
  }

  return isAdded ?
    <div className={styles.container}>

      <div className={styles.input}>
        <input placeholder='Имя работы' onChange={(e) => setName(e.target.value)} />
      </div>

      <div className={styles.input}>
        <input placeholder='Ссылка' onChange={(e) => setLink(e.target.value)} />
      </div>

      <div className={styles.navigation}>
        <button
          className={cx(styles.save, isDifferent && styles.active)}
          disabled={!isDifferent || isLoading}
          onClick={() => addLinkDesign(name, link, theme, updateLinkDesign)}
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
    </div>
    :
    <button onClick={() => setIsAdded(true)} className={styles.button}>
      <IoAddCircleOutline className={styles.icon} />
      <p className={styles.text}>Добавить работу</p>
    </button>
}

export default Addlink