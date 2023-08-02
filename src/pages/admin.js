import React from 'react'
import { useStateContext } from '../context/ContextProvider'
import { useEffectOnce } from 'react-use'
import { navigate } from 'gatsby'
import { useQuery } from '@tanstack/react-query'
import axiosClient from '../services/axiosClient'

import DesignExpert from '../components/admin/design/designExpert'

import * as styles from '../styles/pages/admin.module.scss'
import * as global from '../styles/base/global.module.scss'

function Admin() {
  const { token, user } = useStateContext();

  useEffectOnce(() => {
    if (!token || !user) {
      navigate("/");
    }
  })

  const designexpert = () => {
    return axiosClient
      .get("/admin/expert")
      .then(({ data }) => data)
      .catch((error) => error);
  };

  const designExpertQuery = useQuery({
    queryKey: ["designexpert"],
    queryFn: designexpert,
    enabled: !!token
  })



  const { data, isLoading, isError } = designExpertQuery;

  return (
    <section className={styles.container}>
      <div className={global.container}>
        {isLoading ?
          <div className={styles.loading}>
            <p>Загрузка</p>
          </div>
          :
          <>
            {data.design && <DesignExpert />}
            {data.frontend && <p>Фронтенд направление</p>}
          </>
        }
        {isError && <p>Ошибка соединения</p>}

      </div>
    </section>
  )
}

export default Admin