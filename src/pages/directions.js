import React, { useState } from 'react'
import cx from 'classname'
import { useStateContext } from '../context/ContextProvider'
import { changeDesign, changeFrontend, changePhoto } from '../api/direction'
import * as styles from '../styles/pages/directions.module.scss'
import * as global from '../styles/base/global.module.scss'


function DesignButton({ name, style }) {
  const { updateStatus, statusDirection, setStatusDirection } = useStateContext();
  const [isLoading, setIsLoading] = useState(false)

  return <button
    className={cx(style, isLoading && styles.loading)}
    onClick={() => changeDesign(updateStatus, statusDirection, setStatusDirection, setIsLoading)}>
    {isLoading ? "Меняем статус" : name}
  </button>
}

function FrontendButton({ name, style }) {
  const { updateStatus, statusDirection, setStatusDirection } = useStateContext();
  const [isLoading, setIsLoading] = useState(false)

  return <button
    className={cx(style, isLoading && styles.loading)}
    onClick={() => changeFrontend(updateStatus, statusDirection, setStatusDirection, setIsLoading)}>
    {isLoading ? "Меняем статус" : name}
  </button>
}

function PhotoButton({ name, style }) {
  const { updateStatus, statusDirection, setStatusDirection } = useStateContext();
  const [isLoading, setIsLoading] = useState(false)

  return <button
    className={cx(style, isLoading && styles.loading)}
    onClick={() => changePhoto(updateStatus, statusDirection, setStatusDirection, setIsLoading)}>
    {isLoading ? "Меняем статус" : name}
  </button>
}



function Directions() {
  const { updateStatus, statusDirection, setStatusDirection } = useStateContext();



  return (
    <section className={styles.container}>
      <div className={global.container}>
        <div className={styles.title}>
          <h1>Добавляй или удаляй направление из своего профиля</h1>
          <p>Весь прогресс будет сохранен и в будущем вы можете вернуть направление обратно</p>
        </div>

        <div className={styles.list}>
          <div className={styles.block}>
            <div className={styles.info}>
              <h4>Графический дизайн</h4>
              <div className={styles.body}>
                <p>В этом направлении вы научитесь работать с различными инструментами и программами для создания красивых и функциональных дизайнов. Вы также будете изучать теорию цвета, композицию и типографику, чтобы создавать эффективные графические решения для любого проекта.</p>
              </div>
            </div>
            <div className={styles.action}>
              {statusDirection?.design ?
                <DesignButton name="Скрыть направление" style={styles.remove} />
                :
                <DesignButton name="Добавить направление" style={styles.add} />
              }
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.info}>
              <h4>FrontEnd разработка</h4>
              <p>В этом направлении вы научитесь работать с различными языками программирования, такими как HTML, CSS и JavaScript, чтобы создавать красивые и функциональные веб-сайты. Вы также будете изучать теорию дизайна интерфейсов и оптимизации сайтов для улучшения пользовательского опыта. В результате вы станете специалистом в области FrontEnd разработки и сможете создавать современные и удобные веб-приложения для любого проекта.</p>
            </div>
            <div className={styles.action}>
              {statusDirection?.frontend ?
                <FrontendButton name="Скрыть направление" style={styles.remove} />
                :
                <FrontendButton name="Добавить направление" style={styles.add} />
              }
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.info}>
              <h4>Фотография</h4>
              <p>В этом направлении вы научитесь работать с камерами, светом и обработкой фотографий, чтобы создавать профессиональные и качественные фотографии. Вы также будете изучать теорию композиции и цвета, чтобы создавать уникальные и запоминающиеся фотографии. В результате вы станете специалистом в области фотографии и сможете создавать красивые и эмоциональные фотографии для любого проекта.</p>
            </div>
            <div className={styles.action}>
              {statusDirection?.photo ?
                <PhotoButton name="Скрыть направление" style={styles.remove} funcion={() => changePhoto(updateStatus, statusDirection, setStatusDirection)} />
                :
                <PhotoButton name="Добавить направление" style={styles.add} funcion={() => changePhoto(updateStatus, statusDirection, setStatusDirection)} />
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Directions