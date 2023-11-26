import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { AnimatePresence, motion, useWillChange } from "framer-motion";
import { useIsMobile } from "../hooks/mediaQuery";

import * as global from "../styles/base/global.module.scss";

function Modal({ children, visible, close }) {
  const isMobile = useIsMobile();

  const willChange = useWillChange();

  const desktop = {
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.5, 0.6, 0.35, 1] },
    },
    hidden: { x: "100%" },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const mobile = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    hidden: { opacity: 0, y: 15 },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <div className={global.modal}>
          <motion.div
            variants={isMobile ? mobile : desktop}
            initial="hidden"
            animate="visible"
            exit="exit"
            key="modal"
            style={{ willChange }}
            className={global.content}
          >
            <button
              className={global.close}
              onClick={close}
              aria-label="Закрыть"
            >
              <IoCloseOutline className={global.icon} />
            </button>
            {children}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ willChange }}
            className={global.background}
            onClick={close}
          />
        </div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
