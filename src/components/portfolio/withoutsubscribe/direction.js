import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import cx from "classname";

import Detail from "./detail";
import Modal from "../../modal";
import Payment from "../../payment";

import * as styles from "./direction.module.scss";
import { canSplit } from "@tiptap/pm/transform";

function Choisesubscribe() {
  const [detail, setDetail] = useState({
    visible: false,
    payment: false,
    data: {},
    title: "",
    direction: "",
    price: 1000,
    themes: [],
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
              free
              title
              slug
              time
              tags
              steps
              description
              icon
            }
          }
        }
      }
    }
  `);

  // Пока тут только на дизайн. После добавления новых направлений изменить компонент
  const directions = directionQuery.allDirectionsJson.edges;
  const designData = directions.find(
    (item) => item.node.slug === "design"
  ).node;

  function closeDetail() {
    setDetail({
      payment: false,
      visible: false,
      data: {},
      title: "",
      direction: "",
      themes: [],
    });
  }

  function openDetail(data, themes, title, direction) {
    setDetail({
      visible: true,
      payment: false,
      data,
      title,
      direction,
      themes,
    });
  }

  function renderThemes(filterCondition) {
    return directions.map((item) => {
      const { works, title, active, slug } = item.node;
      const allThemes = works.map((obj) => obj.title);

      return (
        active &&
        works.filter(filterCondition).map((item) => {
          const Component = React.lazy(() =>
            import(`../../../images/direction/${item.icon}`)
          );

          return (
            <button
              aria-label="Тема"
              onClick={() => openDetail(item, allThemes, title, slug)}
              className={cx(styles.item, item.free && styles.free)}
              key={`${item.slug}`}
            >
              <div className={styles.subscribe}>
                <p>{item.free ? "Бесплатно" : "Доступно по подписке"}</p>
              </div>
              <div className={styles.preview}>
                <React.Suspense>
                  <Component
                    className={cx(styles.icon)}
                    color={item.free ? "white" : "#d65935"}
                  />
                </React.Suspense>
              </div>
              <div className={styles.head}>
                <p className={styles.description}>{title}</p>
                <p className={styles.title}>{item.title}</p>
              </div>
              <div className={styles.footer}>
                <div className={styles.line} />
                <p className={styles.text}>
                  Необходимы базовые навыки программ
                </p>
              </div>
            </button>
          );
        })
      );
    });
  }

  return (
    <div className={styles.container}>
      <h5 className={styles.title}>Графический дизайн / Все темы</h5>
      <div className={styles.head}>
        <p>
          Собрали <span>технические задания</span> из нашей{" "}
          <span>реальной практики</span> и подготовили материалы на которые ты
          сможешь опираться при выполнении.
        </p>
        <p>
          После выполнения, сможешь <span>проверить себя по чеклисту</span> и
          прикрепить ссылку на работу. Работы можно будет{" "}
          <span>отправить на рецензию эксперту</span> и по необходимости
          доработать.
        </p>
        <button
          className={styles.button}
          onClick={() => setDetail((prev) => ({ ...prev, payment: true }))}
        >
          <p className={styles.text}>
            Оплатить доступ / {designData.price} руб.
          </p>
        </button>
      </div>
      <div className={styles.themes}>
        {renderThemes((work) => work.free)}
        {renderThemes((work) => !work.free)}
      </div>

      <Modal visible={detail.visible} close={() => closeDetail()}>
        {detail.payment ? (
          <Payment
            name={designData.title}
            direction={designData.slug}
            cost={designData.price}
            themes={designData.works.map((obj) => obj.title)}
          />
        ) : (
          <Detail
            detail={detail}
            setDetail={setDetail}
            closeDetail={closeDetail}
          />
        )}
      </Modal>

      <Modal
        visible={detail.payment && !detail.visible}
        close={() => closeDetail()}
      >
        <Payment
          name={designData.title}
          direction={designData.slug}
          cost={designData.price}
          themes={designData.works.map((obj) => obj.title)}
        />
      </Modal>
    </div>
  );
}

export default Choisesubscribe;
