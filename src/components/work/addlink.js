import React, { useState } from "react";
import cx from "classname";
import {
  useMutation,
  useQueryClient,
  useIsFetching,
} from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { addWork } from "../../functions/works";
import {
  IoAddCircleOutline,
  IoCloseOutline,
  IoCheckmarkSharp,
  IoSyncOutline,
} from "react-icons/io5";
import * as styles from "./addlink.module.scss";

function Addlink({ direction, theme, hint, title }) {
  const isFetchingWorks = useIsFetching({ queryKey: ["getAllWorks"] });
  const [isAdded, setIsAdded] = useState(false);
  const [link, setLink] = useState("");

  const queryClient = useQueryClient();

  const isDifferent = link !== "";

  const closeEdit = () => {
    setLink("");
    setIsAdded(false);
  };

  const addWorkMutation = useMutation({
    mutationFn: addWork,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllWorks"] });
    },
  });

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {isAdded ? (
        <motion.div
          initial={{ opacity: 0, x: 0, y: -10 }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.3, ease: [0.25, 0.62, 0.58, 1] },
          }}
          exit={{ opacity: 0, transition: { duration: 0 } }}
          key="addedlink"
        >
          <motion.div
            initial={{ opacity: 0, x: 0, y: 10 }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              transition: {
                delay: 0.1,
                duration: 0.3,
                ease: [0.25, 0.62, 0.58, 1],
              },
            }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            className={styles.hint}
          >
            <p>
              <span>Подсказка:</span> {hint}
            </p>
          </motion.div>
          <div className={styles.container}>
            {isDifferent ? (
              <button
                className={cx(styles.save, isDifferent && styles.active)}
                disabled={
                  !isDifferent || addWorkMutation.isLoading || isFetchingWorks
                }
                onClick={() =>
                  addWorkMutation.mutate({
                    direction: direction,
                    theme: theme,
                    name: title,
                    link: link,
                  })
                }
              >
                {addWorkMutation.isLoading || isFetchingWorks ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.25, repeat: Infinity }}
                    className={styles.icon}
                  >
                    <IoSyncOutline className={styles.load} />
                  </motion.div>
                ) : (
                  <div className={styles.icon}>
                    <IoCheckmarkSharp className={styles.svg} />
                  </div>
                )}
              </button>
            ) : (
              <button
                className={styles.back}
                aria-label="Закрыть"
                onClick={() => closeEdit()}
              >
                <div className={styles.icon}>
                  <IoCloseOutline className={styles.svg} />
                </div>
              </button>
            )}
            <div className={styles.input}>
              <input
                placeholder="Ссылка на работу"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.button
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          key="startaddlink"
          onClick={() => setIsAdded(true)}
          className={styles.button}
        >
          <span className={styles.text}>Добавить работу</span>
          <IoAddCircleOutline className={styles.icon} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default Addlink;
