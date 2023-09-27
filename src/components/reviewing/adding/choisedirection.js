import React from "react";
import * as styles from "./choisedirection.module.scss";

function Choisedirection({
  directionWithWork,
  directionData,
  selectedDirection,
  changeDirection,
}) {
  const title = directionData.find(
    (item) => item.node.slug === selectedDirection
  ).node.title;

  return (
    <div
      className={styles.container}
      style={{ display: directionWithWork.length === 1 && "none" }}
    >
      <h5>{title}</h5>
      {directionWithWork
        .filter((item) => item !== selectedDirection)
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
