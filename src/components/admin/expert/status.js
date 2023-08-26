import React, { useEffect, useState } from 'react'
import cx from 'classname'
import { motion, AnimatePresence } from 'framer-motion';
import { IoArrowForwardSharp } from 'react-icons/io5';
import Save from './save';
import * as styles from './status.module.scss';

function Status({ olddata, expert, setExpert }) {
  const [showSave, setShowSave] = useState(false)

  const convertDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ];
    const month = monthNames[date.getMonth()];
    const formatted = `${date.getDate()} ${month}`;

    return formatted;
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    const formatted = convertDate(value);
    setExpert({ ...expert, backtowork: formatted });
  };

  useEffect(() => {
    if (olddata.status === expert.status && olddata.backtowork === expert.backtowork) {
      setShowSave(false)
    } else {
      setShowSave(true)
    }
  }, [expert, olddata])


  return (
    <div className={styles.container}>
      <div className={styles.status}>
        <div className={styles.toggle}>
          <button className={cx(styles.block, expert.status ? styles.online : styles.offline)} onClick={() => setExpert({ ...expert, status: !expert.status })}>
            {expert.status ?
              <p>В сети</p>
              :
              <p>Не в сети</p>
            }
            <IoArrowForwardSharp className={styles.icon} />
          </button>
          <button className={cx(styles.button, expert.status ? styles.online : styles.offline)} data-status={expert.status} onClick={() => setExpert({ ...expert, status: !expert.status })} >
            <motion.div
              className={styles.handle}
              layout
              transition={{ type: "spring", stiffness: 700, damping: 30 }} />
          </button>

        </div>
        <AnimatePresence initial={false} mode='popLayout'>
          {!expert.status &&
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.2, delay: 0.25 } }}
              exit={{ opacity: 0 }}
              className={styles.timetoback}>
              {expert.backtowork === "" ?
                <p className={styles.hint}>Дата возвращения</p>
                :
                <p className={styles.hint}>Вернусь <span>{expert.backtowork}</span></p>
              }

              <input
                type="date"
                disabled={expert.status}
                value={expert.backtowork}
                onChange={handleDateChange}
                className={styles.datepicker}
              />
            </motion.div>
          }
        </AnimatePresence>
      </div>
      <AnimatePresence initial={false}>
        {showSave && <Save olddata={olddata} expert={expert} />}
      </AnimatePresence>
    </div>
  )
}

export default Status