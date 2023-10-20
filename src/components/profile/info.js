import React, { useState, useRef } from "react";
import { navigate } from "gatsby";
import cx from "classname";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "gatsby";
import { CiLogout } from "react-icons/ci";
import { IoSyncOutline } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";
import { useStateContext } from "../../context/ContextProvider";

import * as global from "../../styles/base/global.module.scss";
import * as styles from "./info.module.scss";

function Info() {
  const { user, setUser, onLogout } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);

  const userNameRef = useRef(user?.name);

  const isDifferent = user && userNameRef.current !== user.name;

  return (
    <div className={styles.content}>
      {user && (
        <>
          <div className={styles.head}>
            <p className={styles.profile}>
              Ваш профиль / <span>{user?.email}</span>
            </p>

            <div className={styles.name}>
              <div className={styles.field}>
                <input
                  placeholder="Как к вам обращаться?"
                  type="text"
                  value={user.name}
                  className={styles.input}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
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
                          global.buttontext,
                          styles.buttongreen,
                          styles.hidden
                        )}
                      >
                        <p className={global.text}>Сохранить</p>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <p className={styles.hint}>
                Это имя отображается в ваших работах на рецензию
              </p>
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
              {user.telegram === null || user.telegram.error ? (
                <p className={global.text}>Привязать Telegram</p>
              ) : (
                <p className={global.text}>
                  <span>@{user?.telegram?.username}</span>
                </p>
              )}
              <FaTelegramPlane className={global.icon} />
            </Link>

            <AnimatePresence initial={false}>
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
              >
                <button
                  className={cx(global.buttoncenter, styles.buttontransparent)}
                  disabled={isLoading}
                  onClick={(event) => onLogout(event, setIsLoading)}
                >
                  {isLoading ? (
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
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
}

export default Info;
