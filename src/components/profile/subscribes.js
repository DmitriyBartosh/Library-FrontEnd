import React, { useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { useStaticQuery, graphql, navigate } from "gatsby";
import { convertDate, dayTitle } from "../../functions/other";
import Modal from "../modal";
import Payment from "../payment";
import Direction from "./direction";

import * as styles from "./subscribes.module.scss";

function Subscribes() {
  const { subscribes } = useStateContext();

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

  const [detail, setDetail] = useState({
    visible: false,
    title: "",
    direction: "",
    price: 1000,
    themes: [],
  });

  function closeDetail() {
    setDetail({
      visible: false,
      title: "",
      direction: "",
      price: 1000,
      themes: [],
    });
  }

  const sortedDirection = directionQuery.allDirectionsJson.edges.sort(
    (a, b) => b.node.works.length - a.node.works.length
  );

  // Не оплаченные подписки
  const subscribePending =
    Array.isArray(subscribes) &&
    subscribes?.filter((item) => item.transaction_status === "pending");

  // Активные подписки
  const subscribeSucceeded =
    Array.isArray(subscribes) && subscribes?.filter((item) => item.active);

  // Если не осталось возможных направлений для покупки
  const isVisibleSubscribe =
    directionQuery.allDirectionsJson.edges.filter((item) => item.node.active)
      .length !== subscribeSucceeded.length;

  return (
    <section>
      <div className={styles.container}>
        {subscribePending.length > 0 && (
          <div className={styles.block}>
            <p className={styles.title}>Завершить оплату</p>
            <div className={styles.list}>
              {subscribePending.map((item, index) => {
                const direction = directionQuery.allDirectionsJson.edges.find(
                  (dir) => dir.node.slug === item.plan
                ).node;
                const url = item.redirect_url;

                const data = {
                  status: "pending",
                  title: direction.title,
                  end_subscribe: convertDate(item.end_subscribe),
                  slug: `/directions/${item.plan}`,
                };

                return (
                  <Direction
                    data={data}
                    action={() => navigate(url)}
                    key={`pending_${index}`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {subscribeSucceeded.length > 0 && (
          <div className={styles.block}>
            <p className={styles.title}>Активные подписки</p>
            <div className={styles.list}>
              {subscribeSucceeded
                .filter((item) => item.active)
                .map((item, index) => {
                  const direction = directionQuery.allDirectionsJson.edges.find(
                    (dir) => dir.node.slug === item.plan
                  ).node;

                  // Создание массива из значений ключа "title"

                  const themes = direction.works.map((obj) => obj.title);

                  const data = {
                    status: "active",
                    title: direction.title,
                    end_subscribe: convertDate(item.end_subscribe),
                    days: `${item.days_left} ${dayTitle(item.days_left)}`,
                    slug: "/portfolio",
                  };

                  const detail = {
                    visible: true,
                    title: direction.title,
                    direction: direction.slug,
                    price: direction.price,
                    themes: themes,
                  };

                  return (
                    <Direction
                      data={data}
                      action={() => setDetail(detail)}
                      key={`active_${index}`}
                    />
                  );
                })}
            </div>
          </div>
        )}

        {isVisibleSubscribe && (
          <div className={styles.block}>
            <p className={styles.title}>Направления без подписки</p>
            <div className={styles.list}>
              {sortedDirection
                .filter((item) => item.node.active)
                .map((item, index) => {
                  const { slug, title, about, price, works } = item.node;
                  const themes = works.map((obj) => obj.title);

                  const data = {
                    status: "other",
                    title: title,
                    about: about,
                    price: price,
                    slug: `/directions/${slug}`,
                  };

                  const detail = {
                    visible: true,
                    title: title,
                    direction: slug,
                    price: price,
                    themes: themes,
                  };

                  const isVisible =
                    Array.isArray(subscribes) &&
                    !subscribes.some((sub) => sub.active && sub.plan === slug);

                  return (
                    isVisible && (
                      <Direction
                        data={data}
                        action={() => setDetail(detail)}
                        key={`other_${index}`}
                      />
                    )
                  );
                })}
            </div>
          </div>
        )}
      </div>

      <Modal visible={detail.visible} close={() => closeDetail()}>
        <Payment
          name={detail.title}
          direction={detail.direction}
          cost={detail.price}
          themes={detail.themes}
        />
      </Modal>
    </section>
  );
}

export default Subscribes;
