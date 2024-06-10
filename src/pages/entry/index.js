import React from "react";
import { navigate } from "gatsby";
import { useEffectOnce } from "react-use";
import { useStateContext } from "../../context/ContextProvider";
import cx from "classname";
import { Link } from "gatsby";
import { useIsDesktop, useIsTablet } from "../../hooks/mediaQuery";

import Topnavigate from "../../components/navigation/topnavigate";
import Topmobilenavigate from "../../components/navigation/topmobilenavigate";
import Footer from "../../components/footer";
import MetaTag from "../../components/metaTag";

import * as global from "../../styles/base/global.module.scss";
import * as styles from "../../styles/pages/entryreview.module.scss";

function Index() {
  const { isLoggedIn } = useStateContext();

  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();

  useEffectOnce(() => {
    if (!isLoggedIn()) {
      navigate("/auth");
    }
  });

  return (
    <>
      {isDesktop && <Topnavigate />}
      {isTablet && <Topmobilenavigate />}
      <section className={cx(global.container, global.top)}>
        <div className={styles.entry}>
          <h5 className={styles.title}>Есть свое портфолио?</h5>
          <p>
            Давай определимся как мы сможем максимально тебе помочь поднять
            уровень в графическом дизайне.
          </p>
          <p>
            Если у тебя уже <span>есть портфолио</span>, мы предложим пройти
            небольшой опрос и на основе портфолио и опроса определим сильным
            стороны и точки роста.
          </p>
          <p>
            Если только <span>начинаешь свой путь</span> в графическом дизайне,
            мы направим тебя по шагам, выполнив которые у тебя будут первые
            работы в портфолио из реальной практики графических дизайнеров.
          </p>
          <div className={styles.choise}>
            <Link className={styles.button} to="/entry/review">
              <p className={styles.label}>Есть портфолио</p>
            </Link>

            <Link className={styles.button} to="/entry/starter">
              <p className={styles.label}>Начинающий</p>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export const Head = () => {
  const title = "Тестирование 360";
  const description = "Тестирование 360 от экспретов площадки Графикси";

  const data = {
    title: `Графикси | ${title}`,
    description: description,
    slug: `/entryreview`,
    preview: "/preview.png",
  };

  return <MetaTag data={data} />;
};

export default Index;
