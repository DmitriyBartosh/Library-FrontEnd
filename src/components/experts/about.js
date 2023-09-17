import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import cx from "classname";
import * as styles from "./about.module.scss";
import * as global from "../../styles/base/global.module.scss";

function About({ data, alt }) {
  const { photo, about, photos, other_photos, service, title, description } =
    data;

  const photoImage = getImage(photo);

  console.log(data);

  return (
    <section className={cx(styles.container, global.container)}>
      <div className={styles.info}>
        <div className={styles.photo}>
          <GatsbyImage
            image={photoImage}
            alt={`Эксперт ${alt}`}
            className={styles.gatsbyimage}
          />
        </div>

        <div className={styles.right}>
          <div className={styles.about}>
            <h3>Чем я могу тебе помочь?</h3>
            <div
              dangerouslySetInnerHTML={{ __html: about }}
              className={styles.list}
            />
          </div>
          <div className={styles.images}>
            {photos.map((item, index) => {
              const photosImage = getImage(item.childImageSharp);

              return (
                <GatsbyImage
                  image={photosImage}
                  alt={alt}
                  key={index}
                  className={styles.gatsbyimage}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.analysis}>
        <h3>{service}</h3>
        <div className={styles.about}>
          <div className={styles.left}>
            <p>{title}</p>
          </div>
          <div className={styles.right}>
            <p>
              <span>{service}</span> - {description}
            </p>
          </div>
        </div>
        <div className={styles.photos}>
          {other_photos.map((item, index) => {
            const imageUrl = getImage(item.childImageSharp);

            return (
              <div className={styles.item} key={index}>
                <GatsbyImage
                  image={imageUrl}
                  className={styles.gatsbyimage}
                  alt={alt}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default About;
