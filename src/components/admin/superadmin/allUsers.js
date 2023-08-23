import React from 'react'
import Button from './button';

import * as styles from './allusers.module.scss'


function AllUsers({ openModal, allUsersQuery }) {


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
              <p>Добавить эксперта</p>
            </div>
          </div>
          <div className={styles.users}>
            {allUsersQuery.data.data.map((item, index) => {
              const { id, name, email, design_admin, frontend_admin } = item;
              const isExpert = design_admin || frontend_admin;


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
                  <Button
                    isExpert={isExpert}
                    openModal={() => openModal(id, name, isExpert)} />
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