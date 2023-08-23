import React, { useRef, useEffect } from 'react'
import cx from 'classname'
import { useQuery } from '@tanstack/react-query';
import { HiOutlineUpload } from 'react-icons/hi'
import { IoAddOutline, IoArrowUpSharp } from "react-icons/io5";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { themedata } from './themeData';
import { getExpert, editAdmin } from '../../../functions/superadmin';
import * as styles from './modal.module.scss'


function Edit({ closeModal, onImageLoad, areAllFieldsNotEmpty, expert, setExpert, price, setPrice }) {
  const previewRef = useRef(null);
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ['getexpert', expert.id],
    queryFn: () => getExpert(expert.id)
  })

  const editAdminMutation = useMutation({
    mutationFn: editAdmin,
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ['allusersforadmin'] })
    }
  })

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const numberValue = value === "" ? null : parseFloat(value);

    setPrice(prevState => ({
      ...prevState,
      [name]: numberValue
    }));
  };

  useEffect(() => {
    if (result.isSuccess && !result.isFetching) {
      const { user } = result.data;
      const priceNumber = user.price;

      Object.keys(priceNumber).forEach(key => {
        priceNumber[key] = parseInt(priceNumber[key]);
      });

      setExpert({
        id: user.user_id,
        avatar: user.avatar,
        name: user.name,
        about: user.about,
        slug: user.slug,
        direction: "design"
      })
      setPrice(priceNumber)
    }

    console.log(result)
  }, [result.isStale])

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: '0%', transition: { duration: 0.6 } }}
      exit={{ x: '100%', transition: { duration: 0.4 } }}
      transition={{ ease: [0.57, 0.14, 0.49, 0.91] }}
      className={styles.form}>
      <h5>Редактировать эксперта</h5>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: result.isLoading ? 0 : 1, pointerEvents: result.isLoading ? 'none' : 'auto' }} className={styles.info}>

        <div className={styles.avatar}>
          <div className={styles.fileupload}>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              className={styles.inputfile}
              onChange={(e) => onImageLoad(e, previewRef)}
            />

            <div className={styles.preview}>
              <img ref={previewRef} src={`${process.env.GATSBY_API_BASE_URL}${expert.avatar}`} className={styles.image} />
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
            value={expert.name}
            onChange={(e) => setExpert({ ...expert, name: e.target.value })} />
        </div>

        <div className={styles.input}>
          <input
            placeholder='Об эксперте'
            value={expert.about}
            onChange={(e) => setExpert({ ...expert, about: e.target.value })} />
        </div>

        <div className={styles.input}>
          <input
            placeholder='Ссылка'
            value={expert.slug}
            onChange={(e) => setExpert({ ...expert, slug: e.target.value })} />
        </div>

        <div className={styles.input}>
          <select className={expert.direction && styles.selected} value={expert.direction} onChange={(e) => setExpert({ ...expert, direction: e.target.value })}>
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
                      disabled={editAdminMutation.isLoading}
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

        {areAllFieldsNotEmpty(expert) ?
          <button className={styles.send}>
            <div className={styles.icon}>
              <IoAddOutline className={styles.svg} />
            </div>
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
      </motion.div>
    </motion.div>
  )
}

export default Edit