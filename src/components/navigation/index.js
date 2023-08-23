import React, { useState, useEffect } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Logo from '../../images/svg/logo'
import cx from 'classname'
import { motion } from 'framer-motion'
import { useLocation } from 'react-use';
import { useStateContext } from '../../context/ContextProvider';
import * as styles from './navigation.module.scss'

import Login from './login';
import Account from './account';
import Worksnav from './worksnav';
import Settings from './settings';

function Header() {
  const [isPush, setIsPush] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isDesign, setIsDesign] = useState(false);
  const location = useLocation();

  const { isLoggedIn } = useStateContext();

  const dataDesignLinks = useStaticQuery(graphql`
    query {
      directionsJson(slug: {eq: "design"}) {
        works {
          slug
        }
      }
    }
  `)

  const handleAnimationComplete = () => {
    const path = location.pathname;
    const Auth = path.includes('auth');

    // Для ссылок по темам дизайна
    const designLinks = dataDesignLinks.directionsJson.works;
    const isDesignTheme = designLinks.some((item) => path.includes(item.slug)) && path.includes('design');


    if (isPush) {
      setIsPush(false);
      setIsAuth(Auth);
      setIsDesign(isDesignTheme);
    } return null;
  };

  useEffect(() => {
    setIsPush(true);
  }, [location])

  return (
    <motion.div
      initial={{ y: "0rem" }}
      animate={{ y: isPush ? "5rem" : "0rem" }}
      transition={{ duration: isPush ? 0.4 : 0.6, ease: [0.15, 0.45, 0.4, 0.93] }}
      onAnimationComplete={handleAnimationComplete}
      className={styles.container}>
      {isDesign && <Settings key="settings" />}
      <nav className={cx(styles.navigation, isDesign && styles.settings)}>
        <Link
          to='/'
          style={{ transform: isAuth ? "translateX(50%)" : "translateX(0%)" }}
          className={styles.logo}
        >
          <Logo className={styles.svg} />
        </Link>


        {isLoggedIn() ?
          <Account themes={dataDesignLinks.directionsJson.works} />
          :
          <Login isAuth={isAuth} />
        }

        {/* <Worksnav pathname={location.pathname} /> */}
      </nav>
    </motion.div>
  )
}

export default Header