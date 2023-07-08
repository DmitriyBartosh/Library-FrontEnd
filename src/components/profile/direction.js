import React, { useState } from 'react'

import { Link } from 'gatsby';
import { AnimatePresence, motion } from 'framer-motion'
import { IoArrowForwardSharp } from "react-icons/io5";
import Subscribe from './subscribe';
import * as styles from './direction.module.scss';
import * as global from '../../styles/base/global.module.scss';

function Direction({ data }) {
  const [selected, setSelected] = useState(data.works[0]);

  const { title, works, slug } = data;

  const MotionLink = motion(Link);

  return (
    <div className={styles.container}>
      <div className={global.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h3>{title}</h3>
          </div>
          <Subscribe status={true} />
        </div>

        <div className={styles.progress}>
          <div className={styles.works}>

            <div className={styles.list}>
              {works.map((item, index) => {
                const { title } = item;

                const isActive = title === selected.title;

                return <div className={styles.item} key={index}>

                  <motion.button
                    initial={{ background: "#f3eee1", color: "#43702c" }}
                    animate={{
                      background: isActive ? "#43702c" : "#f3eee1",
                      color: isActive ? "#ffffff" : "#43702c"
                    }}
                    className={styles.detail}
                    onClick={() => setSelected(item)}>
                    <p className={styles.text}>{title}</p>
                  </motion.button>

                  <MotionLink
                    initial={{ width: 0 }}
                    animate={{ width: isActive ? "125px" : "0px" }}
                    to={"/" + slug + "/" + item.slug}
                    className={styles.link}
                  >
                    <AnimatePresence>
                      {isActive &&
                        <motion.p
                          initial={{ x: -25, opacity: 0 }}
                          animate={{ x: 0, opacity: 1, transition: { delay: 0.15 } }}
                          exit={{ x: -15, opacity: 0 }}
                          className={styles.text}>
                          Начать
                        </motion.p>
                      }
                    </AnimatePresence>
                    <IoArrowForwardSharp className={styles.icon} />
                  </MotionLink>

                </div>
              })}
            </div>
            <div className={styles.advenced}>
              <div className={styles.description}>
                <p>{selected.description}</p>
              </div>

              <div className={styles.theme}>
                {selected?.order.section.map((item, index) => {
                  return <p key={index}>#{item}</p>
                })}
              </div>

              <div className={styles.complete}>
                <p className={styles.title}>Прикрепленные работы:</p>
                <div className={styles.link}>
                  <p>1. https://www.figma.com/file/ik8PvmO5V0gmTKqR746gXd/Hey%2C-Coddes-%2F-Portfolio?type=design&node-id=1793%3A761&mode=design&t=N6tKs053FjCUuVlc-1</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Direction;