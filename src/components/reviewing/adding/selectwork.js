import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoCheckmarkSharp } from "react-icons/io5";
import cx from "classname";
import * as styles from "./selectwork.module.scss";

function Selectwork({ data, addWork, review }) {
  const { id, theme, name } = data;

  const isChecked = review.works.some((selectwork) => selectwork.id === id);
  const selectWork = review.select === "work";
  const selectExpert = review.select === "expert";

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {(selectWork || isChecked) && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.49, 0.22, 0.27, 0.88] }}
          layout="position"
          className={cx(
            styles.container,
            isChecked && styles.checked,
            selectExpert && styles.cursor
          )}
          onClick={() => addWork(id, theme)}
          disabled={selectExpert}
        >
          <div className={styles.check}>
            <IoCheckmarkSharp className={styles.icon} />
          </div>
          <p className={styles.name}>{name}</p>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default Selectwork;
