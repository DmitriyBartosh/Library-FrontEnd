import React, { useState } from "react";
import cx from "classname";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { IoSyncOutline } from "react-icons/io5";
import { navigate } from "gatsby";
import { addEntryReview } from "../../functions/entryreview";

import {
  BankCardSvg,
  SberBankSvg,
  YooMoneySvg,
} from "../reviewing/status/icons";

import * as styles from "./payment.module.scss";

const methods = [
  {
    type: "bank_card",
    name: "Банковская карта",
    styles: styles.bank,
    icon: <BankCardSvg className={styles.svg} />,
  },
  {
    type: "sberbank",
    name: "Sber Pay",
    styles: styles.sberbank,
    icon: <SberBankSvg className={styles.svg} />,
  },
  {
    type: "yoo_money",
    name: "ЮMoney",
    styles: styles.yoomoney,
    icon: <YooMoneySvg className={styles.svg} />,
  },
];

function Payment({ price, questions, review, setReview }) {
  const [methodPay, setMethodPay] = useState({
    type: "bank_card",
    name: "Банковская карта",
    styles: styles.bank,
  });

  const isStandalone =
    typeof window !== "undefined" && window.navigator.standalone;

  // Отправляем вопрос на ревью 360
  const addEntryReviewMutation = useMutation({
    mutationFn: addEntryReview,
    onSuccess: (res) => {
      setReview({ ...review, open: false });
      const url = res.data.url;
      navigate(url);
    },
  });

  return (
    <div className={cx(styles.action, isStandalone && styles.standalone)}>
      <div className={styles.method}>
        {methods.map((item) => {
          return (
            <button
              key={item.type}
              className={cx(
                styles.item,
                item.styles,
                methodPay.type === item.type && styles.active
              )}
              onClick={() => setMethodPay(item)}
            >
              <p className={styles.text}>{item.name}</p>
              <div className={styles.icon}>{item.icon}</div>
            </button>
          );
        })}
      </div>
      <button
        disabled={addEntryReviewMutation.isLoading}
        onClick={() =>
          addEntryReviewMutation.mutate({
            answers: review.answers,
            questions: questions,
            price: price,
            method: methodPay.type,
            slug: "design",
            service: "Тестовая оплата за DesignReview 360",
          })
        }
        className={cx(styles.pay, methodPay.styles)}
      >
        {addEntryReviewMutation.isLoading ? (
          <>
            <p className={styles.text}>Платеж создается</p>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.25, repeat: Infinity }}
              className={styles.load}
            >
              <IoSyncOutline className={styles.svg} />
            </motion.div>
          </>
        ) : (
          <>
            <p className={styles.text}>
              Перейти к оплате /{" "}
              <span className={styles.cost}>{price} руб.</span>
            </p>
            <div className={styles.icon}>{methodPay.icon}</div>
          </>
        )}
      </button>
    </div>
  );
}

export default Payment;
