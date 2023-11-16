import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoSyncOutline, IoCheckmarkSharp } from "react-icons/io5";
import cx from "classname";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fixWorkToReview, revisionReview } from "../../../functions/review";
import Modal from "../../modal";
import Detailedhead from "./detailedhead";
import Texteditor from "../../texteditor";

import * as global from "../../../styles/base/global.module.scss";
import * as styles from "./detailed.module.scss";

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
      {data.status === "fail" && (
        <>
          <div className={styles.content}>
            <Detailedhead data={data} />
            <p className={styles.title}>Что изменить / дополнить</p>
            <div className={styles.message}>
              <div
                className={global.htmltext}
                dangerouslySetInnerHTML={{ __html: data.message_failure }}
              />
            </div>
          </div>

          <div className={cx(styles.action, styles.withlink)}>
            <button
              className={cx(global.buttoncenter, styles.buttongreen)}
              disabled={fixWorkToReviewMutation.isLoading}
              onClick={() =>
                fixWorkToReviewMutation.mutate({ id: data.id, link: link })
              }
            >
              <p className={global.text}>Правки внесены</p>
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
            <div className={styles.editlink}>
              <input
                placeholder="Ссылка"
                disabled={fixWorkToReviewMutation.isLoading}
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>
        </>
      )}

      {data.status === "revision" && (
        <>
          <div className={styles.content}>
            <Detailedhead data={data} />
            <p className={styles.title}>Рецензия / Первая итерация</p>
            <div className={styles.message}>
              <div
                className={global.htmltext}
                dangerouslySetInnerHTML={{ __html: data.message_revision }}
              />
            </div>

            <p className={cx(styles.title, styles.top)}>Комментарии</p>
            <div>
              <Texteditor setText={setComment} text={comment} />
            </div>
          </div>

          <div className={styles.action}>
            <button
              className={cx(global.buttoncenter, styles.buttongreen)}
              disabled={revisionReviewMutation.isLoading}
              onClick={() =>
                revisionReviewMutation.mutate({
                  id: data.id,
                  comment: comment,
                })
              }
            >
              <p className={global.text}>Правки внесены</p>
              {revisionReviewMutation.isLoading ? (
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
          </div>
        </>
      )}

      {data.status === "overdue" && (
        <div className={styles.content}>
          <Detailedhead data={data} />

          <p className={styles.title}>Рецензия / Без доработок</p>
          <div className={styles.message}>
            <div
              className={global.htmltext}
              dangerouslySetInnerHTML={{ __html: data.message_revision }}
            />
          </div>
        </div>
      )}

      {data.status === "notcounted" && (
        <div className={styles.content}>
          <Detailedhead data={data} />
          <p className={styles.title}>Рецензия / Первая итерация</p>
          <div className={styles.message}>
            <div
              className={global.htmltext}
              dangerouslySetInnerHTML={{ __html: data.message_revision }}
            />
          </div>
          <p className={cx(styles.title, styles.top)}>
            Ваш комментарий к первой итерации
          </p>
          <div className={styles.message}>
            <div
              className={global.htmltext}
              dangerouslySetInnerHTML={{ __html: data.user_comment }}
            />
          </div>
          <p className={cx(styles.title, styles.top)}>
            Рецензия / Вторая итерация
          </p>
          <div className={styles.message}>
            <div
              className={global.htmltext}
              dangerouslySetInnerHTML={{ __html: data.message_notcounted }}
            />
          </div>
        </div>
      )}

      {data.status === "complete" && (
        <div className={styles.content}>
          <Detailedhead data={data} />
          {data.message_revision && (
            <>
              <p className={styles.title}>Рецензия / Первая итерация</p>
              <div className={styles.message}>
                <div
                  className={global.htmltext}
                  dangerouslySetInnerHTML={{ __html: data.message_revision }}
                />
              </div>
            </>
          )}
          {data.user_comment && (
            <>
              <p className={cx(styles.title, styles.top)}>
                Ваш комментарий к первой итерации
              </p>
              <div className={styles.message}>
                <div
                  className={global.htmltext}
                  dangerouslySetInnerHTML={{ __html: data.user_comment }}
                />
              </div>
            </>
          )}

          {data.message_revision ? (
            <p className={cx(styles.title, styles.top)}>
              Рецензия / Вторая итерация
            </p>
          ) : (
            <p className={styles.title}>Рецензия</p>
          )}

          <div className={styles.message}>
            <div
              className={global.htmltext}
              dangerouslySetInnerHTML={{ __html: data.message_review }}
            />
          </div>
        </div>
      )}
    </Modal>
  );
}

export default Detailed;
