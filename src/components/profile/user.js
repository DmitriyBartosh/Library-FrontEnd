import React, { useState, useRef } from "react";
import cx from "classname";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "gatsby";
import { useMutation } from "@tanstack/react-query";
import { CiLogout } from "react-icons/ci";
import { IoSyncOutline, IoCheckmarkSharp } from "react-icons/io5";
import { BsQrCodeScan } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { setName } from "../../functions/user";
import { useStateContext } from "../../context/ContextProvider";

import * as global from "../../styles/base/global.module.scss";
import * as styles from "./user.module.scss";

function User() {
  const { user, setUser, onLogout } = useStateContext();

  const [isLoading, setIsLoading] = useState({
    name: false,
    save: false,
  });

  const userNameRef = useRef(user?.name);

  const isDifferent = user && userNameRef.current !== user.name;

  const setNameMutation = useMutation({
    mutationFn: setName,
    onSuccess: (res) => {
      userNameRef.current = res.name;
      setIsLoading({ ...isLoading, name: false });
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {user && (
          <>
            <div className={styles.content}>
              <div className={styles.user}>
                <p className={styles.profile}>
                  Ваш профиль / <span>{user?.email}</span>
                </p>

                <div className={styles.name}>
                  <div
                    className={cx(
                      styles.field,
                      isLoading.name && styles.visible
                    )}
                  >
                    <input
                      placeholder="Как к вам обращаться?"
                      type="text"
                      value={user.name}
                      className={styles.input}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                    />

                    <AnimatePresence initial={false} mode="popLayout">
                      {isDifferent && (
                        <motion.div
                          initial={{ opacity: 0, x: 2 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 2 }}
                          key="savename"
                        >
                          <button
                            className={cx(
                              global.buttoncenter,
                              styles.buttongreen,
                              styles.hidden
                            )}
                            onClick={() => {
                              setIsLoading({ ...isLoading, name: true });
                              setNameMutation.mutate({
                                name: user.name,
                              });
                            }}
                          >
                            {isLoading.name ? (
                              <>
                                <p className={global.text}>Сохранить</p>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 1.25,
                                    repeat: Infinity,
                                  }}
                                  className={global.load}
                                >
                                  <IoSyncOutline className={global.svg} />
                                </motion.div>
                              </>
                            ) : (
                              <>
                                <p className={global.text}>Сохранить</p>
                                <IoCheckmarkSharp className={global.icon} />
                              </>
                            )}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <p className={styles.hint}>
                    Это имя видит эксперт при отправке на рецензию
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.action}>
              <Link
                className={cx(
                  global.buttonwide,
                  user.telegram === null
                    ? styles.buttongreen
                    : styles.buttontransparent
                )}
                to="/telegram"
              >
                {user.telegram === null || user.telegram?.error ? (
                  <p className={global.text}>Привязать Telegram</p>
                ) : (
                  <p className={global.text}>
                    <span>@{user?.telegram?.username}</span>
                  </p>
                )}
                <FaTelegramPlane className={global.icon} />
              </Link>

              <button
                className={cx(global.buttoncenter, styles.buttontransparent)}
                disabled={isLoading.save}
                onClick={(event) => onLogout(event, isLoading, setIsLoading)}
              >
                {isLoading.save ? (
                  <>
                    <p className={global.text}>Выйти</p>
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
                    <p className={global.text}>Выйти</p>
                    <CiLogout className={global.icon} />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>

      <div className={styles.promocode}>
        <Link
          to="/promocode"
          className={cx(global.buttoncenter, styles.buttontransparent)}
        >
          <p className={global.text}>Добавить промокод</p>
          <BsQrCodeScan className={global.icon} />
        </Link>
      </div>
    </div>
  );
}

export default User;
