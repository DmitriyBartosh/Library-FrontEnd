import React from "react";
import { Link } from "gatsby";
import { IoPersonOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import cx from "classname";
import Logo from "../../images/svg/logo";
import { useStateContext } from "../../context/ContextProvider";

import * as global from "../../styles/base/global.module.scss";
import * as styles from "./desktopnav.module.scss";

function Topnavigate() {
  const { isLoggedIn, works, subscribes } = useStateContext();

  const isActiveSubscribe =
    Array.isArray(subscribes) && subscribes.some((item) => item.active);

  return (
    <nav className={cx(styles.top, global.container)}>
      <Link to="/" className={styles.logo}>
        <Logo className={styles.svg} />
      </Link>
      <div className={styles.links}>
        <Link
          to="/directions"
          partiallyActive={true}
          activeClassName={styles.active}
          className={cx(global.buttontext, styles.link)}
        >
          <p className={global.text}>Направления</p>
        </Link>
        <Link
          to="/articles"
          partiallyActive={true}
          activeClassName={styles.active}
          className={cx(global.buttontext, styles.link)}
        >
          <p className={global.text}>Полезные статьи</p>
        </Link>

        {isLoggedIn() ? (
          <>
            {(works?.length > 0 || isActiveSubscribe) && (
              <Link
                to="/portfolio"
                activeClassName={styles.active}
                className={cx(global.buttontext, styles.link)}
              >
                <p className={global.text}>Мое портфолио</p>
              </Link>
            )}
            <Link
              to="/profile"
              activeClassName={styles.active}
              className={cx(global.buttonicon, styles.profile)}
            >
              <IoPersonOutline className={global.icon} />
            </Link>
          </>
        ) : (
          <Link
            to="/auth"
            activeClassName={styles.active}
            className={cx(global.buttoncenter, styles.link)}
          >
            <p className={global.text}>Войти</p>
            <CiLogin className={global.icon} />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Topnavigate;
