import React from "react";
import cx from "classname";
import { useStateContext } from "../../../context/ContextProvider";
import { IoAddSharp } from "react-icons/io5";
import Work from "./work";

import * as styles from "./reviewstatus.module.scss";
import * as global from "../../../styles/base/global.module.scss";

function Reviewstatus() {
  const { reviews, subscribes, setShowReview } = useStateContext();

  const isActiveSubscribe =
    Array.isArray(subscribes) && subscribes.some((item) => item.active);

  return (
    <div className={global.container}>
      <div className={styles.container}>
        {Array.isArray(reviews) && reviews?.length > 0 ? (
          <>
            <h3>Рецензии</h3>
            <div className={styles.works}>
              {reviews?.map((item, index) => {
                return <Work data={item} key={`reviewwork_${index}`} />;
              })}
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
            </div>
          </>
        ) : isActiveSubscribe ? (
          <div className={styles.firstreview}>
            <div className={styles.content}>
              <p className={styles.title}>Добавь первую рецензию</p>
              <p>
                Отправляй работы одному из выбранных тобой эксперту и получайте
                обратную связь. Успешно зачтенные работы мы отправим в портфолио
                графикси!
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
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Reviewstatus;
