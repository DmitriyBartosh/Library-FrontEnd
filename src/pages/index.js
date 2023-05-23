import React from "react";
import { Link } from "gatsby";
import MetaTag from "../components/metaTag";
import { indexSEO } from "../data/seo";
import cx from 'classname'
import { IoArrowForwardSharp, IoAddSharp } from "react-icons/io5";
import Birdonbranch from "../images/svg/birdonbranch";

import * as button from '../styles/base/button.module.scss'
import * as styles from '../styles/base/global.module.scss'

import * as preview from '../styles/pages/main/preview.module.scss'
import * as about from '../styles/pages/main/about.module.scss'
import * as practice from '../styles/pages/main/practice.module.scss'
import * as articles from '../styles/pages/main/articles.module.scss'
import * as projects from '../styles/pages/main/projects.module.scss'
import * as start from '../styles/pages/main/start.module.scss'

import Bird from "../images/svg/bird";
import Flowers from "../images/svg/flowers";
import Flower from "../images/svg/flower";
import Linesteps from "../images/svg/linesteps";

import One from '../images/svg/practice/one'
import Two from '../images/svg/practice/two'
import Three from '../images/svg/practice/three'
import Four from '../images/svg/practice/four'

import Logo from "../images/svg/directions/logo";
import Firmstyle from '../images/svg/directions/firmstyle'
import Visual from '../images/svg/directions/visual'
import Presentation from '../images/svg/directions/presentation'
import Poster from '../images/svg/directions/poster'
import Landing from '../images/svg/directions/landing'

function IndexPage() {

  // В будущем тут будут список актуальных ссылок на статьи
  const articlesList = [
    'Как начать проект',
    'типографика',
    'FIGMA',
    'композиция',
    'цветовые сочетания'
  ]

  const directionsList = [
    {
      title: 'Логотип',
      description: 'Научим работать с идеей, строить сетку, правильно отдавать файлы заказчику',
      icon: <Logo className={projects.svg} />,
    },
    {
      title: 'Фирменный стиль',
      description: 'ЦА, мудборд, список ресурсов для вдохновения, работа с паттернами',
      icon: <Firmstyle className={projects.svg} />,
    },
    {
      title: 'Визуал для соц сетей',
      description: 'ЦА, мудборд, список ресурсов для вдохновения, работа с паттернами',
      icon: <Visual className={projects.svg} />,
    },
    {
      title: 'Презентация',
      description: 'Научим работать с идеей, строить сетку, правильно отдавать файлы заказчику',
      icon: <Presentation className={projects.svg} />,
    },
    {
      title: 'Постеры',
      description: 'ЦА, мудборд, список ресурсов для вдохновения, работа с паттернами',
      icon: <Poster className={projects.svg} />,
    },
    {
      title: 'Лендинг',
      description: 'ЦА, мудборд, список ресурсов для вдохновения, работа с паттернами',
      icon: <Landing className={projects.svg} />,
    }
  ]

  return (
    <section>

      <div className={preview.preview}>
        <Bird className={preview.bird} />
        <Birdonbranch className={preview.birdonbranch} />
        <Flower className={preview.flower} />
        <div className={preview.mask}>
          <Flowers className={preview.flowers} />
        </div>
        <div className={preview.info}>
          <p>Получайте больше кайфа от обучения дизайну онлайн</p>
          <h1>Создай свое портфолио<br />
            вместе с Графикси</h1>
          <Link className={cx(button.main, preview.button)} to='/portfolio'>Собрать портфолио</Link>
        </div>
      </div>

      <div className={about.about}>
        <div className={cx(about.four, styles.container)}>
          <div className={about.block}>
            <p className={about.title}>
              нагрузка
            </p>
            <p className={about.description}>3-4 часа в неделю</p>
          </div>
          <div className={about.block}>
            <p className={about.title}>
              старт
            </p>
            <p className={about.description}>по подписке</p>
          </div>
          <div className={about.block}>
            <p className={about.title}>
              длительность
            </p>
            <p className={about.description}>1 месяц</p>
          </div>
          <div className={about.block}>
            <p className={about.title}>
              кол-во проектов
            </p>
            <p className={cx(about.description, about.orange)}>10 работ</p>
          </div>
        </div>
      </div>

      <div className={cx(practice.practice, styles.container)}>
        <div className={practice.title}>
          <h5>Практика на реальных задачах из жизни<br />
            от профессиональных специалистов<br />
            в области дизайна.</h5>
          <p className={practice.whatwedo}>чем будем  заниматься?</p>
        </div>
        <div className={practice.four}>
          <div className={practice.block}>
            <One className={practice.icon} />
            <p className={practice.description}>10 работ<br />
              в портфолио</p>
          </div>
          <div className={practice.block}>
            <Two className={practice.icon} />
            <p className={practice.description}>Теоретические<br />
              конспекты</p>
          </div>
          <div className={practice.block}>
            <Three className={cx(practice.icon, practice.delta)} />
            <p className={practice.description}>Дизайн-разбор<br />
              от экспертов</p>
          </div>
          <div className={practice.block}>
            <Four className={practice.icon} />
            <p className={practice.description}>Новые<br />
              победы и знакомства</p>
          </div>
        </div>
      </div>

      <div className={articles.articles}>
        <div className={articles.title}>
          <p>Коллекции статей</p>
          <IoArrowForwardSharp className={articles.svg} />
        </div>
        <div className={articles.list}>
          {articlesList.map((item, index) => {
            return <div key={index} className={articles.item}>
              <p>{item}</p>
            </div>
          })}
        </div>
      </div>

      <div className={projects.projects}>
        <div className={cx(projects.header, styles.container)}>
          <div className={projects.right} />
          <div className={projects.left}>
            <Bird className={projects.bird} />
          </div>
          <div className={projects.titleblock}>
            <h1>01</h1>
            <h3 className={projects.title}>
              <div className={projects.text}>
                <span>Какие проекты</span>
              </div>
              <div className={projects.text}>
                <span>я смогу собрать</span>
              </div>
              <div className={projects.text}>
                <span className={projects.orange}>в портфолио?</span>
              </div>
            </h3>
          </div>
        </div>

        <div className={cx(projects.directions, styles.container)}>
          {directionsList.map((item, index) => {
            const { title, description, icon } = item;

            return <div className={projects.block} key={index}>
              <div className={projects.icon}>
                {icon}
              </div>
              <div className={projects.text}>
                <h5>{title}</h5>
                <p>{description}</p>
                <div className={projects.line} />
                <IoAddSharp className={projects.icon} />
              </div>

            </div>
          })}
        </div>

        <div className={projects.possibilities}>
          <p>
            <span>Графикси</span> - это площадка с профессиональными экспертами в области графического и веб дизайна, которые готовы поделиться своим пакетом заданий и проверить их в течение 24 часов после отправки.
          </p>
        </div>
      </div>

      <div className={start.start}>
        <div className={cx(start.header, styles.container)}>
          <div className={start.right} />
          <div className={start.left} />
          <div className={start.titleblock}>
            <h1>02</h1>
            <h3 className={start.title}>
              <div className={start.text}>
                <span>Как  я могу</span>
              </div>
              <div className={start.text}>
                <span className={start.orange}>начать?</span>
              </div>
            </h3>
          </div>
        </div>

        <div className={cx(start.steps, styles.container)}>
          <div className={start.block}>
            <div className={start.text}>
              <h5>1 шаг</h5>
              <p>Для того, чтобы начать работу,ты можешь
                ознакомиться с личными страничками
                и опытом наших экспертов, а также выбрать удобный пакет заданий для себя.</p>
            </div>

          </div>
          <div className={start.block}>
            <Linesteps className={start.icon} />
            <div className={start.text}>
              <h5>2 шаг</h5>
              <p>Авторизоваться в личном кабинете
                и оплатить подписку. Таким образом откроются нужные тебе задания.</p>
            </div>

          </div>
          <div className={start.block}>
            <Linesteps className={start.icon} />
            <div className={start.text}>
              <h5>3 шаг</h5>
              <p>На этом этапе остается только получать удовольствие от процесса и осваивать навыки с помощью экспертов и их компетенций.</p>
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
