import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import cx from "classname";
import { useStaticQuery, graphql } from "gatsby";

import Topnavigate from "../components/navigation/topnavigate";
import Footer from "../components/footer";
import Detail from "../components/direction/detail";

import * as styles from "../styles/pages/directions.module.scss";
import * as global from "../styles/base/global.module.scss";
import Theme from "../components/direction/theme";

function Directions() {
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
  const sortedDirection = direction.sort((a, b) => {
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
      <Topnavigate />
      <section className={cx(styles.section, global.container)}>
        <div className={styles.direction}>
          <div className={styles.title}>
            <h2>Все направления площадки графикси</h2>
          </div>

          <div className={styles.list}>
            <Link
              to="/directions"
              className={styles.link}
              activeClassName={styles.active}
            >
              <p className={styles.text}>Все направления</p>
            </Link>
            {sortedDirection.map((item, index) => {
              const { title, slug, active } = item.node;

              return (
                <Link
                  to={`/directions/${slug}`}
                  className={cx(styles.link, !active && styles.hidden)}
                  activeClassName={styles.active}
                  key={`direction_${index}`}
                >
                  <p className={styles.text}>{title}</p>
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

export default Directions;
