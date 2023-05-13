import { Link } from 'gatsby'
import React from 'react'
import Logo from '../images/svg/logo'
import * as styles from './header.module.scss'
import * as button from '../styles/base/button.module.scss'

function Header() {
  return (
    <nav className={styles.container}>
      <Link to='/' className={styles.logo}>
        <Logo className={styles.svg} />
      </Link>
      <div className={styles.account}>
        <button className={button.second}>
          <p className={button.text}>
            Войти
          </p>
        </button>
      </div>
    </nav>
  )
}

export default Header