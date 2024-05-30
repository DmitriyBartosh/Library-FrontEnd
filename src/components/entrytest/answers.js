import React, { useState } from "react";
import cx from "classname";
import { IoArrowForwardSharp, IoArrowBackSharp } from "react-icons/io5";
import { useLocalStorage } from "react-use";
import { AnimatePresence, motion } from "framer-motion";

import TextEditor from "./texteditor";

import * as styles from "./answers.module.scss";
import * as global from "../../styles/base/global.module.scss";

function Answers({ data, answers, setAnswers }) {
  const [activeIndex, setActiveIndex] = useLocalStorage(
    "review_active_index",
    0
  );

  const countQuestions = data.length;

  return (
    <div className={styles.container}>
      {data
        .filter((item, index) => activeIndex === index)
        .map((item, index) => {
          return (
            <div
              className={styles.item}
              key={`question_${activeIndex}_${index}`}
            >
              <p className={styles.title}>{item}</p>

              <TextEditor
                setText={setAnswers}
                text={answers}
                index={activeIndex}
              />
            </div>
          );
        })}

      <div className={styles.navigation}>
        <button
          className={cx(
            global.buttonicon,
            global.buttongreen,
            activeIndex === 0 && styles.disabled
          )}
          onClick={() => setActiveIndex(activeIndex - 1)}
        >
          <IoArrowBackSharp className={global.icon} />
        </button>
        <div className={styles.count}>
          <p>
            {activeIndex + 1} / {countQuestions}
          </p>
        </div>
        <button
          className={cx(
            global.buttoncenter,
            global.buttongreen,
            activeIndex === countQuestions - 1 && styles.hidden
          )}
          onClick={() => setActiveIndex(activeIndex + 1)}
        >
          <p className={global.text}>Следующий вопрос</p>
          <IoArrowForwardSharp className={global.icon} />
        </button>
      </div>
    </div>
  );
}

export default Answers;
