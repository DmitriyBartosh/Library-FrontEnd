import React from "react";
import cx from "classname";
import { useStaticQuery, graphql } from "gatsby";
import { useIsDesktop, useIsTablet } from "../../hooks/mediaQuery";

import Topnavigate from "../../components/navigation/topnavigate";
import Topmobilenavigate from "../../components/navigation/topmobilenavigate";
import Navigate from "../../components/admin/superadmin/navigate";
import Questions from "../../components/entryreview/questions";
import Footer from "../../components/footer";

import * as global from "../../styles/base/global.module.scss";
import * as styles from "../../styles/pages/entryreview.module.scss";

function Entryreview() {
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();

  const data = useStaticQuery(graphql`
    query {
      allDirectionsJson {
        nodes {
          slug
          title
        }
      }
    }
  `);

  return (
    <>
      {isDesktop && <Topnavigate />}
      {isTablet && <Topmobilenavigate />}
      <section className={cx(global.container, global.top)}>
        <Navigate />
        <div className={styles.container}>
          {data.allDirectionsJson.nodes.map((item) => {
            return (
              <div className={styles.direction} key={item.slug}>
                <h4>{item.title}</h4>
                <Questions direction={item} />
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Entryreview;
