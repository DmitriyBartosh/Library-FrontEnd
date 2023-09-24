import React from "react";
import cx from "classname";
import { IoArrowForwardSharp, IoFolderOpenOutline } from "react-icons/io5";
import { Link } from "gatsby";

import * as styles from "./theme.module.scss";
import * as global from "../../styles/base/global.module.scss";

function Theme({ data, themes, worksOnTheme }) {
  const { title, time, tags, complexity } = data;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.head}>
          <p className={styles.title}>{title}</p>
          <div className={styles.tags}>
            {tags.map((item, index) => {
              return <p key={`tag_${index}`}>#{item}</p>;
            })}
          </div>
        </div>
        <div className={styles.complexity}>
          <p>
            Сложность: <span>{complexity}/10</span>
          </p>
          <p>
            Время: <span>{time}</span>
          </p>
        </div>
      </div>

      <div className={styles.action}>
        {worksOnTheme.length > 0 ? (
          <>
            <Link
              to={`/${themes.slug}/${data.slug}`}
              className={cx(global.buttonwide, styles.button)}
            >
              <p className={global.text}>Продолжить</p>
              <IoArrowForwardSharp className={global.icon} />
            </Link>

            {worksOnTheme.map((item, index) => {
              return (
                <a
                  href={item.link}
                  target="_blank"
                  className={cx(global.buttonicon, styles.link)}
                  key={`work_${index}`}
                >
                  <IoFolderOpenOutline className={global.icon} />
                </a>
              );
            })}
          </>
        ) : (
          <Link
            to={`/${themes.slug}/${data.slug}`}
            className={cx(global.buttonwide, styles.button)}
          >
            <p className={global.text}>Начать</p>
            <IoArrowForwardSharp className={global.icon} />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Theme;
