import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getUsers, removeDesignAdmin } from '../functions/superadmin';
import { useStateContext } from '../context/ContextProvider';

import axiosClient from '../services/axiosClient'

import AllUsers from '../components/admin/superadmin/allUsers';
import Modal from '../components/admin/superadmin/modal';

import * as styles from '../styles/pages/god.module.scss'
import * as global from '../styles/base/global.module.scss'


function God() {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [price, setPrice] = useState({});
  const [expert, setExpert] = useState({
    id: '',
    avatar: '',
    name: '',
    about: '',
    slug: '',
    direction: ''
  })

  const { token } = useStateContext();

  const queryClient = useQueryClient()

  const allUsersQuery = useQuery({
    queryKey: ["allusersforadmin"],
    queryFn: getUsers,
    enabled: !!token
  })

  const removeAdminDesignMutation = useMutation({
    mutationFn: removeDesignAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allusersforadmin'] })
    }
  })

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

  const openModal = (id, name, isExpert) => {
    if (isExpert) {
      setEditMode(true)
      setShowModal(true);
      setExpert({ ...expert, id: id })
    } else {
      setEditMode(false)
      setShowModal(true);
      setExpert({ ...expert, id: id, name: name })
    }
  }

  const closeModal = () => {
    setExpert({
      id: '',
      avatar: '',
      name: '',
      about: '',
      slug: '',
      direction: ''
    })
    setShowModal(false);
  }

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
          <AllUsers
            openModal={openModal}
            allUsersQuery={allUsersQuery} />

          <Modal
            editMode={editMode}
            showModal={showModal}
            closeModal={closeModal}
            expert={expert}
            price={price}
            setPrice={setPrice}
            setExpert={setExpert} />

        </div>
        }
      </div>

    </section>
  )
}

export default God