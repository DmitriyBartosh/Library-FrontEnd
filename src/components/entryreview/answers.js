import React from "react";
import cx from "classname";
import { IoArrowForwardSharp, IoArrowBackSharp } from "react-icons/io5";

import TextEditor from "./texteditor";

import * as styles from "./answers.module.scss";
import * as global from "../../styles/base/global.module.scss";

function Answers({ data, review, setReview }) {
  const countQuestions = data.length;

  return (
    <div className={styles.container}>
      {data
        .filter((item, index) => review.index === index)
        .map((item, index) => {
          return (
            <div
              className={styles.item}
              key={`question_${review.index}_${index}`}
            >
              <p className={styles.title}>{item}</p>

              <TextEditor
                setReview={setReview}
                review={review}
                index={review.index}
              />
            </div>
          );
        })}

      <div className={styles.navigation}>
        <button
          className={cx(
            global.buttonicon,
            global.buttongreen,
            review.index === 0 && styles.disabled
          )}
          onClick={() => setReview({ ...review, index: review.index - 1 })}
        >
          <IoArrowBackSharp className={global.icon} />
        </button>
        <div className={styles.count}>
          <p>
            {review.index + 1} / {countQuestions}
          </p>
        </div>
        <button
          className={cx(
            global.buttoncenter,
            global.buttongreen,
            review.index === countQuestions - 1 && styles.hidden
          )}
          onClick={() => setReview({ ...review, index: review.index + 1 })}
        >
          <p className={global.text}>Следующий вопрос</p>
          <IoArrowForwardSharp className={global.icon} />
        </button>
      </div>
    </div>
  );
}

export default Answers;
