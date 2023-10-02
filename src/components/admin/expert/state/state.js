import React from "react";
import { AnimatePresence } from "framer-motion";
import cx from "classname";
import {
  IoWalletOutline,
  IoCheckmarkSharp,
  IoTimeOutline,
  IoDocumentTextOutline,
  IoSparklesSharp,
} from "react-icons/io5";
import Checking from "./checking";

import * as global from "../../../../styles/base/global.module.scss";
import * as styles from "./state.module.scss";

function State({ data, setShowDetailed }) {
  const { id, status } = data;
  console.log(data);

  const convertDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    const month = monthNames[date.getMonth()];
    const formatted = `${date.getDate()} ${month}`;

    return formatted;
  };

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {status === "checking" && (
          <Checking id={id} setShowDetailed={setShowDetailed} />
        )}
        {status === "verified" && (
          <div className={styles.block}>
            <p className={styles.text}>Ожидание оплаты</p>
            <IoWalletOutline className={styles.icon} />
          </div>
        )}
        {status === "fail" && (
          <div className={styles.block}>
            <p className={styles.text}>Дополняется</p>
            <IoTimeOutline className={styles.icon} />
          </div>
        )}
        {status === "revision" && (
          <div className={styles.block}>
            <p className={styles.text}>
              Правки до {convertDate(data.time_for_revision)}
            </p>
          </div>
        )}
        {status === "firstchecked" && (
          <button
            className={cx(global.buttoncenter, styles.buttongreen)}
            onClick={() => setShowDetailed(true)}
          >
            <p className={global.text}>Проверить</p>
            <IoDocumentTextOutline className={global.icon} />
          </button>
        )}

        {status === "secondchecked" && (
          <button
            className={cx(global.buttoncenter, styles.buttongreen)}
            onClick={() => setShowDetailed(true)}
          >
            <p className={global.text}>Вторая проверка</p>
            <IoDocumentTextOutline className={global.icon} />
          </button>
        )}

        {status === "notcounted" && (
          <button
            className={cx(global.buttoncenter, styles.buttongreen)}
            onClick={() => setShowDetailed(true)}
          >
            <p className={global.text}>Вне рейтинга</p>
            <IoCheckmarkSharp className={global.icon} />
          </button>
        )}

        {status === "complete" && (
          <button
            className={cx(global.buttoncenter, styles.buttongreen)}
            onClick={() => setShowDetailed(true)}
          >
            <p className={global.text}>В рейтинге</p>
            <IoSparklesSharp className={global.icon} />
          </button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default State;
