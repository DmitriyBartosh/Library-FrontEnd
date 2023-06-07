import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import cx from 'classname'
import * as styles from './aboutauthor.module.scss'
import * as global from '../../styles/base/global.module.scss'


function Aboutauthor({ data, alt }) {
  const { photo, about, photos } = data;

  const photoImage = getImage(photo);

  return (
    <div className={cx(styles.container, global.container)}>

      <div className={styles.photo}>
        <GatsbyImage image={photoImage} alt={alt} className={styles.gatsbyimage} />
      </div>

      <div className={styles.right}>
        <div className={styles.about}>
          <h3>об авторе</h3>
          <h6>Привет!</h6>
          <p dangerouslySetInnerHTML={{ __html: about }} />
        </div>
        <div className={styles.images}>
          {photos.map((item, index) => {
            const photosImage = getImage(item.childrenImageSharp[0]);

            return <GatsbyImage image={photosImage} alt={alt} key={index} className={styles.gatsbyimage} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Aboutauthor