import React, { useState } from "react";
import {
  IoTimeOutline,
  IoDocumentTextOutline,
  IoCheckmarkSharp,
  IoSparklesSharp,
  IoArrowForwardSharp,
} from "react-icons/io5";
import cx from "classname";
import { useStateContext } from "../../../context/ContextProvider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { checkPayment } from "../../../functions/review";

import * as styles from "./state.module.scss";
import * as global from "../../../styles/base/global.module.scss";

function State({ data, cost, setShowlReview, setShowPayment }) {
  const [paymentLink, setPaymentLink] = useState(null);

  const { token } = useStateContext();
  const queryClient = useQueryClient();

  const { status } = data;
  console.log(data);

  const isTransation = data.transaction_id !== null ? true : false;

  const checkPaymentQuery = useQuery({
    queryKey: ["checkpaymentreview", data.id],
    queryFn: () => checkPayment(data.id),
    enabled: !!token && isTransation && status === "verified",
    refetchInterval: 1000,
    onSuccess: (res) => {
      if (res.message === "Рецензия оплачена") {
        queryClient.invalidateQueries({ queryKey: ["getAllWorksOnReview"] });
      } else if (res.message === "Платеж уже создан") {
        setPaymentLink(res.url);
      }
    },
  });

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
      {status === "checking" && (
        <div className={cx(styles.block, styles.bordergreen)}>
          <div className={styles.message}>
            <p className={styles.text}>В обработке</p>
            <IoTimeOutline className={styles.icon} />
          </div>
        </div>
      )}

      {status === "fail" && (
        <div className={styles.block}>
          <button
            className={cx(global.buttoncenter, styles.buttonbrown)}
            onClick={() => setShowlReview(true)}
          >
            <p className={global.text}>Исправить</p>
            <IoArrowForwardSharp className={global.icon} />
          </button>
        </div>
      )}

      {status === "verified" && (
        <div className={styles.block}>
          {paymentLink ? (
            <a
              href={paymentLink}
              className={cx(global.buttoncenter, styles.buttongreen)}
            >
              <p className={global.text}>Оплатить / {cost} руб.</p>
            </a>
          ) : (
            <button
              className={cx(global.buttoncenter, styles.buttongreen)}
              disabled={checkPaymentQuery.isFetching}
              onClick={() => setShowPayment(true)}
            >
              <p className={global.text}>Оплатить / {cost} руб.</p>
            </button>
          )}
        </div>
      )}

      {status === "firstchecked" && (
        <div className={styles.block}>
          <div className={styles.message}>
            <p className={styles.text}>Первая проверка</p>
            <IoTimeOutline className={styles.icon} />
          </div>
        </div>
      )}

      {status === "secondchecked" && (
        <div className={styles.block}>
          <div className={styles.message}>
            <p className={styles.text}>Вторая проверка</p>
            <IoTimeOutline className={styles.icon} />
          </div>
        </div>
      )}

      {status === "revision" && (
        <div className={styles.block}>
          <button
            className={cx(global.buttontext, styles.buttongreen)}
            onClick={() => setShowlReview(true)}
          >
            <p className={global.text}>
              Дополнить до {convertDate(data.time_for_revision)}
            </p>
          </button>
        </div>
      )}

      {status === "notcounted" && (
        <div className={styles.block}>
          <button
            className={cx(global.buttoncenter, styles.buttongreen)}
            onClick={() => setShowlReview(true)}
          >
            <p className={global.text}>Работа проверена</p>
            <IoCheckmarkSharp className={global.icon} />
          </button>
        </div>
      )}

      {status === "complete" && (
        <div className={styles.block}>
          <button
            className={cx(global.buttoncenter, styles.buttongreen)}
            onClick={() => setShowlReview(true)}
          >
            <p className={global.text}>Работа проверена</p>
            <IoSparklesSharp className={global.icon} />
          </button>
        </div>
      )}
    </div>
  );
}

export default State;
