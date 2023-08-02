import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { IoArrowBackSharp } from "react-icons/io5";
import { getAdminSettings } from '../../../functions/designexpert'
import * as styles from './profile.module.scss'
import Toggle from './toggle';

function Profile() {
  const [edited, setEdited] = useState(true);
  const [user, setUser] = useState({
    name: "",
    status: false,
    timetowork: ""
  })

  const [price, setPrice] = useState({
    logo: 1000,
    polygraphy: 1000,
    socialmedia: 1000,
    poster: 1000
  })

  const adminSettingsQuery = useQuery({
    queryKey: ["getadminsettings"],
    queryFn: getAdminSettings,
    onSuccess: (data) => {
      setPrice({
        logo: data.settings.logo,
        polygraphy: data.settings.polygraphy,
        socialmedia: data.settings.socialmedia,
        poster: data.settings.poster
      })
      setUser({
        name: data.name,
        status: data.settings.status,
        timetowork: data.settings.timetowork
      })
    }
  })

  const { isLoading, data } = adminSettingsQuery;

  return (
    <div className={styles.container}>

      <h4>Эксперт | Графический дизайн</h4>
      {isLoading ?
        <div className={styles.profile}>
          <p>Загрузка профиля...</p>
        </div>
        :
        <div className={styles.profile}>

          <div className={styles.info}>
            <div className={styles.head}>
              <h5>Настройки профиля</h5>
            </div>
            <div className={styles.block}>
              <div className={styles.area}>
                <input
                  placeholder='Имя / Фамилия'
                  disabled={!edited}
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
              <div className={styles.label}>
                <IoArrowBackSharp className={styles.icon} />
                <p>Имя / Фамилия</p>
              </div>
            </div>

            <div className={styles.block}>
              <Toggle user={user} setUser={setUser} />
              <div className={styles.label}>
                <IoArrowBackSharp className={styles.icon} />
                <p>На проверку работы</p>
              </div>
            </div>

            <div className={styles.block}>
              <div className={styles.area}>
                <input
                  placeholder='1-3 дня'
                  disabled={!edited}
                  value={user.timetowork}
                  onChange={(e) => setUser({ ...user, timetowork: e.target.value })}
                />
              </div>
              <div className={styles.label}>
                <IoArrowBackSharp className={styles.icon} />
                <p>Время проверки</p>
              </div>
            </div>
          </div>



          <div className={styles.price}>
            <div className={styles.head}>
              <h5>Цены за проверку</h5>
            </div>

            <div className={styles.list}>
              <div className={styles.block}>
                <div className={styles.title}>
                  <p>Логотип</p>
                </div>
                <div className={styles.input}>
                  <input
                    placeholder='Цена услуги в '
                    disabled={!edited}
                    type='number'
                    value={price.logo}
                    onChange={(e) => setPrice({ ...price, logo: e.target.value })} />
                  <p>руб.</p>
                </div>
              </div>

              <div className={styles.block}>
                <div className={styles.title}>
                  <p>Полиграфия</p>
                </div>
                <div className={styles.input}>
                  <input
                    placeholder='Цена услуги в '
                    disabled={!edited}
                    type='number'
                    value={price.polygraphy}
                    onChange={(e) => setPrice({ ...price, polygraphy: e.target.value })} />
                  <p>руб.</p>
                </div>
              </div>

              <div className={styles.block}>
                <div className={styles.title}>
                  <p>Постер</p>
                </div>
                <div className={styles.input}>
                  <input
                    placeholder='Цена услуги в '
                    disabled={!edited}
                    type='number'
                    value={price.poster}
                    onChange={(e) => setPrice({ ...price, poster: e.target.value })} />
                  <p>руб.</p>
                </div>
              </div>

              <div className={styles.block}>
                <div className={styles.title}>
                  <p>Социальные сети</p>
                </div>
                <div className={styles.input}>
                  <input
                    placeholder='Цена услуги в '
                    disabled={!edited}
                    type='number'
                    value={price.socialmedia}
                    onChange={(e) => setPrice({ ...price, socialmedia: e.target.value })} />
                  <p>руб.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      }
    </div>
  )
}

export default Profile