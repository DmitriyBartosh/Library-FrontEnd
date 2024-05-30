import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineUpload } from "react-icons/hi";
import { IoAddOutline, IoArrowUpSharp, IoSyncOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAdmin } from "../../../functions/superadmin";
import cx from "classname";

import * as styles from "./expertchange.module.scss";
import Modal from "../../modal";

function Add({
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

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const numberValue = value === "" ? null : parseFloat(value);

    setPrice((prevState) => ({
      ...prevState,
      [name]: numberValue,
    }));
  };

  const addAdminMutation = useMutation({
    mutationFn: addAdmin,
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["allusersforadmin"] });
    },
  });

  useEffect(() => {
    const initialPriceState = {};
    if (expert.direction) {
      slug
        .find((item) => item.node.slug === expert.direction)
        .node.works.forEach((item) => {
          initialPriceState[item.slug] = 1000;
        });

      setPrice(initialPriceState);
    } else {
      setPrice({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expert.direction]);

  return (
    <div className={styles.content}>
      <h5>Добавить эксперта</h5>
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
            <img ref={previewRef} className={styles.image} alt="Аватар" />
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
          disabled={addAdminMutation.isLoading}
          value={expert.name}
          onChange={(e) => setExpert({ ...expert, name: e.target.value })}
        />
      </div>
      <div className={styles.input}>
        <input
          placeholder="Об эксперте"
          disabled={addAdminMutation.isLoading}
          value={expert.about}
          onChange={(e) => setExpert({ ...expert, about: e.target.value })}
        />
      </div>
      <div className={styles.input}>
        <input
          placeholder="Ссылка"
          disabled={addAdminMutation.isLoading}
          value={expert.slug}
          onChange={(e) => setExpert({ ...expert, slug: e.target.value })}
        />
      </div>
      <div className={styles.input}>
        <select
          className={expert.direction && styles.selected}
          disabled={addAdminMutation.isLoading}
          value={expert.direction}
          onChange={(e) => setExpert({ ...expert, direction: e.target.value })}
        >
          <option value="">Выберите направление</option>
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
                        disabled={addAdminMutation.isLoading}
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
            addAdminMutation.isLoading && styles.loading
          )}
          disabled={addAdminMutation.isLoading}
          onClick={() => addAdminMutation.mutate({ expert, price })}
        >
          {addAdminMutation.isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.25, repeat: Infinity }}
              className={styles.load}
            >
              <IoSyncOutline className={styles.svg} />
            </motion.div>
          ) : (
            <div className={styles.icon}>
              <IoAddOutline className={styles.svg} />
            </div>
          )}

          <p className={styles.text}>Назначить экспертом</p>
        </button>
      ) : (
        <div className={styles.hint}>
          <div className={styles.icon}>
            <IoArrowUpSharp className={styles.svg} />
          </div>
          <p className={styles.text}>Заполните все поля</p>
        </div>
      )}
    </div>
  );
}

export default Add;
