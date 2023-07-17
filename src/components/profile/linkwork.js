import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IoOpenOutline, IoCopyOutline, IoCheckmarkSharp } from "react-icons/io5";
import * as styles from './linkwork.module.scss';

function Linkwork({ data, index }) {
  const { name, link } = data;

  const [isCopied, setIsCopied] = useState(false);

  const copiedLink = (link) => {
    if (!isCopied) {
      setIsCopied(true);
      navigator.clipboard.writeText(link);

      setTimeout(() => {
        setIsCopied(false);
      }, 800);
    }
  }

  return (
    <div className={styles.container}>
      <button className={styles.copy} onClick={() => copiedLink(link)}>

        <div className={styles.name}>
          <AnimatePresence initial={false} mode='popLayout'>
            {isCopied ?
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={styles.text}
                key={`copy_${name}`}>Скопировано</motion.p>
              :
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={styles.text}
                key={`name_${name}`}>{index + 1}. {name}</motion.p>
            }
          </AnimatePresence>
        </div>

        <div className={styles.square}>
          <AnimatePresence initial={false} mode='popLayout'>
            {isCopied ?
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.25 } }}
                exit={{ opacity: 0, y: -10 }}
                className={styles.icon}
                key={`saved_${name}`}>
                <IoCheckmarkSharp className={styles.complete} />
              </motion.div>
              :
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.25 } }}
                exit={{ opacity: 0, y: 10 }}
                className={styles.icon}
                key={`copy_${name}`}>
                <IoCopyOutline className={styles.svg} />
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </button>
      <a href={link} target='_blank' className={styles.open}>
        <div className={styles.icon}>
          <IoOpenOutline className={styles.svg} />
        </div>
      </a>
    </div>

  )
}

export default Linkwork