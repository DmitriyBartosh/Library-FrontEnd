import React, { useEffect } from "react";
import { checkBooleanObjectKeys } from "../../functions/other";
import { useStateContext } from "../../context/ContextProvider";

import { useLocation } from "react-use";
import { navigate } from "gatsby";

import Bird from "../../images/svg/bird";
import Birdonbranch from "../../images/svg/birdonbranch";
import Flower from "../../images/svg/flower/flowertwo";

import * as styles from "../../styles/pages/auth.module.scss";

function Yandex() {
  const { setUser } = useStateContext();

  const location = useLocation();

  useEffect(() => {
    fetch(
      `${process.env.GATSBY_API_BASE_URL}/api/auth/yandex/callback${location.search}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUser(data.access_token, data.user);
        navigate("/profile");
      });
  }, []);

  return (
    <section className={styles.container}>
      <Bird className={styles.bird} />
      <Birdonbranch className={styles.birdonbranch} />
      <Flower className={styles.flower} />
    </section>
  );
}

export default Yandex;
