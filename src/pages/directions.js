import React, { useEffect, useState } from 'react'
import cx from 'classname';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useStateContext } from '../context/ContextProvider'
import { changeDirection } from '../functions/user'
import { checkBooleanObjectKeys } from '../functions/other';
import * as styles from '../styles/pages/directions.module.scss'
import * as global from '../styles/base/global.module.scss'
import { navigate } from 'gatsby';



const dataTheme = {
  design: {
    title: 'Графический дизайн',
    about: "В этом направлении вы научитесь работать с различными инструментами и программами для создания красивых и функциональных дизайнов. Вы также будете изучать теорию цвета, композицию и типографику, чтобы создавать эффективные графические решения для любого проекта.",
    status: true
  },
  frontend: {
    title: 'FrontEnd разработка',
    about: 'В этом направлении вы научитесь работать с различными языками программирования, такими как HTML, CSS и JavaScript, чтобы создавать красивые и функциональные веб-сайты. Вы также будете изучать теорию дизайна интерфейсов и оптимизации сайтов для улучшения пользовательского опыта. В результате вы станете специалистом в области FrontEnd разработки и сможете создавать современные и удобные веб-приложения для любого проекта.',
    status: true
  },
  photo: {
    title: 'Фотография',
    about: 'В этом направлении вы научитесь работать с камерами, светом и обработкой фотографий, чтобы создавать профессиональные и качественные фотографии. Вы также будете изучать теорию композиции и цвета, чтобы создавать уникальные и запоминающиеся фотографии. В результате вы станете специалистом в области фотографии и сможете создавать красивые и эмоциональные фотографии для любого проекта.',
    status: false
  }
}

function Directions() {
  const [isLoading, setIsLoading] = useState(null);
  const queryClient = useQueryClient();
  const { statusDirection, setStatusDirection } = useStateContext();

  const changeDirectionMutation = useMutation({
    mutationFn: changeDirection,
    onSuccess: (data) => {
      setIsLoading(null);
      setStatusDirection(data.success);
      queryClient.invalidateQueries({ queryKey: ['getDirections'] })

      // Если хоть какое то направление с true, то редирект на страницу профиля
      if (statusDirection !== null && checkBooleanObjectKeys(statusDirection)) {
        navigate('/profile');
      }
    }
  })



  function updateDirection(theme, status) {
    setIsLoading(theme);
    const object = statusDirection;
    object[theme] = !status;
    changeDirectionMutation.mutate({ object })
  }

  useEffect(() => {
    // Если пользователь заходит впервые, ему присваиваются все направления как False
    if (statusDirection === null) {
      const directionObject = {}
      for (let key in dataTheme) {
        directionObject[key] = false;
      }
      setStatusDirection(directionObject)
    } else return;


  }, [statusDirection])


  return (
    <section className={styles.container}>
      <div className={global.container}>
        <div className={styles.title}>
          <h1>Добавляй или удаляй направление из своего профиля</h1>
          <p>Весь прогресс будет сохранен и в будущем вы можете вернуть направление обратно</p>
        </div>

        <div className={styles.list}>
          {Object.keys(dataTheme).map((key, index) => {
            const { title, about, status } = dataTheme[key];
            const directionStatus = statusDirection && (statusDirection !== null ? statusDirection[key] : false);

            const loading = isLoading !== null ? (isLoading === key ? true : false) : false;

            return <div className={styles.block} key={`direction_${index}`}>
              <div className={styles.info}>
                <h4>{title}</h4>
                <div className={styles.body}>
                  <p>{about}</p>
                </div>
              </div>
              <div className={styles.action}>
                {statusDirection ?
                  <button
                    onClick={() => updateDirection(key, statusDirection[key])}
                    disabled={changeDirectionMutation.isLoading}
                    className={cx(status ? directionStatus ? styles.remove : styles.add : styles.hidden, loading && styles.loading)}>
                    {status ? directionStatus ? loading ? "Добавляем направление" : "Скрыть направление" : loading ? "Скрываем направление" : "Добавить направление" : "Направление в разработке"}
                  </button>
                  :
                  <button disabled={true} className={styles.remove}>
                    Загрузка...
                  </button>
                }
              </div>
            </div>
          })}
        </div>
      </div>
    </section>
  )
}

export default Directions