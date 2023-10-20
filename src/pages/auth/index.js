import React from "react";
import { SlSocialVkontakte } from "react-icons/sl";
import { useQuery } from "@tanstack/react-query";
import { FaYandex, FaGoogle } from "react-icons/fa";
import { vkAuth, yandexAuth, googleAuth } from "../../functions/auth";
import Bird from "../../images/svg/bird";
import Birdonbranch from "../../images/svg/birdonbranch";
import Flower from "../../images/svg/flower/flowertwo";
import Topnavigate from "../../components/navigation/topnavigate";

import * as styles from "../../styles/pages/auth.module.scss";
import * as button from "../../styles/base/button.module.scss";

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
          <h3>Авторизация на Графикси</h3>
          <p>Давайте познакомимся и начнем создавть Ваше портфолио!</p>
          <div className={styles.authlink}>
            <a className={button.social} href={vkAuthURL.data}>
              <SlSocialVkontakte className={button.vk} />
              <p className={button.text}>
                Войти с <span>VK</span>
              </p>
            </a>
            <a className={button.social} href={yandexAuthURL.data}>
              <FaYandex className={button.yandex} />
              <p className={button.text}>
                Войти с <span>Yandex</span>
              </p>
            </a>
            <a className={button.social} href={googleAuthURL.data}>
              <FaGoogle className={button.google} />
              <p className={button.text}>
                Войти с <span>Google</span>
              </p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Index;
