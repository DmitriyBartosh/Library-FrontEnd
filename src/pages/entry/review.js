import React, { useEffect, useState } from "react";
import { Link, navigate } from "gatsby";
import { useEffectOnce } from "react-use";
import { useStateContext } from "../../context/ContextProvider";
import cx from "classname";
import { useQuery } from "@tanstack/react-query";
import { getAllQuestions, getEntryReview } from "../../functions/entryreview";
import { useLocalStorage } from "react-use";
import { useIsDesktop, useIsTablet } from "../../hooks/mediaQuery";

import Topnavigate from "../../components/navigation/topnavigate";
import Topmobilenavigate from "../../components/navigation/topmobilenavigate";
import Footer from "../../components/footer";
import Answers from "../../components/entrytest/answers";
import MetaTag from "../../components/metaTag";
import Payment from "../../components/entrytest/payment";

import * as global from "../../styles/base/global.module.scss";
import * as styles from "../../styles/pages/entrytest.module.scss";
import Roadmap from "../../components/entrytest/roadmap";

function Review() {
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();

  const { isLoggedIn, user } = useStateContext();

  const [roadmap, setRoadmap] = useState({
    open: false,
    link: "",
  });
  const [price, setPrice] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useLocalStorage(`review_design`, []);

  useEffectOnce(() => {
    if (!isLoggedIn()) {
      navigate("/auth");
    }
  });

  const allQuestionsQuery = useQuery({
    queryKey: ["getAllQuestions", "design"],
    queryFn: () => getAllQuestions("design"),
  });

  const getEntryReviewQuery = useQuery({
    queryKey: ["getEntryReview"],
    queryFn: getEntryReview,
  });

  useEffect(() => {
    // Проверяем, отличается ли количество вопросов от количества ответов или является ли answers пустым массивом
    if (
      allQuestionsQuery.data &&
      (allQuestionsQuery.data.questions.length !== answers.length ||
        answers.length === 0)
    ) {
      // Заполняем состояние answers пустыми строками для каждого вопроса в allQuestionsQuery.data
      setAnswers(allQuestionsQuery.data.questions.map(() => ""));
    }
  }, [allQuestionsQuery.data, answers.length, setAnswers]);

  useEffect(() => {
    if (allQuestionsQuery.data) {
      setQuestions(allQuestionsQuery.data.questions);
      setPrice(allQuestionsQuery.data.price);
    }
  }, [allQuestionsQuery.data]);

  if (allQuestionsQuery.isLoading) return <p>Загрузка...</p>;

  if (allQuestionsQuery.isError) return <p>Ошибка, попробуй позже</p>;

  const telegramReady = user.telegram && user.telegram.username;
  const entryReview = getEntryReviewQuery.data;
  const isComplete =
    entryReview && getEntryReviewQuery.data.status === "complete";
  const isPaid = entryReview && getEntryReviewQuery.data.status === "paid";

  console.log(entryReview);

  return (
    <>
      {isDesktop && <Topnavigate />}
      {isTablet && <Topmobilenavigate />}
      <section className={cx(global.container, global.top)}>
        <div className={styles.review}>
          <div className={styles.info}>
            <h4>DesignReview 360°</h4>
            {!isComplete && (
              <p>
                На основе портфолио и ответов на вопросы выделим сильные стороны
                и точки роста. В результате получится карта навыков, которая
                поможет тебе выйти на новый уровень в графическом дизайне.
              </p>
            )}
          </div>

          {questions.length !== 0 && (
            <div className={styles.steps}>
              {!isComplete && (
                <div className={styles.item}>
                  {telegramReady ? (
                    <>
                      <h6>Обратная связь - {user.telegram.username}</h6>
                      <p>
                        Если у нас останутся вопросы по ревью, мы свяжемся с
                        тобой в телеграме. А еще можем продублировать результаты
                        ревью в личку.
                      </p>
                    </>
                  ) : (
                    <>
                      <h6>Добавь телеграм</h6>
                      <p>
                        Мы используем телеграм для обратной связи. Обязательно
                        свяжемся с тобой, если у нас останутся вопросы по ревью.
                        Так же отправим результаты в личные сообщения.
                      </p>
                      <Link
                        className={cx(
                          global.buttontext,
                          global.buttongreen,
                          styles.button
                        )}
                        to="/telegram"
                      >
                        <p className={global.text}>Привязать телеграм</p>
                      </Link>
                    </>
                  )}
                </div>
              )}

              {isPaid || isComplete ? (
                isComplete ? (
                  <div className={styles.item}>
                    <div
                      className={global.htmltext}
                      dangerouslySetInnerHTML={{
                        __html: entryReview.answer.annotation,
                      }}
                    />
                    <p />
                    <div className={styles.roadmap}>
                      <iframe
                        style={{ overflow: "hidden" }}
                        title="Дорожная карта"
                        scrolling="yes"
                        src={entryReview.answer.roadmap}
                      />
                      <button
                        className={cx(global.buttoncenter, global.buttongreen)}
                        onClick={() =>
                          setRoadmap({
                            open: true,
                            link: entryReview.answer.roadmap,
                          })
                        }
                      >
                        <p className={global.text}>Открыть на весь экран</p>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.item}>
                    <h6>Проверяем ответы</h6>
                    <p>
                      Как только все будет готово, мы пришлем уведомление в
                      телеграм и тут появятся результаты.
                    </p>
                  </div>
                )
              ) : (
                telegramReady && (
                  <>
                    <div className={styles.item}>
                      <h6>Заполни все поля</h6>
                      <p>
                        Ответь на вопросы ниже, так мы сможем максимально понять
                        сильные стороны и определить точки роста, чтобы ты мог
                        поэтапно двигаясь перейти на новый уровень в графическом
                        дизайне.
                      </p>

                      <Answers
                        data={questions}
                        answers={answers}
                        setAnswers={setAnswers}
                      />
                    </div>

                    <div className={styles.item}>
                      <h6>Отправить эксперту</h6>
                      <p>
                        Убедись что в полной мере заполнил все поля. После
                        оплаты наш эксперт все изучит и даст обратную связь в
                        телеграм чате и на этой странице.
                      </p>
                      <Payment
                        price={price}
                        questions={questions}
                        answers={answers}
                      />
                    </div>
                  </>
                )
              )}
            </div>
          )}
        </div>
      </section>
      {roadmap.open && (
        <Roadmap
          link={roadmap.link}
          close={() => setRoadmap({ open: false, link: "" })}
        />
      )}
      <Footer />
    </>
  );
}

export const Head = () => {
  const title = "Review 360";
  const description = "Ревью 360 от экспретов площадки Графикси";

  const data = {
    title: `Графикси | ${title}`,
    description: description,
    slug: `/entry/review`,
    preview: "/preview.png",
  };

  return <MetaTag data={data} />;
};

export default Review;
