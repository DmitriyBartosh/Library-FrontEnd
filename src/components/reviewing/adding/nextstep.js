import React from "react";
import { motion } from "framer-motion";
import cx from "classname";
import { IoArrowForwardSharp, IoSyncOutline } from "react-icons/io5";

import * as global from "../../../styles/base/global.module.scss";
import * as styles from "./nextstep.module.scss";

function Nextstep({ review, nextStep, addWorkToReviewMutation }) {
  const next =
    (review.select === "work" && review.works.length > 0) ||
    (review.select === "expert" && review.expert !== null);

  return (
    <div className={styles.container}>
      <button
        disabled={addWorkToReviewMutation.isLoading}
        className={cx(global.buttoncenter, next ? styles.next : styles.select)}
        onClick={() => nextStep()}
      >
        {next ? (
          <p className={global.text}>
            {review.select === "work" && "Продолжить"}
            {review.select === "expert" && `Продолжить / ${review.price} руб.`}
          </p>
        ) : (
          <p className={global.text}>
            {review.select === "work" && "Выбери работы"}
            {review.select === "expert" && "Выбери эксперта"}
          </p>
        )}
        {addWorkToReviewMutation.isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.25, repeat: Infinity }}
            className={global.load}
          >
            <IoSyncOutline className={global.svg} />
          </motion.div>
        ) : (
          <IoArrowForwardSharp className={global.icon} />
        )}
      </button>
    </div>
  );
}

export default Nextstep;
