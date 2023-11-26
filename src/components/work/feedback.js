import React, { useState } from "react";
import cx from "classname";
import { useMutation } from "@tanstack/react-query";
import { sendMessageTelegram } from "../../functions/user";
import Modal from "../modal";

import * as global from "../../styles/base/global.module.scss";
import * as styles from "./feedback.module.scss";

function Feedback(props) {
  const [message, setMessage] = useState("");

  const isStandalone =
    typeof window !== "undefined" && window.navigator.standalone;

  const sendMessageMutation = useMutation({
    mutationFn: sendMessageTelegram,
    onSuccess: () => {
      setMessage("");
      props.close();
    },
  });

  return (
    <Modal visible={props.visible} close={props.close}>
      <div className={styles.content}>
        <h3 className={styles.title}>Обратная связь</h3>
        <p className={styles.description}>
          Напиши отзыв или пожелания по теме и мы сделаем ее лучше!
        </p>
        <textarea
          className={styles.area}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </div>
      <div className={cx(styles.action, isStandalone && styles.standalone)}>
        <button
          className={cx(global.buttontext, global.buttongreen)}
          onClick={() =>
            sendMessageMutation.mutate({
              theme: props.theme,
              message: message,
            })
          }
          disabled={sendMessageMutation.isLoading}
        >
          {sendMessageMutation.isLoading ? (
            <p className={global.text}>Отправка...</p>
          ) : (
            <p className={global.text}>Отправить</p>
          )}
        </button>
      </div>
    </Modal>
  );
}

export default Feedback;
