import React from "react";
import { Link, navigate } from "gatsby";
import { CiLogout } from "react-icons/ci";
import { FaTelegramPlane } from "react-icons/fa";

import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../services/axiosClient";
import Promocode from "./promocode";

import * as styles from "./head.module.scss";
import * as global from "../../styles/base/global.module.scss";

function Head() {
  const { user, setUser } = useStateContext();

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
            <Link className={styles.telegram} to="/telegram">
              <FaTelegramPlane className={styles.icon} />
              {user.telegram === null ? (
                <p className={styles.text}>Привязать Telegram</p>
              ) : (
                <p className={styles.text}>
                  Telegram - <span>@{user.telegram.username}</span>
                </p>
              )}
            </Link>
            <button className={styles.logout} onClick={onLogout}>
              <CiLogout className={styles.icon} />
              <p className={styles.text}>Выйти</p>
            </button>
          </div>
        </div>
        <Promocode />
      </div>
    </div>
  );
}

export default Head;
