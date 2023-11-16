import React from "react";
import { useQuery } from "@tanstack/react-query";
import Linkwork from "../linkwork";
import { getAllUserWorks } from "../../../functions/expert";
import * as styles from "./theme.module.scss";

function Theme({ slug }) {
  const direction = slug.slug;

  const allUserWorksQuery = useQuery({
    queryKey: ["alluserlinks", direction],
    queryFn: () => getAllUserWorks(direction),
  });

  const { isLoading, data } = allUserWorksQuery;

  if (isLoading) {
    return (
      <section className={styles.container}>
        <h4>Загрузка данных...</h4>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.links}>
        {slug.works.map((item, index) => {
          const visible = data?.works.some((work) => work.theme === item.slug);

          if (visible) {
            return (
              <div className={styles.theme} key={`theme${index}`}>
                <h5>{item.title}</h5>
                <div className={styles.items}>
                  {data?.works
                    ?.filter((work) => work.theme === item.slug)
                    .map((item, index) => {
                      return (
                        <Linkwork item={item} user={item.user} key={index} />
                      );
                    })}
                </div>
              </div>
            );
          }
        })}
      </div>
    </section>
  );
}

export default Theme;
