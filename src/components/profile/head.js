import React from "react";
import { useStaticQuery, graphql, navigate } from "gatsby";
import { CiLogout } from "react-icons/ci";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../services/axiosClient";
import * as styles from "./head.module.scss";
import * as global from "../../styles/base/global.module.scss";

function Head() {
  const { user, subscribes, setUser } = useStateContext();

  const isActive = subscribes?.some(
    (item) => item.active && item.transaction_status === "succeeded"
  );

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

  const direction = directionQuery.allDirectionsJson.edges;

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

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/auth/logout").then(() => {
      setUser(null, null, null);
      navigate("/");
    });
  };

  return (
    <div className={global.container}>
      <div className={styles.container}>
        <div className={styles.user}>
          <div className={styles.info}>
            <p className={styles.name}>{user?.name}</p>
            <p>{user?.email}</p>
            <button className={styles.logout} onClick={onLogout}>
              <CiLogout className={styles.icon} />
              <p className={styles.text}>Выйти</p>
            </button>
          </div>
          <div className={styles.telegram}>
            <button>Привязать телеграм</button>
          </div>
        </div>
        <div className={styles.subscribe}>
          {isActive ? (
            subscribes
              .filter((item) => item.active)
              .map((item, index) => {
                const { transaction_status, plan, days_left, end_subscribe } =
                  item;
                const name = direction.find((item) => item.node.slug === plan)
                  .node.title;

                if (transaction_status === "succeeded") {
                  return (
                    <div className={styles.active} key={index}>
                      <p>
                        До <span>{convertDate(end_subscribe)}</span>
                      </p>
                      <p className={styles.name}>{name}</p>
                      <div className={styles.status}>
                        <p>Активна</p>
                      </div>
                    </div>
                  );
                }

                if (transaction_status === "pending") {
                  return (
                    <div className={styles.active} key={index}>
                      <p>
                        До <span>{convertDate(end_subscribe)}</span>
                      </p>
                      <p className={styles.name}>{name}</p>
                      <div className={styles.status}>
                        <button>Завершить оплату</button>
                      </div>
                    </div>
                  );
                }
              })
          ) : (
            <p>Подписок нет</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Head;
