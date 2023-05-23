import { Link } from 'gatsby'
import React from 'react'
import Logo from '../images/svg/logo'
import axiosClient from '../services/axiosClient';
import { navigate } from 'gatsby';
import { FaUserAlt } from "react-icons/fa";
import { CiLogin, CiUser } from "react-icons/ci";
import { isLoggedIn } from '../services/auth'
import { useStateContext } from '../context/ContextProvider'
import * as styles from './header.module.scss'
import * as button from '../styles/base/button.module.scss'

function Header() {
  const { user, setUser } = useStateContext();

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/auth/logout").then(() => {
      setUser(null, null);
      navigate("/");
    });
  };


  return (
    <nav className={styles.container}>
      <Link to='/' className={styles.logo}>
        <Logo className={styles.svg} />
      </Link>

      <div className={styles.account}>
        {isLoggedIn() ?
          <div className={button.account}>
            <Link to='/profile' className={button.user}>
              <CiUser className={button.icon} />
              <p className={button.text}>{JSON.parse(user).name}</p>
            </Link>
            <div className={button.otherlink}>
              <Link to='/portfolio' className={button.link}>Мое портфолио</Link>
              <button className={button.link} onClick={onLogout}>Выйти</button>
            </div>
          </div>
          :
          <Link to='/auth' className={button.login}>
            <CiLogin className={button.icon} />
            <p className={button.text}>
              Войти
            </p>
          </Link>
        }
      </div>

    </nav>
  )
}

export default Header