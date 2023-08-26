import React from 'react'
import { useStateContext } from '../context/ContextProvider'
import { useEffectOnce } from 'react-use'
import { navigate } from 'gatsby'
import { useQuery } from '@tanstack/react-query'
import { graphql } from "gatsby"
import { getExpert } from '../functions/expert'

import Expert from '../components/admin/expert/expert'

import * as styles from '../styles/pages/admin.module.scss'
import * as global from '../styles/base/global.module.scss'

function Admin() {
  const { token, user } = useStateContext();

  useEffectOnce(() => {
    if (!token || !user) {
      navigate("/");
    }
  })

  const getExpertQuery = useQuery({
    queryKey: ["getexpertforexpert"],
    queryFn: getExpert,
    enabled: !!token
  })

  const { data, isLoading, isError } = getExpertQuery;

  return (
    <section className={styles.container}>
      <div className={global.container}>
        {isLoading &&
          <div className={styles.loading}>
            <p>Загрузка</p>
          </div>
        }
        {data && <Expert data={data.expert} />}
        {isError && <p>Ошибка соединения</p>}

      </div>
    </section>
  )
}

export default Admin

