import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import Logo from '../../images/svg/logo'
import { motion } from 'framer-motion'
import { useLocation } from 'react-use';
import { isLoggedIn } from '../../services/auth'
import * as styles from './navigation.module.scss'
import Login from './login';
import Account from './account';
import Worksnav from './worksnav';

function Header() {
  const [isPush, setIsPush] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();


  const handleAnimationComplete = () => {
    const path = location.pathname;

    const Auth = path === "/auth/" || path === "/auth/vk/" || path === "/auth/google/" || path === "/auth/yandex/";

    if (isPush) {
      setIsPush(false);
      setIsAuth(Auth);
    } return null;
  };

  useEffect(() => {
    setIsPush(true);
  }, [location])

  return (
    <div className={styles.container}>
      <motion.nav
        initial={{ y: "0rem" }}
        animate={{ y: isPush ? "5rem" : "0rem" }}
        transition={{ duration: isPush ? 0.4 : 0.6, ease: [0.15, 0.45, 0.4, 0.93] }}
        onAnimationComplete={handleAnimationComplete}
        className={styles.navigation}
      >
        <Link
          to='/'
          style={{ transform: isAuth ? "translateX(50%)" : "translateX(0%)" }}
          className={styles.logo}
        >
          <Logo className={styles.svg} />
        </Link>


        {isLoggedIn() ?
          <Account />
          :
          <Login isAuth={isAuth} />
        }

        <Worksnav pathname={location.pathname} />

      </motion.nav>
    </div>
  )
}

export default Header