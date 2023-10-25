import React from "react";
import { SlSocialVkontakte } from "react-icons/sl";
import { useQuery } from "@tanstack/react-query";
import cx from "classname";
import { FaYandex, FaGoogle } from "react-icons/fa";
import { vkAuth, yandexAuth, googleAuth } from "../../functions/auth";
import Bird from "../../images/svg/bird";
import Birdonbranch from "../../images/svg/birdonbranch";
import Flower from "../../images/svg/flower/flowertwo";
import Topnavigate from "../../components/navigation/topnavigate";

import * as global from "../../styles/base/global.module.scss";
import * as styles from "../../styles/pages/auth.module.scss";

function Index() {
  const vkAuthURL = useQuery({
    queryKey: ["vk_auth"],
    queryFn: vkAuth,
  });

  const yandexAuthURL = useQuery({
    queryKey: ["yandex_auth"],
    queryFn: yandexAuth,
  });
  console.log(yandexAuthURL);
  const googleAuthURL = useQuery({
    queryKey: ["google_auth"],
    queryFn: googleAuth,
  });

  return (
    <>
      <Topnavigate />
      <section className={styles.container}>
        <Bird className={styles.bird} />
        <Birdonbranch className={styles.birdonbranch} />
        <Flower className={styles.flower} />
        <div className={styles.form}>
          <h3>Авторизация Графикси</h3>
          <p className={styles.description}>
            Давайте познакомимся и начнем создавть Ваше портфолио!
          </p>
          <div className={styles.authlink}>
            <a
              className={cx(global.buttonwide, styles.buttongreen)}
              href={vkAuthURL.data}
            >
              <p className={global.text}>
                Войти с <span>VK</span>
              </p>
              <SlSocialVkontakte className={global.icon} />
            </a>
            <a
              className={cx(global.buttonwide, styles.buttongreen)}
              href={yandexAuthURL.data}
            >
              <p className={global.text}>
                Войти с <span>Yandex</span>
              </p>
              <FaYandex className={global.icon} />
            </a>
            <a
              className={cx(global.buttonwide, styles.buttongreen)}
              href={googleAuthURL.data}
            >
              <p className={global.text}>
                Войти с <span>Google</span>
              </p>
              <FaGoogle className={global.icon} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Index;
