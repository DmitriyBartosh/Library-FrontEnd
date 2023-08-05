import React, { useState, useEffect } from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { IoArrowBackSharp, IoReturnDownBackSharp } from "react-icons/io5";
import { getAdminSettings, editSettingsAdmin } from '../../../functions/designexpert'
import * as styles from './profile.module.scss'
import Toggle from './toggle';
import Savebutton from './savebutton';

function Profile() {
  const [saved, setSaved] = useState(false)
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

  const queryClient = useQueryClient()

  const adminSettingsQuery = useQuery({
    queryKey: ["getadminsettings"],
    queryFn: getAdminSettings,
    onSuccess: (data) => {
      setData(data);
    }
  })

  const editSettingsAdminMutation = useMutation({
    mutationFn: editSettingsAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getadminsettings'] })
    }
  })

  function setData(data) {
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

  const { isLoading, data } = adminSettingsQuery;



  useEffect(() => {
    if (adminSettingsQuery.isSuccess) {
      const saveSettings = data.name !== user.name || data.settings.status !== user.status || data.settings.timetowork !== user.timetowork;
      const savePrice = data.settings.logo !== price.logo ||
        data.settings.polygraphy !== price.polygraphy ||
        data.settings.socialmedia !== price.socialmedia ||
        data.settings.poster !== price.poster;

      setSaved(saveSettings || savePrice);
    }
  }, [adminSettingsQuery])


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
                    type='number'
                    value={price.logo}
                    onChange={(e) => setPrice({ ...price, logo: e.target.value })} />
                </div>
              </div>

              <div className={styles.block}>
                <div className={styles.title}>
                  <p>Полиграфия</p>
                </div>
                <div className={styles.input}>
                  <input
                    placeholder='Цена услуги в '
                    type='number'
                    value={price.polygraphy}
                    onChange={(e) => setPrice({ ...price, polygraphy: e.target.value })} />
                </div>
              </div>

              <div className={styles.block}>
                <div className={styles.title}>
                  <p>Постер</p>
                </div>
                <div className={styles.input}>
                  <input
                    placeholder='Цена услуги в '
                    type='number'
                    value={price.poster}
                    onChange={(e) => setPrice({ ...price, poster: e.target.value })} />
                </div>
              </div>

              <div className={styles.block}>
                <div className={styles.title}>
                  <p>Социальные сети</p>
                </div>
                <div className={styles.input}>
                  <input
                    placeholder='Цена услуги в '
                    type='number'
                    value={price.socialmedia}
                    onChange={(e) => setPrice({ ...price, socialmedia: e.target.value })} />
                </div>
              </div>
            </div>
          </div>


        </div>
      }
      {saved &&
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.3 } }}
          key="saved_profile_expert"
          className={styles.save}>
          <Savebutton action={editSettingsAdminMutation} user={user} price={price} />
          <button className={styles.cancel} onClick={() => setData(data)}>
            <p className={styles.text}>Отменить изменения</p>
            <div className={styles.icon}>
              <IoReturnDownBackSharp className={styles.svg} />
            </div>
          </button>
        </motion.div>
      }

    </div>
  )
}

export default Profile