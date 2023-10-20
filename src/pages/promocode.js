import React, { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import cx from "classname";
import { AnimatePresence, motion } from "framer-motion";
import {
  IoSyncOutline,
  IoCheckmarkSharp,
  IoArrowBackSharp,
} from "react-icons/io5";
import { Link, navigate } from "gatsby";
import { activatePromoCode } from "../functions/promocodes";
import { useSearchParam, useEffectOnce } from "react-use";
import { useStateContext } from "../context/ContextProvider";

import Bird from "../images/svg/bird";
import Birdonbranch from "../images/svg/birdonbranch";
import Flower from "../images/svg/flower/flowertwo";
import Topnavigate from "../components/navigation/topnavigate";

import * as global from "../styles/base/global.module.scss";
import * as styles from "../styles/pages/promocode.module.scss";

function Promocode() {
  const { user } = useStateContext();
  const queryClient = useQueryClient();

  const id = useSearchParam("id");

  const [promo, setPromo] = useState({
    code: "",
    apply: false,
  });

  const [error, setError] = useState(false);

  const activatePromocodeMutation = useMutation({
    mutationFn: activatePromoCode,
    onSuccess: (res) => {
      setPromo({ ...promo, apply: true });
      queryClient.invalidateQueries({ queryKey: ["getAllSubscribes"] });
    },
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const inputValue = event.target.value.toUpperCase();
    const regex = /^[A-Za-z0-9]+$/;

    if (regex.test(inputValue) || inputValue === "") {
      setPromo({ ...promo, code: inputValue });
      navigate(`?id=${inputValue}`);
      if (error) {
        setError(false);
      }
    } else {
      setError(true);
    }
  };

  useEffectOnce(() => {
    setPromo({ ...promo, code: id || "" });
  });

  return (
    <>
      <Topnavigate />
      <section className={styles.container}>
        <Bird className={styles.bird} />
        <Birdonbranch className={styles.birdonbranch} />
        <Flower className={styles.flower} />

        <div className={styles.block}>
          <div>
            <p className={styles.name}>
              {user.name} / {user.email}
            </p>
            <p className={styles.title}>Добавить промокод</p>
          </div>
          <p>
            После активации промокода будет добавлена подписка на профиль{" "}
            <span>{user.email}</span>.
          </p>
          <p>
            Если у тебя <span>есть активная подписка</span>, то активировав
            промокод мы <span>добавим дни</span> к уже активной подписке.
          </p>
        </div>

        {promo.apply &&
          (activatePromocodeMutation.data.data.activate ? (
            <div className={styles.block}>
              <p className={styles.title}>Активирован</p>
              <p>{activatePromocodeMutation.data.data.message}</p>
              <Link
                to="/portfolio"
                className={cx(
                  global.buttontext,
                  styles.buttongreen,
                  styles.margintop
                )}
              >
                <p className={global.text}>За работу</p>
              </Link>
            </div>
          ) : (
            <div className={styles.block}>
              <p className={styles.title}>Не активирован</p>
              <p>{activatePromocodeMutation.data.data.message}</p>
              <p>Попробуй ввести другой промокод</p>
            </div>
          ))}

        {error && (
          <div className={cx(styles.block, styles.error)}>
            <p>
              <span>Переключи раскладку</span> клавиатуры, промокод состоит
              только из <span>английских букв</span> и <span>цифры</span>.
            </p>
          </div>
        )}

        <div className={styles.action}>
          <div className={styles.field}>
            <input
              maxLength={8}
              placeholder="Поле для промокода"
              type="text"
              value={promo.code || ""}
              onChange={handleFormSubmit}
            />
          </div>

          <AnimatePresence initial={false}>
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
            >
              <button
                className={cx(
                  global.buttoncenter,
                  promo.code.length === 8
                    ? styles.buttongreen
                    : styles.buttongrey
                )}
                disabled={activatePromocodeMutation.isLoading}
                onClick={() => {
                  setPromo({ ...promo, apply: false });
                  activatePromocodeMutation.mutate({
                    code: promo.code,
                  });
                }}
              >
                {activatePromocodeMutation.isLoading ? (
                  <>
                    <p className={global.text}>Загрузка</p>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.25, repeat: Infinity }}
                      className={global.load}
                    >
                      <IoSyncOutline className={global.svg} />
                    </motion.div>
                  </>
                ) : promo.code.length === 8 ? (
                  <>
                    <p className={global.text}>Применить</p>
                    <IoCheckmarkSharp className={global.icon} />
                  </>
                ) : (
                  <>
                    <IoArrowBackSharp className={global.icon} />
                    <p className={global.text}>Введите промокод</p>
                  </>
                )}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

export default Promocode;
