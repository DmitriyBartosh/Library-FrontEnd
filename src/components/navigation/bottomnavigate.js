import React, { useState } from "react";
import { Link } from "gatsby";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import cx from "classname";
import {
  IoAddSharp,
  IoArrowBackSharp,
  IoChatbubbleOutline,
  IoCreateOutline,
} from "react-icons/io5";

import * as styles from "./mobilenav.module.scss";

function Bottomnavigate({ addWork, thereIsWork, openFeetback }) {
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();

  const isStandalone =
    typeof window !== "undefined" && window.navigator.standalone;

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (latest > previous && latest > 300) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      className={cx(styles.bottom, isStandalone && styles.standalone)}
      animate={{ y: hidden ? "100%" : "0%" }}
      transition={{ duration: isStandalone ? 0.6 : 0.4, ease: "easeInOut" }}
    >
      <div className={styles.block}>
        <Link to="/portfolio" className={styles.button}>
          <IoArrowBackSharp className={styles.icon} />
        </Link>
      </div>
      <div className={styles.block}>
        <button
          className={styles.button}
          aria-label="Обратная связь"
          onClick={openFeetback}
        >
          <IoChatbubbleOutline className={styles.icon} />
        </button>

        <button className={styles.addwork} onClick={addWork}>
          {thereIsWork ? (
            <>
              <p className={styles.text}>Изменить ссылку</p>
              <IoCreateOutline className={styles.icon} />
            </>
          ) : (
            <>
              <p className={styles.text}>Добавить работу</p>
              <IoAddSharp className={styles.icon} />
            </>
          )}
        </button>
      </div>
    </motion.nav>
  );
}

export default Bottomnavigate;
