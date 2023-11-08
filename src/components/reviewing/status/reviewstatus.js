import React from "react";
import cx from "classname";
import { Link } from "gatsby";
import { useStateContext } from "../../../context/ContextProvider";
import { IoAddSharp, IoArrowForwardSharp } from "react-icons/io5";
import Work from "./work";

import * as styles from "./reviewstatus.module.scss";
import * as global from "../../../styles/base/global.module.scss";

function Reviewstatus() {
  const { reviews, works, subscribes, setShowReview } = useStateContext();

  const isActiveSubscribe =
    Array.isArray(subscribes) && subscribes.some((item) => item.active);

  return (
    <div className={styles.container}>
      {Array.isArray(reviews) && reviews?.length > 0 ? (
        <>
          <h3>Рецензии</h3>
          <div className={styles.works}>
            {reviews?.map((item, index) => {
              return <Work data={item} key={`reviewwork_${index}`} />;
            })}
            {isActiveSubscribe && (
              <button
                className={styles.morereview}
                onClick={() => setShowReview(true)}
              >
                <p className={styles.text}>
                  Добавить
                  <br />
                  рецензию
                </p>
                <IoAddSharp className={styles.icon} />
              </button>
            )}
          </div>
        </>
      ) : isActiveSubscribe ? (
        works.length > 0 ? (
          <div className={styles.firstreview}>
            <div className={styles.content}>
              <p className={styles.title}>Добавь первую рецензию</p>
              <p>
                Отправляй работы одному из выбранных экспертов и получай
                обратную связь. Успешно зачтенные работы мы публикуем прямо на
                сайте графикси!
              </p>
            </div>
            <div className={styles.action}>
              <button
                className={cx(global.buttonwide, styles.button)}
                onClick={() => setShowReview(true)}
              >
                <p className={global.text}>Выбрать работу на рецензию</p>
                <IoAddSharp className={global.icon} />
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.firstreview}>
            <div className={styles.content}>
              <p className={styles.title}>Как добавить первую рецензию?</p>
              <p>
                Выполняй работы по техническому заданию и прикрепляй ссылку на
                свою работу внутри тем.
                <br />
                <br />
                Когда у тебя будет хотя бы одна работа, сможешь отправить на
                рецензию одному из выбранных экспертов и получить обратную
                связь. Успешно зачтенные работы мы публикуем прямо на сайте
                графикси!
              </p>
            </div>
          </div>
        )
      ) : (
        <div className={styles.firstreview}>
          <div className={styles.content}>
            <p className={styles.title}>Как добавить первую рецензию?</p>
            <p>
              После того как ты преобретешь подписку, то сразу же сможешь
              отправлять прикрепленные работы на рецензию нашим экспертам и
              получать обратную связь. Успешно зачтенные работы мы публикуем
              прямо на сайте графикси!
            </p>
          </div>
          <div className={styles.action}>
            <Link
              className={cx(global.buttonwide, styles.button)}
              to="/profile"
            >
              <p className={global.text}>Выбрать направление</p>
              <IoArrowForwardSharp className={global.icon} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reviewstatus;
