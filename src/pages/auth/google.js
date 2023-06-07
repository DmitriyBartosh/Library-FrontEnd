import React, { useEffect } from "react";
import { useStateContext } from "../../context/ContextProvider";

import { useLocation } from "react-use";
import { navigate } from "gatsby";

import Bird from '../../images/svg/bird';
import Birdonbranch from '../../images/svg/birdonbranch'
import Flower from '../../images/svg/flower/flowertwo'

import * as styles from '../../styles/pages/auth.module.scss'

function Google() {
  const { setUser } = useStateContext();

  const location = useLocation();

  useEffect(() => {
    fetch(`http://localhost:8000/api/auth/google/callback${location.search}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const user = JSON.stringify(data.user);
        setUser(data.access_token, user);

        if (data.isAdmin) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      });
  }, []);

  return <section className={styles.container}>
    <Bird className={styles.bird} />
    <Birdonbranch className={styles.birdonbranch} />
    <Flower className={styles.flower} />
  </section>
}

export default Google;
