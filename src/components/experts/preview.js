import React from 'react'
import cx from 'classname'
import * as styles from './preview.module.scss'
import * as button from '../../styles/base/button.module.scss'
import * as global from '../../styles/base/global.module.scss'
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

function Preview({ data }) {
  const { about, author, profession, preview } = data;
  const previewImage = getImage(preview)

  return (
    <>
      <div className={cx(styles.container, global.container)}>
        <div className={styles.left}>
          <div className={styles.title}>
            <h3 dangerouslySetInnerHTML={{ __html: profession }} />
            <p className={styles.author}>Автор - {author}</p>
          </div>

          <p className={styles.about} dangerouslySetInnerHTML={{ __html: about }} />

          <div className={styles.action}>
            <button className={button.orange}>Подписаться</button>
            <button className={button.transparent}>Статьи от автора</button>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.photo}>
            <GatsbyImage image={previewImage} alt={author} className={styles.gatsbyimg} />
          </div>
        </div>
      </div>

      <div className={styles.detail}>
        <div className={cx(styles.four, global.container)}>
          <div className={styles.block}>
            <p className={styles.title}>
              нагрузка
            </p>
            <p className={styles.description}>3-4 часа в неделю</p>
          </div>
          <div className={styles.block}>
            <p className={styles.title}>
              старт
            </p>
            <p className={styles.description}>по подписке</p>
          </div>
          <div className={styles.block}>
            <p className={styles.title}>
              длительность
            </p>
            <p className={styles.description}>1 месяц</p>
          </div>
          <div className={styles.block}>
            <p className={styles.title}>
              кол-во проектов
            </p>
            <p className={cx(styles.description, styles.orange)}>10 работ</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Preview