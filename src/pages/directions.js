import React, { useState } from "react";
import { Link } from "gatsby";
import { useIsDesktop, useIsTablet } from "../hooks/mediaQuery";
import { useStaticQuery, graphql } from "gatsby";
import cx from "classname";

import Topnavigate from "../components/navigation/topnavigate";
import Topmobilenavigate from "../components/navigation/topmobilenavigate";
import Footer from "../components/footer";
import Detail from "../components/direction/detail";
import Theme from "../components/direction/theme";
import MetaTag from "../components/metaTag";

import * as styles from "../styles/pages/directions.module.scss";
import * as global from "../styles/base/global.module.scss";

function Directions() {
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();

  const [payment, setPayment] = useState(false);
  const [detail, setDetail] = useState({
    visible: false,
    data: {},
    title: "",
    direction: "",
    price: 1000,
    themes: [],
  });

  const directionQuery = useStaticQuery(graphql`
    query {
      allDirectionsJson {
        edges {
          node {
            slug
            title
            active
            about
            price
            works {
              free
              title
              slug
              time
              tags
              steps
              description
              icon
            }
          }
        }
      }
    }
  `);

  const direction = directionQuery.allDirectionsJson.edges;

  // сортируем, чтобы сначала шли ссылки на активные темы
  const sortedDirection = direction
    .filter((item) => item.node.active)
    .sort((a, b) => {
      if (a.node.active && !b.node.active) {
        return -1;
      } else if (!a.node.active && b.node.active) {
        return 1;
      } else {
        return 0;
      }
    });

  function closeDetail() {
    setPayment(false);
    setDetail({
      visible: false,
      data: {},
      title: "",
      direction: "",
      price: 1000,
      themes: [],
    });
  }

  function openDetail(data, price, themes, title, direction) {
    setPayment(false);
    setDetail({
      ...detail,
      visible: true,
      data: data,
      title: title,
      direction: direction,
      price: price,
      themes: themes,
    });
  }

  return (
    <>
      {isDesktop && <Topnavigate />}
      {isTablet && <Topmobilenavigate />}
      <section className={cx(global.container, global.top)}>
        <div className={styles.direction}>
          <div className={styles.title}>
            <h1>Направления Графикси</h1>
          </div>

          <div className={styles.list}>
            <Link
              to="/directions"
              className={cx(global.buttontext, styles.link)}
              activeClassName={styles.active}
            >
              <p className={global.text}>Все направления</p>
            </Link>
            {sortedDirection.map((item, index) => {
              const { title, slug } = item.node;

              return (
                <Link
                  to={`/directions/${slug}`}
                  className={cx(global.buttontext, styles.link)}
                  activeClassName={styles.active}
                  key={`direction_${index}`}
                >
                  <p className={global.text}>{title}</p>
                </Link>
              );
            })}
          </div>
        </div>
        <div className={styles.themes}>
          <p className={styles.title}>Все темы</p>
          <div className={styles.items}>
            {/* Сначала добавляем все бесплатные темы */}
            {direction.map((item) => {
              const { works, title, active, price, slug } = item.node;
              const allThemes = works.map((obj) => obj.title);

              return (
                active &&
                works
                  .filter((item) => item.free)
                  .map((item, index) => {
                    return (
                      <Theme
                        openDetail={() =>
                          openDetail(item, price, allThemes, title, slug)
                        }
                        title={item.title}
                        description={title}
                        free={item.free}
                        icon={item.icon}
                        key={`theme_${index}`}
                      />
                    );
                  })
              );
            })}
            {/* После добавляем платные темы */}
            {direction.map((item) => {
              const { works, title, active, price, slug } = item.node;
              const allThemes = works.map((obj) => obj.title);

              return (
                active &&
                works
                  .filter((item) => !item.free)
                  .map((item, index) => {
                    return (
                      <Theme
                        openDetail={() =>
                          openDetail(item, price, allThemes, title, slug)
                        }
                        title={item.title}
                        description={title}
                        icon={item.icon}
                        key={`theme_${index}`}
                      />
                    );
                  })
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
      <Detail
        payment={payment}
        setPayment={setPayment}
        detail={detail}
        closeDetail={closeDetail}
      />
    </>
  );
}

export const Head = () => {
  const title = "Направления";
  const description =
    "Выбери актуальное для себя направления и начинай практиковаться на реальных задачах от наших экспертов.";

  const data = {
    title: `Графикси | ${title}`,
    description: description,
    slug: `/directions`,
    preview: "/preview.png",
  };

  return <MetaTag data={data} />;
};

export default Directions;
