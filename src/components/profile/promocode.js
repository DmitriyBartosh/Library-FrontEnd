import React, { useState } from "react";
import cx from "classname";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { IoCheckmarkSharp, IoSyncOutline } from "react-icons/io5";
import { activatePromoCode } from "../../functions/promocodes";

import * as global from "../../styles/base/global.module.scss";
import * as styles from "./promocode.module.scss";

function Promocode() {
  const [promo, setPromo] = useState({
    code: "",
    apply: false,
  });

  const queryClient = useQueryClient();

  const activatePromocodeMutation = useMutation({
    mutationFn: activatePromoCode,
    onSuccess: (res) => {
      setPromo({ ...promo, apply: true });
      queryClient.invalidateQueries({ queryKey: ["getAllSubscribes"] });
    },
  });

  return (
    <div className={styles.container}>
      <p className={styles.title}>Добавить промокод</p>
      {promo.apply ? (
        <div className={styles.result}>
          {activatePromocodeMutation.data.data.activate ? (
            <div className={styles.message}>
              <p className={styles.status}>Активирован</p>
              <p>{activatePromocodeMutation.data.data.message}</p>
            </div>
          ) : (
            <div className={styles.message}>
              <p className={styles.status}>Не активирован</p>
              <p>{activatePromocodeMutation.data.data.message}</p>
            </div>
          )}

          <button
            className={cx(global.buttontext, styles.buttongreen)}
            onClick={() => setPromo({ code: "", apply: false })}
          >
            {activatePromocodeMutation.data.data.activate ? (
              <p className={global.text}>Закрыть</p>
            ) : (
              <p className={global.text}>Попробовать другой</p>
            )}
          </button>
        </div>
      ) : (
        <>
          <div className={styles.block}>
            <div className={styles.field}>
              <input
                maxLength={8}
                placeholder="Поле для промокода"
                type="text"
                onChange={(e) =>
                  setPromo({ ...promo, code: e.target.value.toUpperCase() })
                }
              />
            </div>
          </div>
          <AnimatePresence initial={false}>
            {promo.code.length === 8 && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
              >
                <button
                  className={cx(global.buttoncenter, styles.buttongreen)}
                  disabled={activatePromocodeMutation.isLoading}
                  onClick={() =>
                    activatePromocodeMutation.mutate({
                      code: promo.code,
                    })
                  }
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
                  ) : (
                    <>
                      <p className={global.text}>Применить</p>
                      <IoCheckmarkSharp className={global.icon} />
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default Promocode;
