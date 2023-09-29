import React, { useState } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import cx from "classname";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useStateContext } from "../../context/ContextProvider";
import Modal from "../modal";
import Payment from "../payment";

import * as styles from "./subscribes.module.scss";
import * as global from "../../styles/base/global.module.scss";

function Subscribes() {
  const { subscribes } = useStateContext();

  const [detail, setDetail] = useState({
    visible: false,
    title: "",
    direction: "",
    price: 1000,
    themes: [],
  });

  const directionQuery = useStaticQuery(graphql`
    query {
      allDirectionsJson {
        edges {
          node {
            slug
            title
            about
            active
            price
            works {
              title
              slug
            }
          }
        }
      }
    }
  `);

  const direction = directionQuery.allDirectionsJson.edges;
  const sortedDirection = direction.sort(
    (a, b) => b.node.works.length - a.node.works.length
  );

  const convertDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    const month = monthNames[date.getMonth()];
    const formatted = `${date.getDate()} ${month}`;

    return formatted;
  };

  function closeDetail() {
    setDetail({
      visible: false,
      title: "",
      direction: "",
      price: 1000,
      themes: [],
    });
  }

  function openDetail(price, themes, title, direction) {
    setDetail({
      ...detail,
      visible: true,
      title: title,
      direction: direction,
      price: price,
      themes: themes,
    });
  }

  // Не оплаченные подписки
  const subscribePending =
    Array.isArray(subscribes) &&
    subscribes?.filter((item) => item.transaction_status === "pending");

  // Оплаченные подписки
  const subscribeSucceeded =
    Array.isArray(subscribes) &&
    subscribes?.filter(
      (item) => item.transaction_status === "succeeded" && item.active
    );

  // Если не осталось возможных направлений для покупки
  const isVisibleSubscribe =
    direction.filter((item) => item.node.active).length !==
    subscribeSucceeded.length;

  return (
    <>
      <section className={global.container}>
        <div className={styles.container}>
          {subscribeSucceeded.length > 0 && (
            <div className={styles.list}>
              <p className={styles.title}>Активные подписки</p>
              {subscribeSucceeded
                .filter((item) => item.transaction_status === "succeeded")
                .map((item, index) => {
                  const directionPending = direction.find(
                    (dir) => dir.node.slug === item.plan
                  ).node;

                  return (
                    <div
                      className={styles.item}
                      key={`succeeded_${directionPending.slug}_${index}`}
                    >
                      <div className={styles.block}>
                        <p className={styles.hint}>Направление</p>
                        <p className={styles.text}>{directionPending.title}</p>
                      </div>

                      <div className={styles.block}>
                        <p className={styles.hint}>Дата окончания</p>
                        <p className={styles.text}>
                          До {convertDate(item.end_subscribe)}
                        </p>
                      </div>

                      <div className={styles.active}>
                        <p className={styles.text}>Подписка активна</p>
                        <IoCheckmarkDoneSharp className={styles.icon} />
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {subscribePending.length > 0 && (
            <div className={styles.list}>
              <p className={styles.title}>Подписка не оплачена</p>
              {subscribePending.map((item) => {
                const directionPending = direction.find(
                  (dir) => dir.node.slug === item.plan
                ).node;

                return (
                  <div
                    className={styles.item}
                    key={`pending_${directionPending.slug}`}
                  >
                    <div className={styles.block}>
                      <p className={styles.hint}>Направление</p>
                      <p className={styles.text}>{directionPending.title}</p>
                    </div>

                    <div className={styles.block}>
                      <p className={styles.hint}>Дата окончания</p>
                      <p className={styles.text}>
                        До {convertDate(item.end_subscribe)}
                      </p>
                    </div>

                    <a
                      href={item?.redirect_url}
                      target="_blank"
                      className={cx(global.buttontext, styles.button)}
                    >
                      <p className={global.text}>Завершить оплату</p>
                    </a>
                  </div>
                );
              })}
            </div>
          )}

          {isVisibleSubscribe && (
            <div className={styles.offers}>
              <p className={styles.title}>Направления</p>
              <div className={styles.list}>
                {sortedDirection
                  .filter((item) => item.node.active)
                  .map((item) => {
                    const { slug, title, about, price, works } = item.node;
                    const allThemes = works.map((obj) => obj.title);

                    const isVisible =
                      Array.isArray(subscribes) &&
                      !subscribes.some(
                        (sub) => sub.active && sub.plan === slug
                      );

                    return (
                      isVisible && (
                        <div className={styles.item} key={`direction_${slug}`}>
                          <div className={styles.content}>
                            <p className={styles.title}>{title}</p>
                            <div className={styles.theme}>
                              {works.map((item) => {
                                return (
                                  <p key={`theme_${item.slug}`}>
                                    #{item.title.replace(/\s+/g, "_")}
                                  </p>
                                );
                              })}
                            </div>
                            <p>{about}</p>
                          </div>
                          <div className={styles.action}>
                            <button
                              className={cx(global.buttontext, styles.main)}
                              onClick={() =>
                                openDetail(price, allThemes, title, slug)
                              }
                            >
                              <p className={global.text}>Оформить подписку</p>
                            </button>
                            <Link
                              to={`/directions/${slug}`}
                              className={cx(global.buttontext, styles.second)}
                            >
                              <p className={global.text}>Все темы</p>
                            </Link>
                          </div>
                        </div>
                      )
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </section>
      <Modal visible={detail.visible} close={() => closeDetail()}>
        <Payment
          name={detail.title}
          direction={detail.direction}
          cost={detail.price}
          themes={detail.themes}
        />
      </Modal>
    </>
  );
}

export default Subscribes;
