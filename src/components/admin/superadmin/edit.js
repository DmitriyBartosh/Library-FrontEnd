import React, { useRef, useEffect } from "react";
import cx from "classname";
import { useQuery } from "@tanstack/react-query";
import { HiOutlineUpload } from "react-icons/hi";
import {
  IoSave,
  IoArrowUpSharp,
  IoSyncOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  getExpert,
  editAdmin,
  deleteAdmin,
} from "../../../functions/superadmin";

import * as styles from "./expertchange.module.scss";

function Edit({
  closeModal,
  onImageLoad,
  areAllFieldsNotEmpty,
  expert,
  setExpert,
  price,
  setPrice,
  slug,
}) {
  const previewRef = useRef(null);
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["getexpertforadmin", expert.id],
    queryFn: () => getExpert(expert.id),
  });

  const editAdminMutation = useMutation({
    mutationFn: editAdmin,
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({
        queryKey: ["getexpertforadmin", expert.id],
      });
      queryClient.invalidateQueries({ queryKey: ["allusersforadmin"] });
    },
  });

  const deleteAdminMutation = useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["allusersforadmin"] });
    },
  });

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const numberValue = value === "" ? null : parseFloat(value);

    setPrice((prevState) => ({
      ...prevState,
      [name]: numberValue,
    }));
  };

  useEffect(() => {
    if (result.isSuccess && !result.isFetching) {
      const { user } = result.data;
      const priceNumber = user.price;

      Object.keys(priceNumber).forEach((key) => {
        priceNumber[key] = parseInt(priceNumber[key]);
      });

      setExpert({
        id: user.user_id,
        avatar: user.avatar,
        name: user.name,
        about: user.about,
        slug: user.slug,
        direction: user.direction,
      });
      setPrice(priceNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isStale]);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: "0%", transition: { duration: 0.6 } }}
      exit={{ x: "100%", transition: { duration: 0.4 } }}
      transition={{ ease: [0.57, 0.14, 0.49, 0.91] }}
      className={styles.form}
    >
      <h5>Редактировать эксперта</h5>
      {result.isLoading && <p>Загрузка...</p>}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: result.isLoading ? 0 : 1,
          pointerEvents: result.isLoading ? "none" : "auto",
        }}
        className={styles.info}
      >
        <div className={styles.avatar}>
          <div className={styles.fileupload}>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              className={styles.inputfile}
              disabled={editAdminMutation.isLoading}
              onChange={(e) => onImageLoad(e, previewRef)}
            />

            <div className={styles.preview}>
              <img
                ref={previewRef}
                src={`${process.env.GATSBY_API_BASE_URL}${expert.avatar}`}
                className={styles.image}
                alt="Аватар"
              />
            </div>

            <div className={cx(styles.load, expert.avatar && styles.hide)}>
              <HiOutlineUpload className={styles.svg} />
              <p>Загрузить аватар</p>
            </div>
          </div>
        </div>

        <div className={styles.input}>
          <input
            placeholder="Имя"
            value={expert.name}
            disabled={editAdminMutation.isLoading}
            onChange={(e) => setExpert({ ...expert, name: e.target.value })}
          />
        </div>

        <div className={styles.input}>
          <input
            placeholder="Об эксперте"
            value={expert.about}
            disabled={editAdminMutation.isLoading}
            onChange={(e) => setExpert({ ...expert, about: e.target.value })}
          />
        </div>

        <div className={styles.input}>
          <input
            placeholder="Ссылка"
            value={expert.slug}
            disabled={editAdminMutation.isLoading}
            onChange={(e) => setExpert({ ...expert, slug: e.target.value })}
          />
        </div>

        <div className={styles.input}>
          <select
            className={expert.direction && styles.selected}
            disabled={editAdminMutation.isLoading}
            value={expert.direction}
            onChange={(e) =>
              setExpert({ ...expert, direction: e.target.value })
            }
          >
            <option value="">Выберите вариант</option>
            {slug.map((item) => {
              const { title, slug } = item.node;

              return (
                <option value={slug} key={`option_${slug}`}>
                  {title}
                </option>
              );
            })}
          </select>
        </div>

        {expert.direction && (
          <div className={styles.price}>
            <div className={styles.head}>
              <h6>Цены за рецензию</h6>
            </div>

            <div className={styles.list}>
              {slug
                .find((item) => item.node.slug === expert.direction)
                .node.works.map((item) => {
                  const priceValue = price[item.slug] || "";

                  return (
                    <div className={styles.block} key={`price_${item.slug}`}>
                      <div className={styles.title}>
                        <p>{item.title}</p>
                      </div>
                      <div className={styles.input}>
                        <input
                          placeholder={`Цена за рецензию на ${item.title}`}
                          type="number"
                          disabled={editAdminMutation.isLoading}
                          name={item.slug}
                          value={priceValue}
                          onChange={handlePriceChange}
                        />
                        <p className={styles.rub}>₽</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {areAllFieldsNotEmpty(expert) && areAllFieldsNotEmpty(price) ? (
          <button
            className={cx(
              styles.send,
              editAdminMutation.isLoading && styles.loading
            )}
            disabled={editAdminMutation.isLoading}
            onClick={() => editAdminMutation.mutate({ expert, price })}
          >
            {editAdminMutation.isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.25, repeat: Infinity }}
                className={styles.load}
              >
                <IoSyncOutline className={styles.svg} />
              </motion.div>
            ) : (
              <div className={styles.icon}>
                <IoSave className={styles.svg} />
              </div>
            )}

            <p className={styles.text}>Сохранить изменения</p>
          </button>
        ) : (
          <div className={styles.hint}>
            <div className={styles.icon}>
              <IoArrowUpSharp className={styles.svg} />
            </div>
            <p className={styles.text}>Заполните все поля</p>
          </div>
        )}

        <button
          className={cx(
            styles.del,
            deleteAdminMutation.isLoading && styles.loading
          )}
          disabled={deleteAdminMutation.isLoading}
          onClick={() => deleteAdminMutation.mutate({ id: expert.id })}
        >
          {deleteAdminMutation.isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.25, repeat: Infinity }}
              className={styles.load}
            >
              <IoSyncOutline className={styles.svg} />
            </motion.div>
          ) : (
            <div className={styles.icon}>
              <IoTrashOutline className={styles.svg} />
            </div>
          )}

          <p className={styles.text}>Удалить эксперта</p>
        </button>
      </motion.div>
    </motion.div>
  );
}

export default Edit;
