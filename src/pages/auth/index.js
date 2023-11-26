import React from "react";
import { SlSocialVkontakte } from "react-icons/sl";
import { useQuery } from "@tanstack/react-query";
import cx from "classname";
import { useWindowSize } from "react-use";
import { FaYandex, FaGoogle } from "react-icons/fa";
import { vkAuth, yandexAuth, googleAuth } from "../../functions/auth";
import { useIsDesktop, useIsTablet } from "../../hooks/mediaQuery";

import Bird from "../../images/svg/bird";
import Birdonbranch from "../../images/svg/birdonbranch";
import Flower from "../../images/svg/flower/flowertwo";

import MetaTag from "../../components/metaTag";

import Topnavigate from "../../components/navigation/topnavigate";
import Topmobilenavigate from "../../components/navigation/topmobilenavigate";

import * as global from "../../styles/base/global.module.scss";
import * as styles from "../../styles/pages/auth.module.scss";

function Index() {
  const { height } = useWindowSize();
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();

  const vkAuthURL = useQuery({
    queryKey: ["vk_auth"],
    queryFn: vkAuth,
  });

  const yandexAuthURL = useQuery({
    queryKey: ["yandex_auth"],
    queryFn: yandexAuth,
  });

  const googleAuthURL = useQuery({
    queryKey: ["google_auth"],
    queryFn: googleAuth,
  });

  return (
    <>
      {isDesktop && <Topnavigate />}
      {isTablet && <Topmobilenavigate />}
      <section className={styles.container} style={{ minHeight: height }}>
        <Bird className={styles.bird} />
        <Birdonbranch className={styles.birdonbranch} />
        <Flower className={styles.flower} />
        <div className={styles.form}>
          <h3>Авторизация Графикси</h3>
          <p className={styles.description}>
            Давайте познакомимся и начнем практиковаться в творчестве!
          </p>
          <div className={styles.authlink}>
            <a
              className={cx(global.buttonwide, global.buttongreen)}
              href={vkAuthURL.data}
            >
              <p className={global.text}>
                Войти с <span>VK</span>
              </p>
              <SlSocialVkontakte className={global.icon} />
            </a>
            <a
              className={cx(global.buttonwide, global.buttongreen)}
              href={yandexAuthURL.data}
            >
              <p className={global.text}>
                Войти с <span>Yandex</span>
              </p>
              <FaYandex className={global.icon} />
            </a>
            <a
              className={cx(global.buttonwide, global.buttongreen)}
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

export const Head = () => {
  const title = "Авторизация";
  const description =
    "Авторизация на онлайн практикуме даст тебе доступ к профилю с прогрессом по темам и связь с экспертами площадки";

  const data = {
    title: `Графикси | ${title}`,
    description: description,
    slug: `/auth`,
    preview: "/preview.png",
  };

  return <MetaTag data={data} />;
};

export default Index;
