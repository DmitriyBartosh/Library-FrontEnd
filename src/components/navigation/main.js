import React from "react";
import { Link } from "gatsby";
import { CiLogin } from "react-icons/ci";
import cx from "classname";
import Logo from "../../images/svg/logo";
import { useStateContext } from "../../context/ContextProvider";

import * as styles from "./main.module.scss";
import * as global from "../../styles/base/global.module.scss";

function Main() {
  const { isLoggedIn } = useStateContext();

  return (
    <nav className={cx(styles.container, global.container)}>
      <Link to="/" className={styles.logo}>
        <Logo className={styles.svg} />
      </Link>
      <div className={styles.right}>
        <div className={styles.links}>
          <Link to="/directions" className={global.buttoncenter}>
            <p className={global.text}>Направления</p>
          </Link>
        </div>
        {isLoggedIn() ? (
          <Link
            to="/portfolio"
            className={cx(global.buttoncenter, styles.start)}
          >
            <p className={global.text}>Мое портфолио</p>
          </Link>
        ) : (
          <Link to="/auth" className={cx(global.buttoncenter, styles.start)}>
            <CiLogin className={global.icon} />
            <p className={global.text}>Авторизация</p>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Main;
