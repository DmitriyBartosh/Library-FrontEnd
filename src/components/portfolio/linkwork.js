import React, { useState } from "react";
import {
  IoCloseOutline,
  IoCreateOutline,
  IoCheckmarkSharp,
  IoSyncOutline,
} from "react-icons/io5";
import {
  useMutation,
  useQueryClient,
  useIsFetching,
} from "@tanstack/react-query";
import { motion } from "framer-motion";
import cx from "classname";
import { editWork } from "../../functions/works";
import * as styles from "./linkwork.module.scss";
import * as global from "../../styles/base/global.module.scss";

function Linkwork({ data }) {
  const [edited, setEdited] = useState(false);
  const [link, setLink] = useState(data.link);

  const queryClient = useQueryClient();
  const isFetchingWorks = useIsFetching({ queryKey: ["getAllWorks"] });

  const editWorkMutation = useMutation({
    mutationFn: editWork,
    onSuccess: () => {
      setEdited(false);
      queryClient.invalidateQueries({ queryKey: ["getAllWorks"] });
    },
  });

  const isDifferent = !(data.link === link);
  const isLoading = editWorkMutation.isLoading || isFetchingWorks;

  const closeEdit = () => {
    setLink(data.link);
    setEdited(false);
  };

  return (
    <div className={styles.container}>
      <a
        href={data.link}
        target="_blank"
        rel="noreferrer"
        className={cx(styles.block, styles.linkwork)}
      >
        <p className={styles.text}>{data.name}</p>
      </a>
      <div className={styles.block}>
        <div className={cx(styles.editlink, edited && styles.edited)}>
          {edited ? (
            isDifferent ? (
              <button
                className={cx(global.buttoncenter, styles.save)}
                disabled={!isDifferent || isLoading}
                onClick={() =>
                  editWorkMutation.mutate({ id: data.id, link: link })
                }
              >
                {isLoading ? (
                  <>
                    <p>Сохраняем</p>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.25, repeat: Infinity }}
                      className={global.load}
                      key="loading_save"
                    >
                      <IoSyncOutline />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <p className={global.text}>Сохранить</p>
                    <IoCheckmarkSharp className={global.icon} />
                  </>
                )}
              </button>
            ) : (
              <button
                className={cx(global.buttoncenter, styles.back)}
                onClick={() => closeEdit()}
              >
                <p className={global.text}>Закрыть</p>
                <IoCloseOutline className={global.icon} />
              </button>
            )
          ) : (
            <button
              className={cx(global.buttoncenter, styles.edit)}
              onClick={() => setEdited(true)}
            >
              <p className={global.text}>Изменить</p>
              <IoCreateOutline className={global.icon} />
            </button>
          )}

          <div className={cx(styles.link, edited && styles.visible)}>
            <input
              placeholder="Ссылка"
              disabled={!edited}
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Linkwork;
