import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import * as global from '../styles/base/global.module.scss'

function Modal({ children, visible, close }) {
  return (
    <AnimatePresence initial={false}>
      {visible &&
        <div className={global.modal}>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%', transition: { duration: 0.6 } }}
            exit={{ x: '100%', transition: { duration: 0.4 } }}
            transition={{ ease: [0.57, 0.14, 0.49, 0.91] }}
            key='modal'
            className={global.container}>
            {children}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={global.background}
            onClick={close} />
        </div>
      }
    </AnimatePresence>
  )
}

export default Modal