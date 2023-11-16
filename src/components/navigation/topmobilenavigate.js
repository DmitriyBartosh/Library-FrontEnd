import React, { useState } from "react";
import cx from "classname";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "gatsby";
import { IoMenu, IoArrowDownSharp } from "react-icons/io5";
import { useStateContext } from "../../context/ContextProvider";
import Logo from "../../images/svg/logo";

import * as global from "../../styles/base/global.module.scss";
import * as styles from "./mobilenav.module.scss";

function Topmobilenavigate() {
  const { isLoggedIn, subscribes, works } = useStateContext();

  const isStandalone = window.navigator.standalone;

  const [visible, setVisible] = useState(false);

  const MotionLink = motion(Link);

  const variantsLink = {
    initial: {
      y: 8,
      opacity: 0,
    },
    animate: (custom) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.2 + custom * 0.04 },
    }),
    exit: {
      opacity: 0,
    },
  };

  const isActiveSubscribe =
    Array.isArray(subscribes) && subscribes.some((item) => item.active);

  return (
    <div className={cx(styles.top, isStandalone && styles.standalone)}>
      <nav className={styles.navigate}>
        <AnimatePresence initial={false}>
          {visible && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{
                y: "0%",
                transition: { duration: 0.2, ease: [0.24, 0.68, 0.79, 0.96] },
              }}
              exit={{
                y: "100%",
                transition: { duration: 0.2, ease: [0.24, 0.68, 0.79, 0.96] },
              }}
              className={styles.content}
            >
              <MotionLink
                variants={variantsLink}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0}
                to="/"
                activeClassName={styles.active}
                className={styles.link}
              >
                <p className={styles.title}>Главная страница</p>
                <p className={styles.description}>
                  Вся информация о площадке Графикси
                </p>
              </MotionLink>
              <MotionLink
                variants={variantsLink}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={1}
                to="/directions"
                partiallyActive={true}
                activeClassName={styles.active}
                className={styles.link}
              >
                <p className={styles.title}>Направления</p>
                <p className={styles.description}>
                  Подробнее о направлениях и вариантах подписки
                </p>
              </MotionLink>
              <MotionLink
                variants={variantsLink}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={2}
                to="/articles"
                partiallyActive={true}
                activeClassName={styles.active}
                className={styles.link}
              >
                <p className={styles.title}>Полезные статьи</p>
                <p className={styles.description}>
                  Эти статьи дополняют авторские курсы наших экспертов
                </p>
              </MotionLink>
              {isLoggedIn() ? (
                <>
                  {(works?.length > 0 || isActiveSubscribe) && (
                    <MotionLink
                      variants={variantsLink}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={3}
                      to="/portfolio"
                      activeClassName={styles.active}
                      className={styles.link}
                    >
                      <p className={styles.title}>Мое портфолио</p>
                      <p className={styles.description}>
                        Все доступные темы и твои выполненные работы и рецензии
                        на них от экспертов
                      </p>
                    </MotionLink>
                  )}
                  <MotionLink
                    variants={variantsLink}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    custom={4}
                    to="/profile"
                    activeClassName={styles.active}
                    className={styles.link}
                  >
                    <p className={styles.title}>Профиль</p>
                    <p className={styles.description}>
                      Вся информация о подписках, история оплаты, активация
                      промокода и привязка телеграма
                    </p>
                  </MotionLink>
                </>
              ) : (
                <MotionLink
                  variants={variantsLink}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={3}
                  to="/profile"
                  activeClassName={styles.active}
                  className={styles.auth}
                >
                  <p className={styles.title}>Авторизация на Графикси</p>
                  <p className={styles.description}>
                    Войти через одну из социальных сетей, чтобы начать
                    творчество
                  </p>
                </MotionLink>
              )}
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
    </div>
  );
}

export default Topmobilenavigate;
