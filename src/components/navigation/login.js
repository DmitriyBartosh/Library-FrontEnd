import React from 'react'
import { CiLogin } from "react-icons/ci";
import { Link } from 'gatsby'
import * as styles from './login.module.scss'

function Login({ isAuth }) {

  return (
    <Link to='/auth' className={styles.button} style={{ transform: isAuth ? "translateX(-50%)" : "translateX(0%)" }}>
      <CiLogin className={styles.icon} />
      <p className={styles.text}>
        Войти
      </p>
    </Link>
  )
}

export default Login