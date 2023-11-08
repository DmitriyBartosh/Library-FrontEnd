import React from "react";
import cx from "classname";
import {
  IoCardOutline,
  IoAddSharp,
  IoFileTrayFullOutline,
} from "react-icons/io5";
import { Link } from "gatsby";

import * as global from "../../styles/base/global.module.scss";
import * as styles from "./direction.module.scss";

function Direction({ data, action }) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <Link to={data.slug} className={styles.title}>
          {data.title}
        </Link>
        {data.status === "active" && (
          <p
            className={styles.text}
            dangerouslySetInnerHTML={{
              __html: `Материалы доступны еще <span>${data.days}</span>`,
            }}
          />
        )}
        {data.status === "pending" && (
          <p
            className={styles.text}
            dangerouslySetInnerHTML={{
              __html: `<span>Заверши оплату</span> для доступа к темам`,
            }}
          />
        )}
        {data.status === "other" && (
          <p
            className={styles.text}
            dangerouslySetInnerHTML={{
              __html: `Материалы доступны по <span>подписке</span>`,
            }}
          />
        )}
      </div>

      <div className={styles.action}>
        <button
          className={cx(global.buttontext, styles.button)}
          onClick={action}
        >
          <p className={global.text}>
            {data.status === "active" && "Продлить"}
            {data.status === "pending" && "Оплатить"}
            {data.status === "other" && "Подписаться"}
          </p>
        </button>
      </div>
    </div>
  );
}

export default Direction;
