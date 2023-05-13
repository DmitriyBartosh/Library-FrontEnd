import React from "react";
import { StaticImage } from 'gatsby-plugin-image'
import MetaTag from "../components/metaTag";
import { indexSEO } from "../data/seo";
import cx from 'classname'
import { IoArrowForwardSharp } from "react-icons/io5";
import Birdonbranch from "../images/svg/birdonbranch";
import * as button from '../styles/base/button.module.scss'
import * as page from '../styles/pages/main.module.scss'
import Bird from "../images/svg/bird";


function IndexPage() {

  // В будущем тут будут список актуальных ссылок на статьи
  const articlesList = [
    'Как начать проект',
    'типографика',
    'FIGMA',
    'композиция',
    'цветовые сочетания'
  ]

  const servicesList = [
    'Дизайн',
    'FrontEnd',
    'Фотография'
  ]

  return (
    <section className={page.container}>
      <div className={page.preview}>
        <Bird className={page.bird} />
        <Birdonbranch className={page.birdonbranch} />
        <h1>Создай свое портфолио<br />
          вместе с Графикси</h1>
        <p>Получайте больше кайфа от обучения дизайну
          с подпиской на Графикси за 200р / в мес</p>
        <button className={cx(button.main, page.button)}>Собрать портфолио</button>
      </div>
      <div className={page.articles}>
        <div className={page.title}>
          <p>Коллекции статей</p>
          <IoArrowForwardSharp className={page.svg} />
        </div>
        <div className={page.list}>
          {articlesList.map((item, index) => {
            return <div key={index} className={page.item}>
              <p>{item}</p>
            </div>
          })}
        </div>
      </div>

      <div className={page.services}>
        <div className={page.navigate}>
          {servicesList.map((item, index) => {
            return <div className={page.item} key={index}>
              <h6>{item}</h6>
            </div>
          })}
        </div>
        <div className={page.persons}>
          <div className={page.kate}>
            <div className={page.photo}>
              <StaticImage src='../images/persons/1.png' className={page.gatsbyimage} />
            </div>
            <div className={page.description}>
              <p><span>Катерина Шмидт</span> / бренд дизайнер</p>
              <IoArrowForwardSharp className={page.svg} />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default IndexPage;

export const Head = () => {
  return <MetaTag data={indexSEO} />;
};
