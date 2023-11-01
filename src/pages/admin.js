import React from "react";
import { useStateContext } from "../context/ContextProvider";
import { useEffectOnce } from "react-use";
import { navigate } from "gatsby";
import { useQuery } from "@tanstack/react-query";
import { getExpert } from "../functions/expert";

import Expert from "../components/admin/expert/expert";

import * as styles from "../styles/pages/admin.module.scss";
import * as global from "../styles/base/global.module.scss";

function Admin() {
  const { user, isLoggedIn } = useStateContext();

  useEffectOnce(() => {
    if (!isLoggedIn) {
      navigate("/auth");
    }
  });

  const getExpertQuery = useQuery({
    queryKey: ["getexpertforexpert"],
    queryFn: getExpert,
    enabled: !!user,
  });

  const { data, isLoading, isError } = getExpertQuery;

  return (
    <section className={styles.container}>
      <div className={global.container}>
        {isLoading && (
          <div className={styles.loading}>
            <p>Загрузка</p>
          </div>
        )}
        {data && <Expert data={data.expert} />}
        {isError && <p>Ошибка соединения</p>}
      </div>
    </section>
  );
}

export default Admin;
