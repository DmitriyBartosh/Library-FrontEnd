import React from "react";
import { IoArrowForwardSharp } from "react-icons/io5";
import cx from "classname";
import { Link } from "gatsby";
import { useStateContext } from "../../../context/ContextProvider";

import * as styles from "./detail.module.scss";

function Detail({ detail, setDetail }) {
  const { title, tags, steps, time, description, free } = detail.data;
  const { isSubscribe } = useStateContext();

  const isStandalone =
    typeof window !== "undefined" && window.navigator.standalone;

  return (
    <>
      <div className={styles.content}>
        <div className={styles.head}>
          <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.block}>
          <p className={styles.name}>Какое направление</p>
          <div className={styles.info}>
            <p>{detail.title}</p>
          </div>
        </div>
        <div className={styles.block}>
          <p className={styles.name}>Что освоите</p>

          <div className={styles.info}>
            {tags?.map((item, index) => {
              return (
                <div className={styles.tag} key={index}>
                  <p>{item}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.block}>
          <p className={styles.name}>Сколько выполнять</p>
          <div className={styles.info}>{time}</div>
        </div>

        <div className={styles.description}>
          <p className={styles.title}>О чем эта тема</p>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>

        <div className={styles.steps}>
          {steps?.map((item, index) => {
            return (
              <div className={styles.item} key={index}>
                <p className={styles.count}>0{index + 1}</p>
                <p className={styles.title}>{item}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className={cx(styles.actions, isStandalone && styles.standalone)}>
        {isSubscribe(detail.direction) || free ? (
          <Link
            to={`/${detail.direction}/${detail.data.slug}`}
            className={styles.button}
          >
            <p className={styles.text}>
              Открыть тему <span>{detail.data.title}</span>
            </p>
            <IoArrowForwardSharp className={styles.icon} />
          </Link>
        ) : (
          <button
            className={styles.button}
            onClick={() => setDetail((prev) => ({ ...prev, payment: true }))}
          >
            <p className={styles.text}>
              Оформить подписку на <span>{detail.title}</span>
            </p>
            <IoArrowForwardSharp className={styles.icon} />
          </button>
        )}
      </div>
    </>
  );
}

export default Detail;
