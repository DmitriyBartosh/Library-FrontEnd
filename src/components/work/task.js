import React, { forwardRef } from "react";
import cx from "classname";

import * as styles from "./task.module.scss";

const Task = forwardRef((props, ref) => {
  const { data, selected, setSelected } = props;

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.choise}>
        <p className={styles.title}>Выберите задание:</p>
        <div className={styles.collection}>
          {data.map((item, index) => {
            const { title, complexity, time } =
              item.node.childMarkdownRemark.frontmatter;
            const { html, frontmatter } = item.node.childMarkdownRemark;

            return (
              <button
                className={cx(
                  styles.item,
                  selected.title === frontmatter.title && styles.active
                )}
                key={index}
                onClick={() =>
                  setSelected({
                    frontmatter: frontmatter,
                    html: html,
                    title: frontmatter.title,
                  })
                }
              >
                <div className={styles.name}>
                  <p>{title}</p>
                </div>
                <div className={styles.level}>
                  <p>
                    Сложность: <span>{complexity}</span>
                  </p>
                  <p>
                    Время выполнения: <span>{time}</span>
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default Task;
