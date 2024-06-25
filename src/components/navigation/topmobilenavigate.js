import React, { useState } from "react";
import cx from "classname";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useWillChange,
} from "framer-motion";
import { Link } from "gatsby";
import { IoMenu, IoArrowDownSharp } from "react-icons/io5";
import { useStateContext } from "../../context/ContextProvider";

import Logo from "../../images/svg/logo";
import Linkmobile from "./linkmobile";

import * as global from "../../styles/base/global.module.scss";
import * as styles from "./mobilenav.module.scss";

function Topmobilenavigate() {
  const { isLoggedIn, subscribes, works, checkAdminQuery } = useStateContext();

  const willChange = useWillChange();

  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);
  const [visible, setVisible] = useState(false);

  const isStandalone =
    typeof window !== "undefined" && window.navigator.standalone;

  const isActiveSubscribe =
    Array.isArray(subscribes) && subscribes.some((item) => item.active);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (latest > previous && latest > 300 && !visible) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.div
        className={cx(styles.top, isStandalone && styles.standalone)}
        animate={{ y: hidden ? "100%" : "0%" }}
        transition={{ duration: isStandalone ? 0.6 : 0.4, ease: "easeInOut" }}
      >
        <nav className={styles.navigate}>
          <AnimatePresence initial={false}>
            {visible && (
              <motion.div
                initial={{ y: 100 }}
                animate={{
                  y: 0,
                  transition: { duration: 0.2, ease: [0.24, 0.68, 0.79, 0.96] },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.2 },
                }}
                style={{ willChange }}
                key="content_bottom_nav"
                className={styles.content}
              >
                {checkAdminQuery.isSuccess && !checkAdminQuery.isFetching && (
                  <>
                    {checkAdminQuery.data.god && (
                      <Linkmobile
                        index={5}
                        partiallyActive={false}
                        setVisible={setVisible}
                        link="/god"
                        title="Администратор"
                        description="Добавлять и редактировать экспертов, генерировать промокоды"
                      />
                    )}
                    {checkAdminQuery.data.admin && (
                      <Linkmobile
                        index={6}
                        partiallyActive={false}
                        setVisible={setVisible}
                        link="/admin"
                        title="Эксперт"
                        description="Рецензии и список всех работ пользователей"
                      />
                    )}
                  </>
                )}
                {isLoggedIn() ? (
                  <>
                    <Linkmobile
                      index={3}
                      partiallyActive={false}
                      setVisible={setVisible}
                      link="/portfolio"
                      title="Мое портфолио"
                      description="Все доступные темы и твои выполненные работы и рецензии
                        на них от экспертов"
                    />
                    <Linkmobile
                      index={4}
                      partiallyActive={false}
                      setVisible={setVisible}
                      link="/profile"
                      title="Профиль"
                      description="Вся информация о подписках, история оплаты, активация
                      промокода и привязка телеграма"
                    />
                  </>
                ) : (
                  <Linkmobile
                    index={3}
                    partiallyActive={false}
                    setVisible={setVisible}
                    link="/auth"
                    title="Авторизация на Графикси"
                    description="Войти через одну из социальных сетей, чтобы начать
                    творчество"
                  />
                )}
                <Linkmobile
                  index={0}
                  partiallyActive={false}
                  setVisible={setVisible}
                  link="/"
                  title="Главная страница"
                  description="Вся информация о площадке Графикси"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className={styles.action}>
            <Link
              to={isLoggedIn() ? "/portfolio" : "/auth"}
              className={styles.logo}
            >
              <Logo className={styles.svg} />
            </Link>

            <button
              className={cx(global.buttoncenter, styles.menu)}
              onClick={() => setVisible(!visible)}
            >
              {visible ? (
                <>
                  <p className={global.text}>Скрыть</p>
                  <IoArrowDownSharp className={global.icon} />
                </>
              ) : (
                <>
                  <p className={global.text}>Навигация</p>
                  <IoMenu className={global.icon} />
                </>
              )}
            </button>
          </div>
        </nav>
      </motion.div>
      <AnimatePresence initial={false}>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.9,
              transition: { duration: 0.2, ease: [0.24, 0.68, 0.79, 0.96] },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.2 },
            }}
            style={{ willChange }}
            onClick={() => setVisible(false)}
            key="backgound_bottom_nav"
            className={styles.background}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Topmobilenavigate;
