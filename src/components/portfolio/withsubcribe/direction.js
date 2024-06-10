import React, { useState, useMemo } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby";
import cx from "classname";
import { useStateContext } from "../../../context/ContextProvider";

import Detail from "./detail";

import * as styles from "./direction.module.scss";
import * as global from "../../../styles/base/global.module.scss";

function sortThemes(themes, works) {
  return themes.sort((a, b) => {
    const worksOnThemeA = works.filter((work) => work.theme === a.slug);
    const worksOnThemeB = works.filter((work) => work.theme === b.slug);

    if (worksOnThemeA.length === 0 && worksOnThemeB.length > 0) {
      return 1;
    } else if (worksOnThemeA.length > 0 && worksOnThemeB.length === 0) {
      return -1;
    } else {
      return 0;
    }
  });
}

const attachedWorks = [
  "Добавлена работа",
  "Добавлено 2 работы",
  "Добавлено 3 работы",
  "Добавлено 4 работы",
  "Добавлено 5 работы",
];

function Direction() {
  const { subscribes, works } = useStateContext();

  const [detail, setDetail] = useState({
    visible: false,
    works: {},
    data: {},
    specifications: null,
  });

  const directionQuery = useStaticQuery(graphql`
    query {
      allDirectionsJson {
        edges {
          node {
            slug
            title
            active
            about
            price
            works {
              title
              slug
              time
              tags
              icon
              steps
              complexity
              description
              programs {
                choise
                list
              }
            }
          }
        }
      }
    }
  `);

  const directions = directionQuery.allDirectionsJson.edges;
  const activeDirection = useMemo(
    () => subscribes?.filter((item) => item.active),
    [subscribes]
  );

  return (
    <div className={styles.container}>
      {activeDirection?.map((item, index) => {
        const { plan } = item;
        const themes = directions.find((dir) => dir.node.slug === plan).node;

        const sortedThemes = sortThemes(themes.works, works);

        return (
          <div className={styles.direction} key={`direction_${index}`}>
            <h5>Все темы / {themes.title}</h5>
            <div className={styles.head}>
              <p>
                Собрали <span>технические задания</span> из нашей{" "}
                <span>реальной практики</span> и подготовили материалы на
                которые ты сможешь опираться при выполнении.
              </p>
              <p>
                После выполнения, сможешь{" "}
                <span>проверить себя по чеклисту</span> и прикрепить ссылку на
                работу. Работы можно будет{" "}
                <span>отправить на рецензию эксперту</span> и по необходимости
                доработать.
              </p>
            </div>
            <div className={styles.themes}>
              {sortedThemes.map((item, idx) => {
                const worksOnTheme = works.filter(
                  (work) =>
                    work.direction === themes.slug && work.theme === item.slug
                );
                const isComplete = worksOnTheme.length > 0;

                const Component = React.lazy(() =>
                  import(`../../../images/direction/${item.icon}`)
                );

                return (
                  <div
                    className={cx(styles.item, isComplete && styles.complete)}
                  >
                    <Link
                      to={`/${themes.slug}/${item.slug}`}
                      className={styles.info}
                    >
                      <div className={styles.main}>
                        <div className={styles.head}>
                          <p>
                            Сложность: <span>{item.complexity}/10</span>
                          </p>
                          <p>
                            Время: <span>{item.time}</span>
                          </p>
                        </div>
                        <div className={styles.preview}>
                          <React.Suspense>
                            <Component
                              className={styles.icon}
                              color="#d65935"
                            />
                          </React.Suspense>
                        </div>
                        <div className={styles.name}>
                          <p className={styles.description}>{themes.title}</p>
                          <p className={styles.title}>{item.title}</p>
                        </div>
                      </div>

                      {!isComplete && (
                        <div className={styles.hint}>
                          <div className={styles.line} />
                          <p className={styles.text}>Нет выполненных работ</p>
                        </div>
                      )}
                    </Link>

                    {isComplete && (
                      <div className={styles.action}>
                        <button
                          className={cx(global.buttontext, styles.detail)}
                          onClick={() =>
                            setDetail({
                              visible: true,
                              works: worksOnTheme,
                              data: item,
                              specifications: `${themes.slug}/${item.slug}/specifications`,
                            })
                          }
                        >
                          <p className={global.text}>
                            {attachedWorks[worksOnTheme.length - 1]}
                          </p>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <Detail detail={detail} setDetail={setDetail} />
    </div>
  );
}

export default Direction;
