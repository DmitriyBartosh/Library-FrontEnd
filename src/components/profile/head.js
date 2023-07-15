import React from 'react'
import { navigate, Link } from 'gatsby';
import axiosClient from '../../services/axiosClient';
import { CiLogout } from "react-icons/ci";
import { useStateContext } from '../../context/ContextProvider';
import * as styles from './head.module.scss'
import * as global from '../../styles/base/global.module.scss'

function Head({ user }) {
  const { setUser } = useStateContext();

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
          <div className={styles.avatar}>
            <p>ДБ</p>
          </div>
          <div className={styles.info}>
            <h3>{user?.name}</h3>
            <p>{user?.email}</p>
            <button className={styles.logout} onClick={onLogout}>
              <CiLogout className={styles.icon} />
              <p>Выйти</p>
            </button>
          </div>
        </div>
        <div className={styles.directions}>
          <Link to='/directions/' className={styles.link}>
            <p>
              Все направления
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Head