import React, { useEffect } from 'react'
import { navigate } from 'gatsby';
import { useQuery } from '@tanstack/react-query'
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../services/axiosClient'

import * as styles from '../styles/pages/god.module.scss'
import * as global from '../styles/base/global.module.scss'
import AllUsers from '../components/admin/superadmin/allUsers';

function God() {
  const { token } = useStateContext();

  const superadmincheck = () => {
    return axiosClient
      .get("/admin/check")
      .then(({ data }) => data.status)
      .catch((error) => error);
  };

  const superAdminQuery = useQuery({
    queryKey: ["superadmincheck"],
    queryFn: superadmincheck,
    enabled: !!token
  })


  const { data, isLoading, isError } = superAdminQuery;

  useEffect(() => {
    if (isError) {
      console.log("Ошибка при проверке авторизации")
      // Обработка ошибок
      return
    }

    if (!isLoading && !data) {
      navigate("/")
    }
  }, [data, isLoading, isError])


  return (
    <section className={styles.container}>
      <div className={global.container}>
        {isLoading &&
          <div>
            <h3>Загрузка</h3>
          </div>
        }
        {data && <div>
          <h3>Главный администратор</h3>
          <AllUsers />
        </div>
        }
      </div>

    </section>
  )
}

export default God