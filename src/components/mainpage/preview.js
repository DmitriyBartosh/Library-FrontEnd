import React from "react";
import { Link } from "gatsby";
import cx from "classname";
import { IoArrowForwardSharp } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { useStateContext } from "../../context/ContextProvider";

import Flower from "../../images/svg/flower";
import Flowerone from "../../images/svg/flower/flowerone";
import Flowertwo from "../../images/svg/flower/flowertwo";

import * as styles from "./preview.module.scss";
import * as global from "../../styles/base/global.module.scss";

function Preview() {
  const { isLoggedIn } = useStateContext();

  return (
    <>
      <section className={global.container}>
        <div className={styles.section}>
          <Flower className={styles.floweryellow} />
          <Flowerone className={styles.flower} />
          <div className={styles.mask}>
            <Flowertwo className={styles.flowers} />
          </div>
          <div className={styles.info}>
            <h1>
              Онлайн практикум
              <br />
              Графикси
            </h1>
            <p className={styles.subtitle}>
              Площадка для начинающих дизайнеров <span>от 12 лет</span>
            </p>
            {isLoggedIn() ? (
              <Link
                className={cx(global.buttoncenter, styles.start)}
                to="/portfolio"
              >
                <p className={global.text}>Продолжить</p>
                <IoArrowForwardSharp className={global.icon} />
              </Link>
            ) : (
              <Link
                className={cx(global.buttoncenter, styles.start)}
                to="/auth"
              >
                <p className={global.text}>Начать путь</p>
                <CiLogin className={global.icon} />
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className={styles.about}>
        <div className={cx(styles.container, global.container)}>
          <div className={styles.title}>
            <h2>Шаг за шагом становись профессионалом</h2>
          </div>
          <div className={styles.list}>
            <div className={styles.block}>
              <p>Много практики</p>
            </div>
            <div className={styles.block}>
              <p>Обратная связь от практикующих экспертов</p>
            </div>
            <div className={styles.block}>
              <p>Понятная и наглядная теория</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Preview;
