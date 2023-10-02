import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoSyncOutline } from "react-icons/io5";
import cx from "classname";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workVerified } from "../../../../functions/expert";

import * as global from "../../../../styles/base/global.module.scss";
import * as styles from "./checking.module.scss";

function Checking({ id, setShowDetailed }) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const reviewVerifiedMutation = useMutation({
    mutationFn: workVerified,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllWorksOnReviewForAdmin"],
      });
    },
  });

  return (
    <div className={styles.container}>
      <AnimatePresence initial={false} mode="wait">
        {isLoading ? (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: [0.35, 0.7, 0.58, 1] }}
            key="changestatusreview"
            className={styles.loading}
          >
            <p className={styles.text}>Изменяем статус</p>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.25, repeat: Infinity }}
              className={styles.load}
            >
              <IoSyncOutline className={styles.svg} />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: [0.35, 0.7, 0.58, 1] }}
            key="loadingchangestatusreview"
            className={styles.action}
          >
            <button
              className={cx(global.buttontext, styles.current)}
              onClick={() => {
                setIsLoading(true);
                reviewVerifiedMutation.mutate({ id: id });
              }}
            >
              <p className={global.text}>Принять</p>
            </button>
            <button
              className={cx(global.buttontext, styles.fail)}
              onClick={() => setShowDetailed(true)}
            >
              <p className={global.text}>Отказать</p>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Checking;
