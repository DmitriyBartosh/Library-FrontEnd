import React from "react";
import { Link } from "gatsby";
import { FaTelegramPlane } from "react-icons/fa";

import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../services/axiosClient";

import * as styles from "./head.module.scss";
import * as global from "../../styles/base/global.module.scss";
import Info from "./info";

function Head() {
  const { user, setUser } = useStateContext();

  return (
    <div className={global.container}>
      <div className={styles.container}>
        <Info />
      </div>
    </div>
  );
}

export default Head;
