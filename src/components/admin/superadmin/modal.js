import React, { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Add from './add';

import * as styles from './modal.module.scss'
import Edit from './edit';



function Modal({ editMode, closeModal, showModal, expert, setExpert, price, setPrice }) {

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
      if (value === null || value === undefined || value === '') {
        return false;
      }
    }

    // Если все поля не пустые, возвращаем true
    return true;
  }

  return (
    <AnimatePresence initial={false}>
      {showModal &&
        <div className={styles.container}>
          {editMode ?
            <Edit
              closeModal={closeModal}
              onImageLoad={onImageLoad}
              expert={expert}
              setExpert={setExpert}
              price={price}
              setPrice={setPrice}
              areAllFieldsNotEmpty={areAllFieldsNotEmpty} />
            :
            <Add
              closeModal={closeModal}
              onImageLoad={onImageLoad}
              price={price}
              setPrice={setPrice}
              expert={expert}
              setExpert={setExpert}
              areAllFieldsNotEmpty={areAllFieldsNotEmpty} />
          }
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.background}
            onClick={closeModal} />
        </div>
      }
    </AnimatePresence>
  )
}

export default Modal