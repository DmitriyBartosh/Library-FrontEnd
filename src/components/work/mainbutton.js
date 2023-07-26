import React, { useState, useEffect } from 'react'
import cx from 'classname';
import Flowertwo from '../../images/svg/flower/flowertwo';
import * as styles from './mainbutton.module.scss';

function Mainbutton({ section, scroll, contentRef, theme }) {
  const [isHidden, setIsHidden] = useState(false);


  const scrollToSection = () => {
    contentRef.current.scrollTo({ top: 0, behavior: "instant" });
  };

  useEffect(() => {
    const size = section.current.getBoundingClientRect();

    let top = size?.top;
    let height = size?.height;

    // Отступ от которого секция в поле видимости верхней границы экрана считается активной
    const offset = -1 * (top - 31);

    // Если в верхняя граница находится в поле секции, то она активна и просчитываем прогресс для точки
    if (offset > 0 && offset < height + 31) {
      setIsHidden(false);
    } else setIsHidden(true);
  }, [section, scroll])


  return (
    <button className={cx(styles.container, isHidden && styles.hidden)} onClick={scrollToSection}>
      <div className={styles.text}>
        <h6>{theme}</h6>
      </div>
      <Flowertwo className={styles.flowerbottom} />
      <Flowertwo className={styles.flowertop} />
    </button>
  )
}

export default Mainbutton