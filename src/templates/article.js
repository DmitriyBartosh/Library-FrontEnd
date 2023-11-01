import React from "react";
import { Link } from "gatsby";
import cx from "classname";
import {
  IoTimeOutline,
  IoCalendarOutline,
  IoArrowBackSharp,
} from "react-icons/io5";
import { SlSocialVkontakte } from "react-icons/sl";
import { FaTelegramPlane } from "react-icons/fa";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { convertDateJson } from "../functions/other";
import Topnavigate from "../components/navigation/topnavigate";
import Footer from "../components/footer";

import * as global from "../styles/base/global.module.scss";
import * as styles from "../styles/pages/article.module.scss";

function Article(context) {
  const data = context.pageContext.data;
  const birthTime = convertDateJson(context.pageContext.birthTime);

  const { html, timeToRead, frontmatter } = data;

  const image = getImage(frontmatter.preview);

  const social = [
    {
      name: "Вконтакте",
      share: "https://vk.com/share.php?url=",
      icon: <SlSocialVkontakte className={global.icon} />,
    },
    {
      name: "Телеграм",
      share: "https://t.me/share/url?url=",
      icon: <FaTelegramPlane className={global.icon} />,
    },
  ];

  return (
    <>
      <Topnavigate />
      <section className={cx(styles.section, global.container)}>
        <Link to="/articles" className={styles.back}>
          <IoArrowBackSharp className={styles.icon} />
          <p className={styles.text}>Полезные статьи</p>
        </Link>
        <h1>{frontmatter.title}</h1>
        <article>
          <div className={styles.head}>
            <div className={styles.block}>
              <IoCalendarOutline className={styles.icon} />
              {`${birthTime.day} ${birthTime.month} ${birthTime.year}`}
            </div>
            <div className={styles.block}>
              <IoTimeOutline className={styles.icon} />
              <p>{timeToRead} мин</p>
            </div>
          </div>
          <div className={styles.preview}>
            <GatsbyImage
              className={styles.gatsbyimage}
              image={image}
              alt={`Постер для статьи ${frontmatter.title}`}
            />
          </div>
          <div className={styles.article}>
            <div
              className={styles.htmltext}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
          <div className={styles.collumn}>
            <div className={styles.title}>
              <p>Теги</p>
            </div>
            <div className={styles.content}>
              {frontmatter.tags.map((item, index) => {
                return (
                  <Link
                    to={`/articles?tag=${item}`}
                    className={cx(global.buttontext, styles.tag)}
                    key={`article-tag_${index}`}
                  >
                    <p className={global.text}>{item}</p>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className={styles.collumn}>
            <div className={styles.title}>
              <p>Поделиться</p>
            </div>
            <div className={styles.content}>
              {social.map((item, index) => {
                return (
                  <a
                    target="_blank"
                    href={`${item.share}${process.env.GATSBY_SITE_BASE_URL}/articles/${frontmatter.slug}`}
                    key={`share_${index}`}
                    className={cx(global.buttonicon, styles.share)}
                  >
                    {item.icon}
                  </a>
                );
              })}
            </div>
          </div>
        </article>
      </section>
      <Footer />
    </>
  );
}

export default Article;
