import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import * as global from "../styles/base/global.module.scss";

function Modal({ children, visible, close }) {
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <div className={global.modal}>
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1, transition: { duration: 0.4 } }}
            exit={{ x: "100%", opacity: 0, transition: { duration: 0.4 } }}
            transition={{ ease: [0.57, 0.14, 0.49, 0.91] }}
            key="modal"
            className={global.content}
          >
            {children}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={global.background}
            onClick={close}
          />
        </div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
