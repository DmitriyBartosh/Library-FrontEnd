import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import cx from "classname";
import { getUsers } from "../../functions/superadmin";
import { useStateContext } from "../../context/ContextProvider";
import { useIsDesktop, useIsTablet } from "../../hooks/mediaQuery";

import Topnavigate from "../../components/navigation/topnavigate";
import Topmobilenavigate from "../../components/navigation/topmobilenavigate";
import AllUsers from "../../components/admin/superadmin/allUsers";
import ExpertChange from "../../components/admin/superadmin/expertChange";
import Footer from "../../components/footer";
import Navigate from "../../components/admin/superadmin/navigate";

import * as global from "../../styles/base/global.module.scss";

function God() {
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();

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

  if (allUsersQuery.isLoading) {
    <section className={cx(global.container, global.top)}>
      <p>Загрузка данных...</p>
    </section>;
  }

  return (
    <>
      {isDesktop && <Topnavigate />}
      {isTablet && <Topmobilenavigate />}
      <section className={cx(global.container, global.top)}>
        <Navigate />
        {allUsersQuery.data && (
          <>
            <AllUsers openModal={openModal} allUsersQuery={allUsersQuery} />
            <ExpertChange
              editMode={editMode}
              showModal={showModal}
              closeModal={closeModal}
              expert={expert}
              price={price}
              setPrice={setPrice}
              setExpert={setExpert}
            />
          </>
        )}
      </section>
      <Footer />
    </>
  );
}

export default God;
