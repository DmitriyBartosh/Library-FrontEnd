import React, { useState } from "react";
import cx from "classname";
import { IoAddSharp, IoSyncOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { addPromoCodes } from "../../../functions/promocodes";
import { convertDate } from "../../../functions/other";

import * as global from "../../../styles/base/global.module.scss";
import * as styles from "./promocode.module.scss";

function Promocode({ slug }) {
  const [promo, setPromo] = useState({});

  const queryClient = useQueryClient();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let parsedValue = value; // Значение по умолчанию - не число

    // Проверяем, содержит ли введенное значение цифры
    if (/^\d+$/.test(value)) {
      parsedValue = parseFloat(value);
    }

    setPromo((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  const addPromoCodesMutation = useMutation({
    mutationFn: addPromoCodes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allpromocodes"] });
    },
  });

  return (
    <section className={styles.section}>
      <h4>Добавить промокоды</h4>
      <div className={styles.settings}>
        <div className={styles.block}>
          <p className={styles.name}>Имя промокода:</p>
          <input
            value={promo.name || ""}
            placeholder="Отображается при активации"
            type="text"
            name="name"
            className={styles.field}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.block}>
          <p className={styles.name}>Направление:</p>
          <select
            className={cx(
              styles.select,
              promo.direction !== "" && styles.selected
            )}
            name="direction"
            value={promo.direction || ""}
            onChange={handleInputChange}
            placeholder="ВЫбери"
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
        <div className={styles.block}>
          <p className={styles.name}>На сколько дней:</p>
          <input
            value={promo.periodicity || 1}
            type="number"
            name="periodicity"
            min={1}
            step={1}
            max={365}
            className={styles.field}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.block}>
          <p className={styles.name}>До какого числа:</p>
          <div className={styles.field}>
            <input
              value={promo.expired_at || "2024-01-21"}
              type="date"
              name="expired_at"
              className={styles.datepicker}
              onChange={handleInputChange}
            />
            {promo.expired_at === undefined ? (
              <p className={styles.placeholder}>Выбрать дату</p>
            ) : (
              <p>{convertDate(promo.expired_at)}</p>
            )}
          </div>
        </div>
        <div className={styles.block}>
          <p className={styles.name}>Количество:</p>
          <input
            value={promo.count || 1}
            type="number"
            name="count"
            min={1}
            step={1}
            max={50}
            className={styles.field}
            onChange={handleInputChange}
          />
        </div>
        <button
          disabled={addPromoCodesMutation.isLoading}
          onClick={() =>
            addPromoCodesMutation.mutate({
              promo,
            })
          }
          className={cx(global.buttoncenter, styles.addpromo)}
        >
          {addPromoCodesMutation.isLoading ? (
            <>
              <p className={global.text}>Сохранение</p>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.25, repeat: Infinity }}
                className={global.load}
              >
                <IoSyncOutline className={global.svg} />
              </motion.div>
            </>
          ) : (
            <>
              <p className={global.text}>Добавить</p>
              <IoAddSharp className={global.icon} />
            </>
          )}
        </button>
      </div>
    </section>
  );
}

export default Promocode;
