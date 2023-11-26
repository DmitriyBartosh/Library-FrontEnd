import React from "react";
import { Link } from "gatsby";
import { motion } from "framer-motion";

import * as styles from "./mobilenav.module.scss";

function Linkmobile(props) {
  const MotionLink = motion(Link);

  const variantsLink = {
    initial: {
      y: 8,
      opacity: 0,
    },
    animate: (custom) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.2 + custom * 0.04 },
    }),
    exit: {
      opacity: 0,
    },
  };

  return (
    <MotionLink
      variants={variantsLink}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={props.index}
      to={props.link}
      partiallyActive={props.partiallyActive}
      activeClassName={styles.active}
      className={styles.link}
      onClick={() => props.setVisible(false)}
    >
      <p className={styles.title}>{props.title}</p>
      <p className={styles.description}>{props.description}</p>
    </MotionLink>
  );
}

export default Linkmobile;
