import React from "react";
import * as styles from "./choisedirection.module.scss";

function Choisedirection({
  directionWithWork,
  directionData,
  changeDirection,
  review,
}) {
  const title = directionData.find(
    (item) => item.node.slug === review.direction
  ).node.title;

  return (
    <div
      className={styles.container}
      style={{ display: directionWithWork.length === 1 && "none" }}
    >
      <h5>{title}</h5>
      {directionWithWork
        .filter((item) => item !== review.direction)
        .map((item) => {
          const direction = directionData.find(
            (dir) => dir.node.slug === item
          ).node;

          return (
            <button
              className={styles.change}
              key={`change${direction.slug}`}
              onClick={() => changeDirection(direction.slug)}
            >
              Изменить на <span>{direction.title}</span>
            </button>
          );
        })}
    </div>
  );
}

export default Choisedirection;
