import React from "react";
import cx from "classname";
import { motion } from "framer-motion";
import { IoAddSharp, IoLinkSharp, IoCheckmarkSharp } from "react-icons/io5";
import { convertDate } from "../../../functions/other";

import * as styles from "./profile.module.scss";

function Profile({ data, index, review, setReview }) {
  const { id, price, name, about, status, avatar, backtowork, slug } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 + index * 15 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: 0.3 + index * 0.1, duration: 0.4 },
      }}
      className={cx(
        styles.container,
        !status && styles.offline,
        data.id === review.expert?.id && styles.selected
      )}
    >
      <a href={`/expert/${slug}`} target="_blank" className={styles.avatar}>
        <img
          src={`${process.env.GATSBY_API_BASE_URL}${avatar}`}
          className={styles.image}
          alt={`Эксперт ${name}`}
        />
        <div className={styles.hint}>
          <p>
            Открыть
            <br />
            страницу
            <br />
            эксперта
          </p>
          <IoLinkSharp className={styles.icon} />
        </div>
      </a>

      <button
        disabled={!status}
        onClick={() =>
          setReview({ ...review, expert: { id: id, price: price } })
        }
        className={styles.info}
      >
        <div className={styles.head}>
          <p className={styles.name}>{name}</p>
          <p className={styles.about}>{about}</p>
        </div>
        <div className={styles.action}>
          {status ? (
            data.id === review.expert?.id ? (
              <div className={styles.select}>
                <IoCheckmarkSharp className={styles.icon} />
              </div>
            ) : (
              <div className={styles.select}>
                <p className={styles.text}>Выбрать эксперта</p>
                <IoAddSharp className={styles.icon} />
              </div>
            )
          ) : (
            <div className={styles.status}>
              <p className={styles.text}>
                Вернется: <span>{convertDate(backtowork)}</span>
              </p>
            </div>
          )}
        </div>
      </button>
    </motion.div>
  );
}

export default Profile;
