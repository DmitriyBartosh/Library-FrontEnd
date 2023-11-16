import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import cx from "classname";
import { motion } from "framer-motion";
import { IoSyncOutline, IoCheckmarkSharp } from "react-icons/io5";
import { editExpert } from "../../../functions/expert";

import * as global from "../../../styles/base/global.module.scss";

function Savebutton({ expert }) {
  const queryClient = useQueryClient();

  const editExpertMutation = useMutation({
    mutationFn: editExpert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getexpertforexpert"] });
    },
  });

  return (
    <motion.button
      className={cx(global.buttoncenter, global.buttongreen)}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.2, delay: 0.25 } }}
      exit={{ opacity: 0 }}
      disabled={editExpertMutation.isLoading}
      layout="position"
      key="savebutton"
      onClick={() => editExpertMutation.mutate({ expert })}
    >
      <p className={global.text}>Сохранить</p>
      {editExpertMutation.isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.25, repeat: Infinity }}
          className={global.icon}
        >
          <IoSyncOutline className={global.load} />
        </motion.div>
      ) : (
        <IoCheckmarkSharp className={global.icon} />
      )}
    </motion.button>
  );
}

export default Savebutton;
