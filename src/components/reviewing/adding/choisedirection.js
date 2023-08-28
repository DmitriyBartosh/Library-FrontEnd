import React from 'react'
import * as styles from './choisedirection.module.scss'

function Choisedirection({ directionWithWork, directionData, selectedDirection, changeDirection }) {
  return (
    <div className={styles.container} style={{ display: directionWithWork.length === 1 && 'none' }}>
      <h5>{selectedDirection && selectedDirection.title}</h5>
      {directionWithWork.filter(item => item !== selectedDirection.slug).map((item) => {
        const direction = directionData.find(dir => dir.node.slug === item).node;

        return <button className={styles.change} key={`change${direction.slug}`} onClick={() => changeDirection(direction)}>
          Изменить на <span>{direction.title}</span>
        </button>
      })}
    </div>
  )
}

export default Choisedirection