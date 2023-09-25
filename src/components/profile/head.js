import React from "react";
import { navigate } from "gatsby";
import { CiLogout } from "react-icons/ci";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../services/axiosClient";
import * as styles from "./head.module.scss";
import * as global from "../../styles/base/global.module.scss";

function Head() {
  const { user, subscribes, setUser } = useStateContext();

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
      </div>
    </div>
  );
}

export default Head;
