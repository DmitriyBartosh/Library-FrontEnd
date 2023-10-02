import React, { useState } from "react";
import { motion } from "framer-motion";
import cx from "classname";
import {
  IoArrowForwardSharp,
  IoSyncOutline,
  IoCheckmarkSharp,
  IoCheckmarkDoneSharp,
  IoCloseSharp,
  IoSparklesSharp,
} from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  workFailed,
  workReview,
  workRevision,
  workNotCounted,
} from "../../../functions/expert";
import Modal from "../../modal";
import Detailedhead from "./detailedhead";
import Texteditor from "../../texteditor";

import * as global from "../../../styles/base/global.module.scss";
import * as styles from "./detailed.module.scss";

function Detailed({ data, showDetailed, setShowDetailed }) {
  const { status, link } = data;
  const queryClient = useQueryClient();

  const [message, setMessage] = useState("");

  const isMessage = message === "";

  const reviewFaildMutation = useMutation({
    mutationFn: workFailed,
    onSuccess: () => {
      setShowDetailed(false);
      queryClient.invalidateQueries({
        queryKey: ["getAllWorksOnReviewForAdmin"],
      });
    },
  });

  const workReviewMutation = useMutation({
    mutationFn: workReview,
    onSuccess: () => {
      setShowDetailed(false);
      queryClient.invalidateQueries({
        queryKey: ["getAllWorksOnReviewForAdmin"],
      });
    },
  });

  const workRevisionMutation = useMutation({
    mutationFn: workRevision,
    onSuccess: () => {
      setShowDetailed(false);
      queryClient.invalidateQueries({
        queryKey: ["getAllWorksOnReviewForAdmin"],
      });
    },
  });

  const workNotCountedMutation = useMutation({
    mutationFn: workNotCounted,
    onSuccess: () => {
      setShowDetailed(false);
      queryClient.invalidateQueries({
        queryKey: ["getAllWorksOnReviewForAdmin"],
      });
    },
  });

  return (
    <Modal visible={showDetailed} close={() => setShowDetailed(false)}>
      {status === "checking" && (
        <>
          <div className={styles.content}>
            <Detailedhead data={data} link={link} />
            <p className={styles.title}>Что исправить / добавить</p>
            <div className={styles.textedit}>
              <Texteditor setText={setMessage} text={message} />
            </div>
          </div>

          <div className={styles.action}>
            <button
              className={cx(
                global.buttoncenter,
                styles.buttongreen,
                reviewFaildMutation.isLoading && styles.loading
              )}
              disabled={reviewFaildMutation.isLoading}
              onClick={() =>
                reviewFaildMutation.mutate({ id: data.id, message: message })
              }
            >
              <p className={global.text}>Отправить сообщение</p>
              {reviewFaildMutation.isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.25, repeat: Infinity }}
                  className={global.load}
                >
                  <IoSyncOutline className={global.svg} />
                </motion.div>
              ) : (
                <IoArrowForwardSharp className={global.icon} />
              )}
            </button>
          </div>
        </>
      )}

      {status === "firstchecked" && (
        <>
          <div className={styles.content}>
            <Detailedhead data={data} link={link} />
            <p className={styles.title}>Рецензия / Первая итерация</p>

            <div className={styles.textedit}>
              <Texteditor setText={setMessage} text={message} />
            </div>
          </div>

          <div className={cx(styles.action, styles.two)}>
            <button
              className={cx(
                global.buttoncenter,
                styles.buttongreen,
                workReviewMutation.isLoading && styles.loading
              )}
              disabled={workReviewMutation.isLoading || isMessage}
              onClick={() =>
                workReviewMutation.mutate({ id: data.id, message: message })
              }
            >
              <p className={global.text}>Работа в рейтинг</p>
              {workReviewMutation.isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.25, repeat: Infinity }}
                  className={global.load}
                >
                  <IoSyncOutline className={global.svg} />
                </motion.div>
              ) : (
                <IoCheckmarkDoneSharp className={global.icon} />
              )}
            </button>

            <button
              className={cx(
                global.buttoncenter,
                styles.buttonbrown,
                workRevisionMutation.isLoading && styles.loading
              )}
              disabled={workRevisionMutation.isLoading || isMessage}
              onClick={() =>
                workRevisionMutation.mutate({ id: data.id, message: message })
              }
            >
              <p className={global.text}>На доработку</p>
              {workRevisionMutation.isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.25, repeat: Infinity }}
                  className={global.load}
                >
                  <IoSyncOutline className={global.svg} />
                </motion.div>
              ) : (
                <IoCloseSharp className={global.icon} />
              )}
            </button>
          </div>
        </>
      )}

      {status === "secondchecked" && (
        <>
          <div className={styles.content}>
            <Detailedhead data={data} link={link} />
            <p className={styles.title}>Рецензия / Вторая итерация</p>{" "}
            <div className={styles.textedit}>
              <Texteditor setText={setMessage} text={message} />
            </div>
            <p className={cx(styles.title, styles.top)}>
              Рецензия / Первая итерация
            </p>
            <div className={styles.message}>
              <div
                className={global.htmltext}
                dangerouslySetInnerHTML={{ __html: data.message_revision }}
              />
            </div>
            <p className={cx(styles.title, styles.top)}>
              Комментарии от автора
            </p>
            <div className={styles.message}>
              <div
                className={global.htmltext}
                dangerouslySetInnerHTML={{ __html: data.user_comment }}
              />
            </div>
          </div>

          <div className={cx(styles.action, styles.two)}>
            <button
              className={cx(
                global.buttoncenter,
                styles.buttongreen,
                workReviewMutation.isLoading && styles.loading
              )}
              disabled={workReviewMutation.isLoading || isMessage}
              onClick={() =>
                workReviewMutation.mutate({ id: data.id, message: message })
              }
            >
              <p className={global.text}>Работа в рейтинге</p>
              {workReviewMutation.isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.25, repeat: Infinity }}
                  className={global.load}
                >
                  <IoSyncOutline className={global.svg} />
                </motion.div>
              ) : (
                <IoSparklesSharp className={global.icon} />
              )}
            </button>

            <button
              className={cx(
                global.buttoncenter,
                styles.buttonbrown,
                workNotCountedMutation.isLoading && styles.loading
              )}
              disabled={workNotCountedMutation.isLoading || isMessage}
              onClick={() =>
                workNotCountedMutation.mutate({
                  id: data.id,
                  message: message,
                })
              }
            >
              <p className={global.text}>Работа вне рейтинга</p>
              {workNotCountedMutation.isLoading ? (
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

      {data.status === "notcounted" && (
        <div className={styles.content}>
          <Detailedhead data={data} link={link} />
          <p className={styles.title}>Рецензия / Первая итерация</p>
          <div className={styles.message}>
            <div
              className={global.htmltext}
              dangerouslySetInnerHTML={{ __html: data.message_revision }}
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
          <Detailedhead data={data} link={link} />
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
                Комментарии от автора
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
            <p className={styles.title}>Рецензия / Принята с первой итерации</p>
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
