import React, { useState } from "react";
import cx from "classname";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby";

import Topnavigate from "../components/navigation/topnavigate";
import Footer from "../components/footer";
import Detail from "../components/direction/detail";
import Theme from "../components/direction/theme";

import * as styles from "../styles/pages/directions.module.scss";
import * as global from "../styles/base/global.module.scss";

function Direction(context) {
  const { title, works, price, slug } = context.pageContext.data;
  const allThemes = works.map((obj) => obj.title);

  // сортируем, чтобы сначала шли бесплатные темы
  const sortedWork = works.sort((a, b) => {
    if (a.free && !b.free) {
      return -1;
    } else if (!a.free && b.free) {
      return 1;
    } else {
      return 0;
    }
  });

  const [payment, setPayment] = useState(false);
  const [detail, setDetail] = useState({
    visible: false,
    data: {},
    direction: title,
    price: price,
    themes: allThemes,
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
            works {
              title
              slug
              tags
              description
              steps
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
      title: title,
      direction: slug,
      price: price,
      themes: allThemes,
    });
  }

  function openDetail(data) {
    setPayment(false);
    setDetail({
      ...detail,
      visible: true,
      data: data,
      title: title,
      direction: slug,
      price: price,
      themes: allThemes,
    });
  }

  return (
    <>
      <Topnavigate />
      <section className={cx(styles.section, global.container)}>
        <div className={styles.direction}>
          <div className={styles.title}>
            <h2>Направление {title}</h2>
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
              const { title, active, slug } = item.node;
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
            {sortedWork.map((item, index) => {
              return (
                <Theme
                  openDetail={() => openDetail(item)}
                  description={title}
                  title={item.title}
                  free={item.free}
                  icon={item.icon}
                  key={`theme_${index}`}
                />
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

export default Direction;
