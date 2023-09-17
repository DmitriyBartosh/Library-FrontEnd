import React from "react";
import { Link } from "gatsby";
import cx from "classname";
import { IoArrowForwardSharp } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { useStaticQuery, graphql } from "gatsby";
import { useStateContext } from "../../context/ContextProvider";

import Bird from "../../images/svg/bird";
import Birdonbranch from "../../images/svg/birdonbranch";
import Flowerone from "../../images/svg/flower/flowerone";
import Flowertwo from "../../images/svg/flower/flowertwo";
import * as styles from "./preview.module.scss";
import * as global from "../../styles/base/global.module.scss";

function Preview() {
  const { isLoggedIn } = useStateContext();

  const directionQuery = useStaticQuery(graphql`
    query {
      allDirectionsJson {
        edges {
          node {
            slug
            title
          }
        }
      }
    }
  `);

  const allDirection = directionQuery.allDirectionsJson.edges;

  return (
    <>
      <section className={cx(styles.section, global.container)}>
        <Bird className={styles.bird} />
        <Birdonbranch className={styles.birdonbranch} />
        <Flowerone className={styles.flower} />
        <div className={styles.mask}>
          <Flowertwo className={styles.flowers} />
        </div>
        <div className={styles.info}>
          <h1>
            Дай старт своей
            <br />
            карьере с Графикси
          </h1>
          <p>
            Сервис, который помогает улучшить портфолио и получить консультации
            от экспертов на любом этапе твоей карьеры{" "}
          </p>
          {isLoggedIn() ? (
            <Link
              className={cx(global.buttoncenter, styles.start)}
              to="/portfolio"
            >
              <IoArrowForwardSharp className={global.icon} />
              <p className={global.text}>Продолжить</p>
            </Link>
          ) : (
            <Link className={cx(global.buttoncenter, styles.start)} to="/auth">
              <CiLogin className={global.icon} />
              <p className={global.text}>Начать путь</p>
            </Link>
          )}
        </div>
        <div className={styles.directions}>
          {allDirection.map((item, index) => {
            const { slug, title } = item.node;

            return (
              <Link
                to={`/portfolio/${slug}`}
                className={styles.link}
                key={`direction_link_${index}`}
              >
                <p>#{title.replace(/\s+/g, "_")}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className={styles.about}>
        <div className={cx(styles.container, global.container)}>
          <div className={styles.title}>
            <h2>Создавай портфолио по плану, который работает:</h2>
          </div>
          <div className={styles.list}>
            <div className={styles.block}>
              <p className={styles.text}>Выполняй Задания</p>
            </div>
            <div className={styles.block}>
              <p className={styles.text}>Изучай конспекты в удобном формате</p>
            </div>
            <div className={styles.block}>
              <p className={styles.text}>Получай разборы от экспертов</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Preview;
