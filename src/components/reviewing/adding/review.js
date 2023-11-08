import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaTelegramPlane } from "react-icons/fa";
import cx from "classname";
import { Link } from "gatsby";
import { getAllExperts } from "../../../functions/review";
import { useStateContext } from "../../../context/ContextProvider";
import { addWorkToReview } from "../../../functions/review";

import Choisedirection from "./choisedirection";
import Choisework from "./choisework";
import Experts from "./experts";
import Nextstep from "./nextstep";
import Modal from "../../modal";

import * as global from "../../../styles/base/global.module.scss";
import * as styles from "./review.module.scss";

function Review() {
  const queryClient = useQueryClient();
  const { user, works, subscribes, showReview, setShowReview } =
    useStateContext();

  // Все направления площадки
  const direcionQuery = useStaticQuery(graphql`
    query {
      allDirectionsJson {
        edges {
          node {
            slug
            title
            works {
              slug
              title
            }
          }
        }
      }
    }
  `);

  const directionData = direcionQuery.allDirectionsJson.edges;

  // Отправляем ревью
  const addWorkToReviewMutation = useMutation({
    mutationFn: addWorkToReview,
    onSuccess: () => {
      setReview({ ...review, complete: true });
      queryClient.invalidateQueries({ queryKey: ["getAllWorksOnReview"] });
    },
  });

  // Выбираем только те направления, в которых активна подписка и добавлена хоть одна работа
  const directionWithWork =
    Array.isArray(subscribes) &&
    subscribes
      ?.filter((item) => item.active)
      .filter((element) => {
        const thereIsJob =
          Array.isArray(works) &&
          works.some((work) => work.direction === element.plan);
        console.log(thereIsJob);
        return thereIsJob;
      })
      .map((item) => item.plan);

  const [review, setReview] = useState({
    works: [],
    expert: null,
    direction: directionWithWork[0],
    price: 0,
    select: "work",
    complete: false,
  });

  // Находим всех экспертов в выбранном направлении
  const allExpertQuery = useQuery({
    queryKey: ["allexperts", review.direction],
    queryFn: () => getAllExperts(review.direction),
    enabled: !!user && review.direction !== null,
  });

  const nextStep = () => {
    if (review.select === "expert" && review.expert !== null) {
      addWorkToReviewMutation.mutate({
        expert_id: review.expert.id,
        works: review.works,
      });
    } else {
      setReview({ ...review, select: "expert" });
    }
  };

  // Изменить направления
  function changeDirection(direction) {
    if (direction !== review.direction) {
      setReview({
        works: [],
        expert: null,
        direction: direction,
        price: 0,
        select: "work",
      });
    }
  }

  // При оформлении подписки, записываем направление
  useEffect(() => {
    setReview({ ...review, direction: directionWithWork[0] });
  }, [subscribes]);

  useEffect(() => {
    if (review.expert) {
      var cost = 0;
      for (let index = 0; index < review.works.length; index++) {
        cost = cost + parseInt(review.expert.price[review.works[index].theme]);
      }
      setReview({ ...review, price: cost });
    }
  }, [review.expert]);

  const expertOnReview =
    review.complete &&
    allExpertQuery.data.experts.find((item) => item.id === review.expert.id);

  return (
    <Modal visible={showReview} close={() => setShowReview(false)}>
      {review.complete ? (
        <>
          <div className={styles.content}>
            <h5>
              {review.works.length === 1
                ? "Принята работа на рецензию"
                : "Приняты работы на рецензии"}
            </h5>
            <div className={styles.block}>
              {review.works.map((item, index) => {
                const work = works.find(
                  (item_work) => item_work.id === item.id
                );
                return (
                  <a
                    className={styles.link}
                    href={work.link}
                    target="_blank"
                    key={`link_work_${index}`}
                  >
                    {review.works.length > 1 && `${index + 1}.`} {work.name}
                  </a>
                );
              })}
            </div>
            <h5>Проверит</h5>
            <div className={styles.block}>
              <a
                href={`/expert/${expertOnReview.slug}`}
                target="_blank"
                className={styles.link}
              >
                {expertOnReview.name}
              </a>

              <p>{expertOnReview.about}</p>
            </div>
            <h5>Стоимость</h5>
            <div className={styles.block}>
              <p>
                {review.works.length === 1
                  ? "Рецензия на работу - "
                  : "Рецензий всех работ - "}
                <span>{review.price} руб.</span>
              </p>
            </div>

            <div className={styles.block}>
              <h5>Что дальше?</h5>
              <ul>
                <li>
                  Эксперт <span>проверит</span> ссылку и убедится, что задание
                  правильно понято и <span>работа выполнена</span> полностью.{" "}
                  После этого на странице вашего портфолио будет отображаться
                  готовность к проверке и ссылка на оплату.
                </li>
                <li>
                  После оплаты, эксперт <span>проверит</span> работу{" "}
                  <span>в течении трех дней</span>. Если мы{" "}
                  <span>не успеем</span>, то <span>вернем деньги</span> за
                  рецензию на карту и <span>сделаем рецензию бесплатно!</span>
                </li>
                <li>
                  Эксперт оставит свою рецензию и, если это будет необходимо,
                  даст тебе рекомендации по тому, как можно улучшить работу. В
                  течении <span>пяти дней</span> ты можешь{" "}
                  <span>внести коррективы</span> и отправить эксперту для
                  повторной проверки.
                </li>
                <li>
                  <span>Лучшие работы</span> мы добавляем{" "}
                  <span>на сайт Графикси</span>. Когда рецензия будет готова и
                  эксперт выделит твою работу, ты получишь уведомление с
                  подробной инструкцией о том, как опубликовать свою работу на
                  Графикси!
                </li>
              </ul>
            </div>
          </div>
          <div className={cx(styles.action, styles.twobutton)}>
            {
              <Link
                className={cx(
                  global.buttoncenter,
                  user.telegram === null
                    ? styles.buttongreen
                    : styles.buttontransparent
                )}
                to="/telegram"
                onClick={() => setShowReview(false)}
              >
                {user.telegram === null || user.telegram.error ? (
                  <p className={global.text}>Подключить уведомления</p>
                ) : (
                  <p className={global.text}>
                    Уведомления в <span>@{user?.telegram?.username}</span>
                  </p>
                )}
                <FaTelegramPlane className={global.icon} />
              </Link>
            }
            <button
              className={cx(global.buttontext, styles.buttontransparent)}
              onClick={() => {
                setReview({
                  works: [],
                  expert: null,
                  direction: directionWithWork[0],
                  price: 0,
                  select: "work",
                  complete: false,
                });
                setShowReview(false);
              }}
            >
              <p className={global.text}>Закрыть</p>
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.content}>
            <Choisedirection
              directionWithWork={directionWithWork}
              changeDirection={changeDirection}
              directionData={directionData}
              review={review}
            />
            <Choisework
              review={review}
              setReview={setReview}
              directionData={directionData}
            />
            <Experts
              review={review}
              setReview={setReview}
              allExpertQuery={allExpertQuery}
            />
          </div>

          <div className={styles.action}>
            <Nextstep
              review={review}
              addWorkToReviewMutation={addWorkToReviewMutation}
              nextStep={nextStep}
            />
          </div>
        </>
      )}
    </Modal>
  );
}

export default Review;
