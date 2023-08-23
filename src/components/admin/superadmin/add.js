import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineUpload } from 'react-icons/hi'
import { IoAddOutline, IoArrowUpSharp, IoSyncOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addAdmin } from '../../../functions/superadmin'
import { themedata } from './themeData';
import cx from 'classname'

import * as styles from './modal.module.scss'

function Add({ closeModal, onImageLoad, areAllFieldsNotEmpty, expert, setExpert, price, setPrice }) {
  const previewRef = useRef(null);
  const queryClient = useQueryClient();

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const numberValue = value === "" ? null : parseFloat(value);

    setPrice(prevState => ({
      ...prevState,
      [name]: numberValue
    }));
  };

  const addAdminMutation = useMutation({
    mutationFn: addAdmin,
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ['allusersforadmin'] })
    }
  })

  useEffect(() => {
    const initialDesignState = {};
    if (expert.direction) {
      Object.entries(themedata[expert.direction]).forEach(([key]) => {
        initialDesignState[key] = 1000;
      });

      setPrice(initialDesignState);
    } else {
      setPrice({})
    }
  }, [expert.direction])

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: '0%', transition: { duration: 0.6 } }}
      exit={{ x: '100%', transition: { duration: 0.4 } }}
      transition={{ ease: [0.57, 0.14, 0.49, 0.91] }}
      className={styles.form}>
      <h5>Добавить эксперта</h5>
      <div className={styles.info}>

        <div className={styles.avatar}>
          <div className={styles.fileupload}>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              disabled={addAdminMutation.isLoading}
              className={styles.inputfile}
              onChange={(e) => onImageLoad(e, previewRef)}
            />

            <div className={styles.preview}>
              <img ref={previewRef} className={styles.image} />
            </div>

            <div className={cx(styles.load, expert.avatar && styles.hide)}>
              <HiOutlineUpload className={styles.svg} />
              <p>Загрузить аватар</p>
            </div>
          </div>
        </div>

        <div className={styles.input}>
          <input
            placeholder='Имя'
            disabled={addAdminMutation.isLoading}
            value={expert.name}
            onChange={(e) => setExpert({ ...expert, name: e.target.value })} />
        </div>

        <div className={styles.input}>
          <input
            placeholder='Об эксперте'
            disabled={addAdminMutation.isLoading}
            value={expert.about}
            onChange={(e) => setExpert({ ...expert, about: e.target.value })} />
        </div>

        <div className={styles.input}>
          <input
            placeholder='Ссылка'
            disabled={addAdminMutation.isLoading}
            value={expert.slug}
            onChange={(e) => setExpert({ ...expert, slug: e.target.value })} />
        </div>

        <div className={styles.input}>
          <select className={expert.direction && styles.selected} disabled={addAdminMutation.isLoading} value={expert.direction} onChange={(e) => setExpert({ ...expert, direction: e.target.value })}>
            <option value="">Выберите вариант</option>
            <option value="design">Графический дизайнер</option>
            <option value="frontend">Frontend разработка</option>
            <option value="photo">Фотография</option>
          </select>
        </div>

        {expert.direction &&
          <div className={styles.price}>
            <div className={styles.head}>
              <h6>Цены за рецензию</h6>
            </div>

            <div className={styles.list}>
              {Object.entries(themedata[expert.direction]).map(([key, value]) => {
                const priceValue = price[key] || "";

                return <div className={styles.block} key={key}>
                  <div className={styles.title}>
                    <p>{value}</p>
                  </div>
                  <div className={styles.input}>
                    <input
                      placeholder={`Цена за рецензию на ${value}`}
                      type='number'
                      disabled={addAdminMutation.isLoading}
                      name={key}
                      value={priceValue}
                      onChange={handlePriceChange} />
                    <p className={styles.rub}>₽</p>
                  </div>
                </div>
              })}
            </div>
          </div>
        }

        {areAllFieldsNotEmpty(expert) && areAllFieldsNotEmpty(price) ?
          <button
            className={cx(styles.send, addAdminMutation.isLoading && styles.loading)}
            disabled={addAdminMutation.isLoading}
            onClick={() => addAdminMutation.mutate({ expert, price })}>
            {addAdminMutation.isLoading ?
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.25, repeat: Infinity }}
                className={styles.load}>
                <IoSyncOutline className={styles.svg} />
              </motion.div>
              :
              <div className={styles.icon}>
                <IoAddOutline className={styles.svg} />
              </div>
            }

            <p className={styles.text}>Назначить экспертом</p>
          </button>
          :
          <div className={styles.hint}>
            <div className={styles.icon}>
              <IoArrowUpSharp className={styles.svg} />
            </div>
            <p className={styles.text}>Заполните все поля</p>
          </div>
        }
      </div>
    </motion.div>
  )
}

export default Add