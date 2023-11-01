import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useStaticQuery, graphql } from "gatsby";
import { getAllPromoCodes } from "../../functions/promocodes";
import { useStateContext } from "../../context/ContextProvider";
import { convertDate } from "../../functions/other";

import Promocode from "../../components/admin/superadmin/promocode";
import Topnavigate from "../../components/navigation/topnavigate";

import * as global from "../../styles/base/global.module.scss";
import * as styles from "../../styles/pages/god.module.scss";

function Promo() {
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

  return (
    <section className={styles.promo}>
      <Topnavigate />
      <div className={global.container}>
        {allPromoCodesQuery.isLoading && (
          <div>
            <h3>Загрузка</h3>
          </div>
        )}
        {allPromoCodesQuery.data && (
          <div className={styles.new}>
            <Promocode slug={slug} />
            <div className={styles.block}>
              <p className={styles.title}>Активированные промокоды</p>
              <div className={styles.list}></div>
            </div>
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
                        <p>{id}.</p>
                        <p>{name}</p>
                        <p>{directionName}</p>
                        <p>
                          Подписка на <span>{periodicity}</span> дней
                        </p>
                        <p>
                          Активен до <span>{convertDate(expired_at)}</span>
                        </p>
                        <p>{code}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Promo;
