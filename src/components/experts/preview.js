import React from "react";
import cx from "classname";
import * as styles from "./preview.module.scss";
import * as global from "../../styles/base/global.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

function Preview({ data }) {
  const { text, expert, profession, author, preview } = data;
  const previewImage = getImage(preview);

  return (
    <section className={cx(styles.container, global.container)}>
      <div className={styles.left}>
        <p className={styles.expert}>
          Эксперт - <span>{expert}</span>
        </p>
        <h3 dangerouslySetInnerHTML={{ __html: profession }} />
        {author && <p className={styles.author}>Автор направления</p>}

        <div
          className={styles.about}
          dangerouslySetInnerHTML={{ __html: text }}
        />

        <div className={styles.social}></div>
      </div>
      <div className={styles.right}>
        <div className={styles.photo}>
          <GatsbyImage
            image={previewImage}
            alt={`Эксперт ${expert}`}
            className={styles.gatsbyimg}
          />
        </div>
      </div>
    </section>
  );
}

export default Preview;
