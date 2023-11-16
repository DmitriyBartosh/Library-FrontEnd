import React from "react";
import cx from "classname";
import { Link } from "gatsby";
import { useStateContext } from "../../context/ContextProvider";
import Linesteps from "../../images/svg/linesteps";
import * as styles from "./start.module.scss";
import * as global from "../../styles/base/global.module.scss";

function Start() {
  const { isLoggedIn } = useStateContext();

  return (
    <section className={styles.section}>
      <div className={cx(styles.header, global.container)}>
        <div className={styles.right} />
        <div className={styles.left} />

        <h3 className={styles.title}>
          <span>Как ты можешь</span>
          <span className={styles.orange}>начать?</span>
        </h3>
      </div>

      <div className={cx(styles.steps, global.container)}>
        <div className={styles.block}>
          <div className={styles.text}>
            <h5>1 шаг</h5>
            <p>
              До начала работы ты можешь{" "}
              <Link to="/directions" className={styles.link}>
                ознакомиться с нашими направлениями
              </Link>{" "}
              и страничками экспертов ниже, а так же попробовать бесплатные темы
              в каждом из направлений.
            </p>
          </div>
        </div>
        <div className={styles.block}>
          <Linesteps className={styles.icon} />
          <div className={styles.text}>
            <h5>2 шаг</h5>
            {isLoggedIn() ? (
              <p>
                <Link to="/directions" className={styles.link}>
                  Выбрать направление
                </Link>{" "}
                которое тебе интересно и оформить подписку. С подпиской на
                странице портфолио появятся все темы и возможность отправить
                выполненную работу на рецензию эксперту.
              </p>
            ) : (
              <p>
                <Link to="/auth" className={styles.link}>
                  Авторизуйся на Графикси
                </Link>{" "}
                и оформи подписку на выбранное направление. С подпиской на
                странице портфолио появятся все темы и возможность отправить
                выполненную работу на рецензию эксперту.
              </p>
            )}
          </div>
        </div>
        <div className={styles.block}>
          <Linesteps className={styles.icon} />
          <div className={styles.text}>
            <h5>3 шаг</h5>
            <p>
              На этом этапе остается только получать удовольствие от процесса,
              изучать новые темы, выполнять Технические Задания, общаться с
              экспертами.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Start;
