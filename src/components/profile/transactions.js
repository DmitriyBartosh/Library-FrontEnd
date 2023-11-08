import React from "react";
import { useQuery } from "@tanstack/react-query";
import cx from "classname";
import { convertDateJson } from "../../functions/other";
import { getTransactions } from "../../functions/user";
import { useStateContext } from "../../context/ContextProvider";

import * as global from "../../styles/base/global.module.scss";
import * as styles from "./transactions.module.scss";

function Transactions() {
  const { user } = useStateContext();

  const transactionsQuery = useQuery({
    queryKey: ["getTransaction"],
    queryFn: getTransactions,
    enabled: !!user,
  });

  const { data, isLoading } = transactionsQuery;

  if (isLoading) {
    return;
  }

  return (
    data.transactions.length > 0 && (
      <section className={styles.container}>
        <p className={styles.title}>Покупки</p>
        <div className={styles.list}>
          {data.transactions.map((item, index) => {
            const { description, created_at, status, amount } = item;
            const create = convertDateJson(created_at);

            return (
              <div className={styles.item} key={`transaction_${index}`}>
                <p className={styles.name}>{description}</p>
                <p className={styles.detail}>
                  Стоимость: <span>{amount.value} руб.</span>
                </p>
                <p className={styles.detail}>
                  Создан:{" "}
                  <span>
                    {create.day} {create.month} {create.year}
                  </span>
                </p>
                <p
                  className={cx(
                    styles.detail,
                    status === "succeeded" && styles.succeeded,
                    status === "canceled" && styles.canceled,
                    (status === "pending" ||
                      status === "waiting_for_capture") &&
                      styles.waiting
                  )}
                >
                  Статус:{" "}
                  <span>
                    {status === "succeeded" && "успешно"}
                    {status === "canceled" && "отменен"}
                    {status === "pending" && "оплата не завершена"}
                    {status === "waiting_for_capture" && "успешно"}
                  </span>
                </p>
                {status === "pending" && (
                  <a
                    href={item?.confirmation?.confirmation_url}
                    className={cx(global.buttoncenter, styles.buttongreen)}
                  >
                    <p className={global.text}>Завершить оплату</p>
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </section>
    )
  );
}

export default Transactions;
