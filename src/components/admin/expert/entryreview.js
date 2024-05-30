import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import cx from "classname";
import {
  IoSyncOutline,
  IoSaveOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import { getAllAnswers, addFeetback } from "../../../functions/entryreview";

import Modal from "../../modal";
import TextEditor from "../../texteditor";

import * as styles from "./entryreview.module.scss";
import * as global from "../../../styles/base/global.module.scss";

function Entryreview() {
  const [detail, setDetail] = useState({
    open: false,
    data: null,
  });
  const [frameLink, setFrameLink] = useState("");
  const [annotation, setAnnotation] = useState("");

  const allAnswersQuery = useQuery({
    queryKey: ["getAllAnswers", "design"],
    queryFn: () => getAllAnswers("design"),
  });

  // Отправляем вопрос на ревью 360
  const addFeetbackMutation = useMutation({
    mutationFn: addFeetback,
    onSuccess: () => {
      setDetail({ open: false, data: null });
      allAnswersQuery.refetch();
    },
  });

  if (allAnswersQuery.isLoading) return <p>Загрузка DesignReview 360...</p>;

  if (allAnswersQuery.isError)
    return <p>Ошибка загрузки DesignReview 360, попробуй позже</p>;

  if (allAnswersQuery.data.length === 0) return null;

  return (
    <>
      <section className={styles.container}>
        <h4>DesignReview 360</h4>
        <div className={styles.list}>
          {allAnswersQuery.data.map((item, index) => {
            const { user_name, user_email, telegram, status } = item;

            console.log(item);

            return (
              <div key={`user_${index}`} className={styles.item}>
                <div className={styles.head}>
                  <p className={styles.name}>{user_name}</p>
                  <div className={styles.contact}>
                    <a href={`mailto:${user_email}`}>{user_email}</a>
                    <a href={`https://t.me/${telegram.username}`}>
                      https://t.me/{telegram.username}
                    </a>
                  </div>
                </div>

                <div className={styles.state}>
                  {(status === "paid" || status === "complete") && (
                    <button
                      className={cx(global.buttoncenter, global.buttongreen)}
                      onClick={() => {
                        setDetail({
                          open: true,
                          data: item,
                        });

                        if (status === "complete") {
                          setFrameLink(item.roadmap);
                          setAnnotation(item.annotation);
                        }
                      }}
                    >
                      {status === "paid" && (
                        <p className={global.text}>Проверить</p>
                      )}
                      {status === "complete" && (
                        <p className={global.text}>Изменить</p>
                      )}
                      <IoDocumentTextOutline className={global.icon} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Modal
        visible={detail.open}
        close={() =>
          setDetail({
            open: false,
            data: null,
          })
        }
      >
        {detail.data && (
          <>
            <div className={styles.content}>
              <div className={styles.user}>
                <p className={styles.name}>{detail.data.user_name}</p>
                <a href={`mailto:${detail.data.user_email}`}>
                  {detail.data.user_email}
                </a>
                <a href={`https://t.me/${detail.data.telegram.username}`}>
                  https://t.me/{detail.data.telegram.username}
                </a>
              </div>
              <div className={styles.answers}>
                {detail.data.answers.map((item, index) => {
                  return (
                    <div className={styles.item} key={`answer_${index}`}>
                      <p className={styles.question}>
                        {index + 1}. {detail.data.questions[index]}
                      </p>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: item,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className={styles.annotation}>
                <h6>Комментарии</h6>
                <TextEditor text={annotation} setText={setAnnotation} />
              </div>

              <div className={styles.frame}>
                <h6>Ссылка на дорожную карту</h6>
                <input
                  type="text"
                  onChange={(e) => setFrameLink(e.target.value)}
                  value={frameLink}
                />

                <iframe
                  style={{ overflow: "hidden" }}
                  title="Дорожная карта"
                  scrolling="no"
                  src={frameLink}
                  width="100%"
                  height="600px"
                />
              </div>
            </div>
            <div className={styles.action}>
              <button
                disabled={addFeetbackMutation.isLoading}
                onClick={() =>
                  addFeetbackMutation.mutate({
                    id: detail.data.id,
                    annotation: annotation,
                    roadmap: frameLink,
                  })
                }
                className={cx(global.buttoncenter, global.buttongreen)}
              >
                {addFeetbackMutation.isLoading ? (
                  <>
                    <p className={global.text}>Сохраняю ревью</p>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.25, repeat: Infinity }}
                      className={global.load}
                    >
                      <IoSyncOutline className={global.svg} />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <p className={global.text}>Сохранить</p>
                    <IoSaveOutline className={global.icon} />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

export default Entryreview;
