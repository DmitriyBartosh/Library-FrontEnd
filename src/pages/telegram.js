import React, { useState, useEffect } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import cx from "classname";
import { AnimatePresence, motion } from "framer-motion";
import {
  IoSyncOutline,
  IoCheckmarkSharp,
  IoArrowUpSharp,
} from "react-icons/io5";
import { navigate } from "gatsby";
import { addTelegramId } from "../functions/user";
import { useSearchParam, useEffectOnce } from "react-use";
import { useStateContext } from "../context/ContextProvider";

import Bird from "../images/svg/bird";
import Birdonbranch from "../images/svg/birdonbranch";
import Flower from "../images/svg/flower/flowertwo";

import * as global from "../styles/base/global.module.scss";
import * as styles from "../styles/pages/telegram.module.scss";
import Topnavigate from "../components/navigation/topnavigate";

function Telegram() {
  const { user } = useStateContext();
  const queryClient = useQueryClient();

  const id = useSearchParam("id");

  const [telegram, setTelegram] = useState("");
  console.log(user);

  const addTelegramIdMutation = useMutation({
    mutationFn: addTelegramId,
    onSuccess: (res) => {
      console.log(res);
      navigate("/profile");
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
    },
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setTelegram(event.target.value);

    navigate(`?id=${event.target.value.toString()}`);
  };

  useEffectOnce(() => {
    setTelegram(id || "");
  });

  return (
    <>
      <Topnavigate />
      <section className={styles.container}>
        <Bird className={styles.bird} />
        <Birdonbranch className={styles.birdonbranch} />
        <Flower className={styles.flower} />

        {user.telegram === null ? (
          <div className={styles.block}>
            <p className={styles.title}>Telegram Bot | Графикси</p>
            <p>
              Получайте уведомления об изменении статуса рецензии, обновлениях
              на ресурсе и полезных материалах!
            </p>
          </div>
        ) : (
          <div className={styles.block}>
            <p className={styles.name}>
              {user.name} / {user.email}
            </p>
            <p className={styles.title}>Telegram Bot | Графикси</p>
            <p>
              Привет{" "}
              <span>
                {user.telegram.first_name} {user.telegram.last_name}!
              </span>
            </p>
            <p>
              Теперь уведомления об изменении статуса рецензии, обновлениях на
              ресурсе и полезных материалах будут приходить прямо в{" "}
              <span>@{user.telegram.username}</span> телеграм!
            </p>
          </div>
        )}

        <div className={styles.block}>
          {user.telegram === null ? (
            <>
              <p className={styles.title}>Как привязать к профилю</p>
              <ul>
                <li>
                  Открой{" "}
                  <a
                    href="https://t.me/graphiksi_bot"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Телеграм бота Графикси
                  </a>
                </li>
                <li>
                  Нажми кнопку <span>"Начать"</span>
                </li>
                <li>
                  Открой ссылку полученной после команды <span>"Начать"</span>{" "}
                  или скопируй <span>ID</span> вручную
                </li>
                <li>
                  Нажми <span>"Применить"</span>
                </li>
              </ul>
              <p>
                После все уведомления о статусе рецензий будут прямо в телеграм!
              </p>
            </>
          ) : (
            <>
              <p className={styles.title}>
                Если нужно привязать другой телеграм
              </p>
              <ul>
                <li>
                  Открой{" "}
                  <a
                    href="https://t.me/graphiksi_bot"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Телеграм бота Графикси
                  </a>
                </li>
                <li>
                  Нажми кнопку <span>"Начать"</span>
                </li>
                <li>
                  Открой ссылку полученной после команды <span>"Начать"</span>{" "}
                  или скопируй <span>ID</span> вручную
                </li>
                <li>
                  Нажми <span>"Применить"</span>
                </li>
              </ul>
            </>
          )}
        </div>

        <div className={styles.action}>
          <div className={styles.field}>
            <input
              maxLength={20}
              placeholder="Поле для ID телеграма"
              type="text"
              value={telegram}
              onChange={handleFormSubmit}
            />
          </div>

          <AnimatePresence initial={false}>
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
            >
              <button
                className={cx(
                  global.buttoncenter,
                  telegram.length > 5 ? styles.buttongreen : styles.buttongrey
                )}
                disabled={addTelegramIdMutation.isLoading}
                onClick={() =>
                  addTelegramIdMutation.mutate({
                    id: telegram,
                  })
                }
              >
                {addTelegramIdMutation.isLoading ? (
                  <>
                    <p className={global.text}>Загрузка</p>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.25, repeat: Infinity }}
                      className={global.load}
                    >
                      <IoSyncOutline className={global.svg} />
                    </motion.div>
                  </>
                ) : telegram.length > 5 ? (
                  <>
                    <p className={global.text}>Применить</p>
                    <IoCheckmarkSharp className={global.icon} />
                  </>
                ) : (
                  <>
                    <p className={global.text}>Введите ID</p>
                    <IoArrowUpSharp className={global.icon} />
                  </>
                )}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

export default Telegram;
