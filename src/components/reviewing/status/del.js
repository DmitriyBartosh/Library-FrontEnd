import React, { useState } from "react";
import { IoTrashOutline, IoSyncOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import * as styles from "./del.module.scss";
import { deleteReview } from "../../../functions/review";

function Del({ id }) {
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const deleteReviewMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllWorksOnReview"] });
    },
  });

  return (
    <button
      className={styles.button}
      disabled={isLoading}
      onClick={() => {
        setIsLoading(true);
        deleteReviewMutation.mutate(id);
      }}
    >
      <p className={styles.text}>Удалить рецензию</p>
      {isLoading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.25, repeat: Infinity }}
          className={styles.load}
        >
          <IoSyncOutline className={styles.svg} />
        </motion.div>
      )}
    </button>
  );
}

export default Del;
