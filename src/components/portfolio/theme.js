import React, { useState } from "react";
import cx from "classname";
import {
  IoArrowForwardSharp,
  IoArrowDownSharp,
  IoCloseSharp,
  IoAddSharp,
} from "react-icons/io5";
import { Link } from "gatsby";
import Linkwork from "./linkwork";

import * as styles from "./theme.module.scss";
import * as global from "../../styles/base/global.module.scss";

function Theme({ data, themes, worksOnTheme }) {
  const [isVisible, setIsVisible] = useState(false);

  const { title, time, complexity, description } = data;

  const attachedWorks = [
    "1 работа",
    "2 работы",
    "3 работы",
    "4 работы",
    "5 работ",
  ];

  return (
    <div
      className={cx(
        styles.container,
        worksOnTheme.length > 0 && styles.complete
      )}
    >
      <div className={styles.card}>
        <button
          className={styles.button}
          onClick={() => setIsVisible(!isVisible)}
        >
          <div className={styles.info}>
            <p className={styles.title}>{title}</p>
            <div className={styles.complexity}>
              <p>
                Сложность: <span>{complexity}/10</span>
              </p>
              <p>
                Время: <span>{time}</span>
              </p>
              {worksOnTheme.length > 0 && (
                <p>
                  Выполнено{" "}
                  <span>{attachedWorks[worksOnTheme.length - 1]}</span>
                </p>
              )}
            </div>
          </div>
          <div className={styles.hint}>
            {isVisible ? (
              <>
                <p className={styles.text}>Закрыть</p>
                <IoCloseSharp className={styles.icon} />
              </>
            ) : (
              <>
                <p className={styles.text}>Подробнее</p>
                <IoArrowDownSharp className={styles.icon} />
              </>
            )}
          </div>
          <IoAddSharp className={styles.openmobile} />
        </button>
        <div className={styles.link}>
          <Link
            to={`/${themes.slug}/${data.slug}`}
            className={cx(global.buttoncenter, styles.buttongreen)}
          >
            <p className={global.text}>Открыть</p>
            <IoArrowForwardSharp className={global.icon} />
          </Link>
        </div>
      </div>
      {isVisible && (
        <div className={styles.detail}>
          <p className={styles.title}>О чем тема</p>
          <div
            className={styles.about}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {worksOnTheme.length > 0 && (
            <>
              <p className={styles.title}>Выполненные работы</p>
              <div>
                {worksOnTheme.map((item, index) => {
                  return (
                    <Linkwork data={item} index={index} key={`link_${index}`} />
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Theme;
