import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Add from "./add";
import Modal from "../../modal";
import Edit from "./edit";

function ExpertChange({
  editMode,
  closeModal,
  showModal,
  expert,
  setExpert,
  price,
  setPrice,
}) {
  const onImageLoad = (e, previewRef) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      previewRef.current.setAttribute("src", reader.result);
    });

    if (file) {
      reader.readAsDataURL(file);
    }

    setExpert({ ...expert, avatar: file });
  };

  const areAllFieldsNotEmpty = (obj) => {
    // Получаем все ключи объекта
    var keys = Object.keys(obj);

    // Проверяем каждое поле на пустоту
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = obj[key];

      // Если значение поля пустое или равно undefined, возвращаем false
      if (value === null || value === undefined || value === "") {
        return false;
      }
    }

    // Если все поля не пустые, возвращаем true
    return true;
  };

  const slugQuery = useStaticQuery(graphql`
    query {
      allDirectionsJson {
        edges {
          node {
            slug
            title
            works {
              title
              slug
            }
          }
        }
      }
    }
  `);

  const slug = slugQuery.allDirectionsJson.edges;

  return (
    <Modal visible={showModal} close={closeModal}>
      {editMode ? (
        <Edit
          closeModal={closeModal}
          onImageLoad={onImageLoad}
          expert={expert}
          setExpert={setExpert}
          price={price}
          setPrice={setPrice}
          areAllFieldsNotEmpty={areAllFieldsNotEmpty}
          slug={slug}
        />
      ) : (
        <Add
          closeModal={closeModal}
          onImageLoad={onImageLoad}
          price={price}
          setPrice={setPrice}
          expert={expert}
          setExpert={setExpert}
          areAllFieldsNotEmpty={areAllFieldsNotEmpty}
          slug={slug}
        />
      )}
    </Modal>
  );
}

export default ExpertChange;
