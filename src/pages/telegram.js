import React, { useState } from "react";
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
import { useIsTablet, useIsDesktop } from "../hooks/mediaQuery";
import { useStateContext } from "../context/ContextProvider";

import Bird from "../images/svg/bird";
import Birdonbranch from "../images/svg/birdonbranch";
import Flower from "../images/svg/flower/flowertwo";
import MetaTag from "../components/metaTag";
import Topnavigate from "../components/navigation/topnavigate";
import Topmobilenavigate from "../components/navigation/topmobilenavigate";

import * as global from "../styles/base/global.module.scss";
import * as styles from "../styles/pages/telegram.module.scss";

function Telegram() {
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();

  const { user } = useStateContext();
  const queryClient = useQueryClient();

  const [telegram, setTelegram] = useState("");
  const [error, setError] = useState(false);

  const addTelegramIdMutation = useMutation({
    mutationFn: addTelegramId,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
      if (!res.telegram.error) {
        navigate("/profile");
      }
    },
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const inputValue = event.target.value;
    const regex = /^[0-9]+$/;

    if (regex.test(inputValue) || inputValue === "") {
      setTelegram(inputValue);
      if (error) {
        setError(false);
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      {isDesktop && <Topnavigate />}
      {isTablet && <Topmobilenavigate />}
      <section className={styles.container}>
        <Bird className={styles.bird} />
        <Birdonbranch className={styles.birdonbranch} />
        <Flower className={styles.flower} />

        {user && (
          <>
            {user.telegram === null || user.telegram.error ? (
              <div className={styles.block}>
                <p className={styles.name}>
                  {user.name} / {user.email}
                </p>
                <p className={styles.title}>Telegram Bot | Графикси</p>
                <p>
                  Получайте уведомления об изменении статуса рецензии,
                  обновлениях на ресурсе и полезных материалах!
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
                  Теперь уведомления об изменении статуса рецензии, обновлениях
                  на ресурсе и полезных материалах будут приходить прямо в{" "}
                  <span>@{user.telegram.username}</span> телеграм!
                </p>
              </div>
            )}

            <div className={styles.block}>
              {user.telegram === null || user.telegram?.error ? (
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
                      Вставь <span>ID</span> из сообщения и нажми{" "}
                      <span>"Применить"</span>
                    </li>
                  </ul>
                  <p>
                    После все уведомления о статусе рецензий будут прямо в
                    телеграм!
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
                      Открой ссылку полученной после команды{" "}
                      <span>"Начать"</span> или скопируй <span>ID</span> вручную
                    </li>
                    <li>
                      Нажми <span>"Применить"</span>
                    </li>
                  </ul>
                </>
              )}
            </div>
            {user.telegram?.error && (
              <div className={cx(styles.block, styles.error)}>
                <p>
                  Добавленный <span>ID</span> телеграма <span>не найден</span>.
                  Проверьте что ID <span>скопирован полностью</span> и повторите
                  попытку.
                </p>
              </div>
            )}
            {error && (
              <div className={cx(styles.block, styles.error)}>
                <p>
                  <span>ID</span> телеграм состоит <span>только из цифр</span>.
                </p>
              </div>
            )}
            <div className={styles.action}>
              <div className={styles.field}>
                <input
                  maxLength={20}
                  placeholder="ID телеграма"
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
                      telegram.length > 5
                        ? styles.buttongreen
                        : styles.buttongrey
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
          </>
        )}
      </section>
    </>
  );
}

export const Head = () => {
  const title = "Привязать телеграм";
  const description =
    "Привязка телеграма чтобы получать уведомления о статусах рецензии и полезных материалов площадки Графикси";

  const data = {
    title: `Графикси | ${title}`,
    description: description,
    slug: `/telegram`,
    preview: "/preview.png",
  };

  return <MetaTag data={data} />;
};

export default Telegram;
