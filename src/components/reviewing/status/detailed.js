import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoSyncOutline, IoCheckmarkSharp } from "react-icons/io5";
import cx from "classname";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fixWorkToReview, revisionReview } from "../../../functions/review";
import Modal from "../../modal";

import * as styles from "./detailed.module.scss";
import * as global from "../../../styles/base/global.module.scss";

function Detailed({ data, showReview, setShowlReview }) {
  const [link, setLink] = useState(data.work.link);
  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();

  const fixWorkToReviewMutation = useMutation({
    mutationFn: fixWorkToReview,
    onSuccess: () => {
      setShowlReview(false);
      queryClient.invalidateQueries({ queryKey: ["getAllWorksOnReview"] });
    },
  });

  const revisionReviewMutation = useMutation({
    mutationFn: revisionReview,
    onSuccess: () => {
      setShowlReview(false);
      queryClient.invalidateQueries({ queryKey: ["getAllWorksOnReview"] });
    },
  });

  return (
    <Modal visible={showReview} close={() => setShowlReview(false)}>
      <div className={styles.container}>
        <div className={styles.work}>
          <p className={styles.name}>Эксперт / {data.expert.name}</p>
          <a
            href={data.link ? data.link : data.work.link}
            target="_blank"
            rel="noreferrer"
            className={styles.titlelink}
          >
            {data.work.name}
          </a>
        </div>
        {data.status === "fail" && (
          <>
            <p className={styles.hint}>Что исправить</p>

            <div className={styles.message}>
              <pre>{data.message_failure}</pre>
            </div>

            <div className={styles.editlink}>
              <input
                placeholder="Ссылка"
                disabled={fixWorkToReviewMutation.isLoading}
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <button
              className={cx(global.buttonwide, styles.send)}
              disabled={fixWorkToReviewMutation.isLoading}
              onClick={() =>
                fixWorkToReviewMutation.mutate({ id: data.id, link: link })
              }
            >
              <p className={global.text}>Отправить эксперту</p>
              {fixWorkToReviewMutation.isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.25, repeat: Infinity }}
                  className={global.load}
                >
                  <IoSyncOutline className={global.svg} />
                </motion.div>
              ) : (
                <IoCheckmarkSharp className={global.icon} />
              )}
            </button>
          </>
        )}

        {data.status === "revision" && (
          <>
            <p className={styles.hint}>Рецензия</p>
            <div className={styles.message}>
              <pre>{data.message_revision}</pre>
            </div>

            <div className={styles.action}>
              <div className={styles.comment}>
                <textarea
                  rows="4"
                  placeholder="Комментарии (по необходимости)"
                  disabled={revisionReviewMutation.isLoading}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <button
                className={styles.send}
                disabled={revisionReviewMutation.isLoading}
                onClick={() =>
                  revisionReviewMutation.mutate({
                    id: data.id,
                    comment: comment,
                  })
                }
              >
                <p className={styles.text}>Правки внесены</p>
                {revisionReviewMutation.isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.25, repeat: Infinity }}
                    className={styles.load}
                  >
                    <IoSyncOutline className={styles.svg} />
                  </motion.div>
                ) : (
                  <div className={styles.icon}>
                    <IoCheckmarkSharp className={styles.svg} />
                  </div>
                )}
              </button>
            </div>
          </>
        )}

        {data.status === "notcounted" && (
          <>
            <p className={styles.title}>Рецензия</p>
            <div className={styles.message}>
              <pre>{data.message_revision}</pre>
            </div>
            <p className={styles.title}>Что исправить</p>
            <div className={styles.message}>
              <pre>{data.message_notcounted}</pre>
            </div>
            <button className={styles.repeat}>
              <p className={styles.text}>Повторить рецензию</p>
              <div className={styles.icon}>
                <IoCheckmarkSharp className={styles.svg} />
              </div>
            </button>
          </>
        )}

        {data.status === "complete" && (
          <>
            {data.message_revision && (
              <>
                <p className={styles.title}>Первая проверка</p>
                <div className={styles.message}>
                  <pre>{data.message_revision}</pre>
                </div>
              </>
            )}
            <p className={styles.title}>Рецензия</p>
            <div className={styles.message}>
              <pre>{data.message_review}</pre>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

export default Detailed;
