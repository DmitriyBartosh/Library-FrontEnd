import React from "react";
import cx from "classname";
import Button from "./button";

import * as styles from "./allusers.module.scss";

function AllUsers({ openModal, allUsersQuery }) {
  if (allUsersQuery.isLoading) {
    return (
      <section>
        <h3>Загрузка данных...</h3>
      </section>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.block}>
          <p>ID</p>
        </div>
        <div className={styles.block}>
          <p>Имя</p>
        </div>
        <div className={styles.block}>
          <p>Email</p>
        </div>
        <div className={styles.block}>
          <p>Статус</p>
        </div>
        <div className={styles.block}>
          <p>Изменить статус</p>
        </div>
      </div>
      <div className={styles.users}>
        {allUsersQuery.data.data.map((item, index) => {
          const { id, name, email, expert } = item;
          const isExpert = expert !== null ? true : false;

          return (
            <div className={styles.item} key={index}>
              <div className={cx(styles.block, styles.id)}>
                <p className={styles.text}>{id}</p>
              </div>
              <div className={styles.block}>
                <p className={styles.text}>{name}</p>
              </div>
              <div className={styles.block}>
                <p className={styles.text}>{email}</p>
              </div>
              <div className={styles.block}>
                <p className={styles.text}>
                  {isExpert ? "Эксперт" : "Пользователь"}{" "}
                </p>
              </div>
              <div className={styles.block}>
                <Button
                  isExpert={expert}
                  openModal={() => openModal(id, name, isExpert)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllUsers;
