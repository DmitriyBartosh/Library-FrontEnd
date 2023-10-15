import React, { useEffect } from "react";
import { useLocation } from "react-use";
import Bird from "../../images/svg/bird";
import Birdonbranch from "../../images/svg/birdonbranch";
import Flower from "../../images/svg/flower/flowertwo";

import * as styles from "../../styles/pages/auth.module.scss";

function Telegram() {
  const location = useLocation();

  useEffect(() => {
    fetch(
      `${process.env.GATSBY_API_BASE_URL}/api/auth/telegram/callback${location.search}`,
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
      .then(() => {
        // navigate("/profile");
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

export default Telegram;
