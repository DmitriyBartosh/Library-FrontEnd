import React from "react";
import cx from "classname";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Dprofile from "../../images/social/dprofile";

import * as global from "../../styles/base/global.module.scss";
import * as styles from "./preview.module.scss";

function Preview({ data }) {
  const { text, expert, profession, author, preview, social } = data;
  const previewImage = getImage(preview);

  const icons = [
    {
      name: "dprofile",
      icon: <Dprofile className={global.icon} />,
    },
  ];

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

        <div className={styles.social}>
          {social.map((item, index) => {
            const { name, url, nick } = item;
            const icon = icons.find((item) => item.name === name).icon;

            return (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                key={`social_${index}`}
                className={cx(global.buttoncenter, styles.buttonbeige)}
              >
                {icon}
                <p className={global.text}>{nick}</p>
              </a>
            );
          })}
        </div>
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
