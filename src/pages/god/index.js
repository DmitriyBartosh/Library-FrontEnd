import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../functions/superadmin";
import { useStateContext } from "../../context/ContextProvider";

import Topnavigate from "../../components/navigation/topnavigate";
import AllUsers from "../../components/admin/superadmin/allUsers";
import Modal from "../../components/admin/superadmin/modal";

import * as styles from "../../styles/pages/god.module.scss";
import * as global from "../../styles/base/global.module.scss";

function God() {
  const { user } = useStateContext();

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [price, setPrice] = useState({});
  const [expert, setExpert] = useState({
    id: "",
    avatar: "",
    name: "",
    about: "",
    slug: "",
    direction: "",
  });

  const allUsersQuery = useQuery({
    queryKey: ["allusersforadmin"],
    queryFn: getUsers,
    enabled: !!user,
  });

  const openModal = (id, name, isExpert) => {
    if (isExpert) {
      setEditMode(true);
      setShowModal(true);
      setExpert({ ...expert, id: id });
    } else {
      setEditMode(false);
      setShowModal(true);
      setExpert({ ...expert, id: id, name: name });
    }
  };

  const closeModal = () => {
    setExpert({
      id: "",
      avatar: "",
      name: "",
      about: "",
      slug: "",
      direction: "",
    });
    setShowModal(false);
  };

  return (
    <section className={styles.users}>
      <Topnavigate />
      <div className={global.container}>
        {allUsersQuery.isLoading && (
          <div>
            <h3>Загрузка</h3>
          </div>
        )}
        {allUsersQuery.data && (
          <div className={styles.table}>
            <AllUsers openModal={openModal} allUsersQuery={allUsersQuery} />
            <Modal
              editMode={editMode}
              showModal={showModal}
              closeModal={closeModal}
              expert={expert}
              price={price}
              setPrice={setPrice}
              setExpert={setExpert}
            />
          </div>
        )}

        {allUsersQuery.error && <p>Ошибка соединения</p>}
      </div>
    </section>
  );
}

export default God;
