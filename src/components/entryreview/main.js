import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllQuestions } from "../../functions/entryreview";

import Answers from "./answers";
import Payment from "./payment";

import * as styles from "./main.module.scss";

function Main({ review, setReview }) {
  const [price, setPrice] = useState(0);
  const [questions, setQuestions] = useState([]);

  const allQuestionsQuery = useQuery({
    queryKey: ["getAllQuestions", "design"],
    queryFn: () => getAllQuestions("design"),
  });

  useEffect(() => {
    // Проверяем, отличается ли количество вопросов от количества ответов или является ли answers пустым массивом
    if (
      allQuestionsQuery.data &&
      (allQuestionsQuery.data.questions.length !== review.answers.length ||
        review.answers.length === 0)
    ) {
      // Заполняем состояние answers пустыми строками для каждого вопроса в allQuestionsQuery.data
      setReview({
        ...review,
        answers: allQuestionsQuery.data.questions.map(() => ""),
      });
    }
  }, [allQuestionsQuery.data]);

  useEffect(() => {
    if (allQuestionsQuery.data) {
      setQuestions(allQuestionsQuery.data.questions);
      setPrice(allQuestionsQuery.data.price);
    }
  }, [allQuestionsQuery.data]);

  if (allQuestionsQuery.isLoading) return <p>Загрузка...</p>;

  if (allQuestionsQuery.isError) return <p>Ошибка, попробуй позже</p>;

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>DesignReview 360°</h2>

      <div className={styles.steps}>
        <div className={styles.item}>
          <p>
            Как можно подробнее заполни поля для вопросов, так мы сможем
            выделить <span>сильные стороны</span> и определить{" "}
            <span>точки роста</span>.
          </p>
          <p>
            Вопросы <span>можно пропускать</span>. Так же{" "}
            <span>весь прогресс сохраняется</span> в браузере, поэтому{" "}
            <span>сможешь вернуться позднее</span>, если не успел заполнить все
            вопросы.
          </p>
          <p>
            Опираясь на ответы, составим <span>дорожную карту</span> которая
            поможет <span>структурировать обучение</span> и перейти на новый
            уровень в графическом дизайне.
          </p>
          <p>
            <span>Поля можно оставлять пустыми</span>, если по каким то из
            вопросов нет ответа.
          </p>

          <Answers data={questions} review={review} setReview={setReview} />
        </div>

        <div className={styles.item}>
          <h6>Отправить эксперту</h6>
          <p>
            После оплаты наш эксперт все изучит и даст обратную связь в телеграм
            чате и на этой странице.
          </p>
          <Payment
            price={price}
            questions={questions}
            review={review}
            setReview={setReview}
          />
        </div>
      </div>
    </div>
  );
}

export default Main;
