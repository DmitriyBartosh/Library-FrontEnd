import React from 'react';
import { motion } from 'framer-motion';

function Button() {
  return (
    <div className={styles.item} key={index}>

      <motion.button
        initial={{ background: "#f3eee1", color: "#43702c" }}
        animate={{
          background: isActive ? "#43702c" : "#f3eee1",
          color: isActive ? "#ffffff" : "#43702c"
        }}
        className={styles.detail}
        onClick={() => setSelected(item)}>
        <p className={styles.text}>{title}</p>
      </motion.button>

      <MotionLink
        initial={{ width: 0 }}
        animate={{ width: isActive ? "125px" : "0px" }}
        to={"/" + slug + "/" + item.slug}
        className={styles.link}
      >
        <AnimatePresence>
          {isActive &&
            <motion.p
              initial={{ x: -25, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { delay: 0.15 } }}
              exit={{ x: -15, opacity: 0 }}
              className={styles.text}>
              Начать
            </motion.p>
          }
        </AnimatePresence>
        <IoArrowForwardSharp className={styles.icon} />
      </MotionLink>

    </div>
  )
}

export default Button