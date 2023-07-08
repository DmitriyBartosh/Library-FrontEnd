import React from 'react'
import { CiLogin } from "react-icons/ci";
import { Link } from 'gatsby'
import * as button from '../../styles/base/button.module.scss'

function Login({ isAuth }) {

  return (
    <Link to='/auth' className={button.nav} style={{ transform: isAuth ? "translateX(-50%)" : "translateX(0%)" }}>
      <CiLogin className={button.icon} />
      <p className={button.text}>
        Войти
      </p>
    </Link>
  )
}

export default Login