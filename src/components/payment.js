import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { navigate } from "gatsby";
import { motion } from "framer-motion";
import { IoSyncOutline } from "react-icons/io5";
import cx from "classname";
import { addSubscribe } from "../functions/subscribe";
import {
  BankCardSvg,
  SberBankSvg,
  YooMoneySvg,
} from "./reviewing/status/icons";
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

function Payment({ name, direction, cost, themes }) {
  const [methodPay, setMethodPay] = useState({
    type: "bank_card",
    name: "Банковская карта",
    styles: styles.bank,
  });

  const isStandalone =
    typeof window !== "undefined" && window.navigator.standalone;

  const queryClient = useQueryClient();

  const addSubscribeMutation = useMutation({
    mutationFn: addSubscribe,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["getAllSubscribes"] });
      const url = res.data.url;
      navigate(url);
    },
  });

  return (
    <>
      <div className={styles.content}>
        <div className={styles.head}>
          <p className={styles.title}>Подписка на {name}</p>
        </div>

        <div className={styles.block}>
          <p>Что входит</p>
          <div className={styles.info}>
            <ul>
              <li>
                <span>30 дней</span> доступа ко все материалам и функционалу
                площадки, для продуктивной работы над своим портфолио
              </li>
              <li>
                <span>{themes.length} тем</span> в направлении
              </li>
              <li>
                <span>от 1 до 3-х</span> технических задач в каждой из тем,{" "}
                <span>из реальной практики</span> наших экспертов
              </li>
              <li>
                Регулярное <span>обновление материалов</span> и{" "}
                <span>добавление новых тем</span>
              </li>
              <li>
                <span>Чат сообщества</span> в Telegram
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.block}>
          <p>Список тем</p>
          <div className={styles.info}>
            {themes.map((item, index) => {
              return (
                <div className={styles.item} key={index}>
                  <p>{item}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={cx(styles.action, isStandalone && styles.standalone)}>
        <div className={styles.method}>
          <p className={styles.title}>Выберите способ оплаты</p>
          <div className={styles.list}>
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
        </div>
        <button
          disabled={addSubscribeMutation.isLoading}
          onClick={() =>
            addSubscribeMutation.mutate({
              name: name,
              direction: direction,
              cost: cost,
              method: methodPay.type,
            })
          }
          className={cx(styles.pay, methodPay.styles)}
        >
          {addSubscribeMutation.isLoading ? (
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
                Перейти к оплате / <span>{cost} руб.</span>
              </p>
              <div className={styles.icon}>{methodPay.icon}</div>
            </>
          )}
        </button>
      </div>
    </>
  );
}

export default Payment;
