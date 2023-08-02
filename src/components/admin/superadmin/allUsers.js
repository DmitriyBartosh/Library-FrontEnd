import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { useStateContext } from '../../../context/ContextProvider';
import { getUsers, addDesignAdmin, removeDesignAdmin } from '../../../functions/superadmin';
import Add from './add';
import Remove from './remove';

import * as styles from './allusers.module.scss'

function AllUsers() {
  const { token } = useStateContext();

  const queryClient = useQueryClient()

  const allUsersQuery = useQuery({
    queryKey: ["allusersforadmin"],
    queryFn: getUsers,
    enabled: !!token
  })

  const addAdminDesignMutation = useMutation({
    mutationFn: addDesignAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allusersforadmin'] })
    },
  })

  const removeAdminDesignMutation = useMutation({
    mutationFn: removeDesignAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allusersforadmin'] })
    }
  })

  console.log(allUsersQuery)

  return (
    <div className={styles.container}>
      <h4>Все пользователи</h4>
      {allUsersQuery.isLoading ?
        <div className={styles.loading}>
          <p>Загрузка пользователей</p>
        </div>
        :
        <div className={styles.list}>
          <div className={styles.head}>
            <div className={styles.block}>
              <p>ID</p>
            </div>
            <div className={styles.block}>
              <p>Имя</p>
            </div>
            <div className={styles.block}>
              <p>Email</p>
            </div>
            <div className={styles.block}>
              <p>Статус</p>
            </div>
            <div className={styles.block}>
              <p>Админ Дизайн</p>
            </div>
            <div className={styles.block}>
              <p>Админ Frontend</p>
            </div>
          </div>
          <div className={styles.users}>
            {allUsersQuery.data.data.map((item, index) => {
              const { id, name, email, design_admin, frontend_admin } = item;

              return <div className={styles.item} key={index}>
                <div className={styles.block}>
                  <p>{id}</p>
                </div>
                <div className={styles.block}>
                  <p>{name}</p>
                </div>
                <div className={styles.block}>
                  <p>{email}</p>
                </div>
                <div className={styles.block}>
                  <p>
                    {!(frontend_admin || design_admin) && "Пользователь"}
                    {frontend_admin && "Админ frontend направления"}
                    {design_admin && "Админ дизайн направления"}
                  </p>
                </div>
                <div className={styles.block}>
                  {design_admin ?
                    <Remove action={removeAdminDesignMutation} id={id} />
                    :
                    <Add action={addAdminDesignMutation} id={id} />
                  }
                </div>
                <div className={styles.block}>
                  {frontend_admin ?
                    <Remove />
                    :
                    <Add />
                  }
                </div>
              </div>
            })}
          </div>
        </div>


      }
    </div>
  )
}

export default AllUsers