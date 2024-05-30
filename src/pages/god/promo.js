import React from "react";
import { useQuery } from "@tanstack/react-query";
import cx from "classname";
import { useStaticQuery, graphql } from "gatsby";
import { getAllPromoCodes } from "../../functions/promocodes";
import { useStateContext } from "../../context/ContextProvider";
import { convertDate } from "../../functions/other";
import { useIsDesktop, useIsTablet } from "../../hooks/mediaQuery";

import Promocode from "../../components/admin/superadmin/promocode";
import Navigate from "../../components/admin/superadmin/navigate";
import Topnavigate from "../../components/navigation/topnavigate";
import Topmobilenavigate from "../../components/navigation/topmobilenavigate";
import Footer from "../../components/footer";

import * as global from "../../styles/base/global.module.scss";
import * as styles from "../../styles/pages/god.module.scss";

function Promo() {
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();
  const { user } = useStateContext();

  const allPromoCodesQuery = useQuery({
    queryKey: ["allpromocodes"],
    queryFn: getAllPromoCodes,
    enabled: !!user,
  });

  const slugQuery = useStaticQuery(graphql`
    query {
      allDirectionsJson {
        edges {
          node {
            slug
            title
            works {
              title
              slug
            }
          }
        }
      }
    }
  `);

  const slug = slugQuery.allDirectionsJson.edges;

  if (allPromoCodesQuery.isLoading) {
    return (
      <>
        {isDesktop && <Topnavigate />}
        {isTablet && <Topmobilenavigate />}
        <section className={cx(global.container, global.top)}>
          <p>Загрузка данных...</p>
        </section>
      </>
    );
  }

  return (
    <>
      {isDesktop && <Topnavigate />}
      {isTablet && <Topmobilenavigate />}
      <section className={cx(global.container, global.top)}>
        <Navigate />
        {allPromoCodesQuery.data && (
          <>
            <Promocode slug={slug} />
            <div className={styles.block}>
              <p className={styles.title}>Активные промокоды</p>
              <div className={styles.list}>
                {allPromoCodesQuery.data.promocodes
                  .filter((item) => item.status === "active")
                  .map((item, index) => {
                    const {
                      id,
                      name,
                      direction,
                      periodicity,
                      expired_at,
                      code,
                    } = item;

                    const directionName = slug.find(
                      (item) => item.node.slug === direction
                    ).node.title;

                    return (
                      <div className={styles.item} key={index}>
                        <p className={styles.id}>{id}.</p>
                        <p>{name}</p>
                        <p>{directionName}</p>
                        <p>
                          Подписка на <span>{periodicity}</span> дней
                        </p>
                        <p>
                          Активен до <span>{convertDate(expired_at)}</span>
                        </p>
                        <p className={styles.code}>{code}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  );
}

export default Promo;
