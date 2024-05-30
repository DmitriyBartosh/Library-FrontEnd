import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import cx from "classname";
import { motion } from "framer-motion";
import {
  IoTrashOutline,
  IoArrowDownSharp,
  IoArrowUpSharp,
  IoSyncOutline,
  IoCheckmarkDoneSharp,
} from "react-icons/io5";
import { getAllQuestions, addQuestions } from "../../functions/entryreview";

import * as styles from "./questions.module.scss";
import * as global from "../../styles/base/global.module.scss";

function Questions({ direction }) {
  const [price, setPrice] = useState(0);
  const [input, setInput] = useState("");
  const [questions, setQuestions] = useState([]);

  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["getAllQuestions", direction.slug],
    queryFn: () => getAllQuestions(direction.slug),
  });

  const addQuestionsMutation = useMutation({
    mutationFn: addQuestions,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllQuestions", direction.slug],
      });
    },
  });

  const handleDelete = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const moveItemUp = (index) => {
    if (index === 0) {
      return; // Если элемент уже находится в самом верху, ничего не делаем
    }

    // Создаем копию массива questions
    const updatedQuestions = [...questions];

    // Перемещаем элемент на одну позицию вверх
    const temp = updatedQuestions[index];
    updatedQuestions[index] = updatedQuestions[index - 1];
    updatedQuestions[index - 1] = temp;

    // Обновляем состояние questions
    setQuestions(updatedQuestions);
  };

  const moveItemDown = (index) => {
    if (index === questions.length - 1) {
      return; // Если элемент уже находится в самом низу, ничего не делаем
    }

    // Создаем копию массива questions
    const updatedQuestions = [...questions];

    // Перемещаем элемент на одну позицию вниз
    const temp = updatedQuestions[index];
    updatedQuestions[index] = updatedQuestions[index + 1];
    updatedQuestions[index + 1] = temp;

    // Обновляем состояние questions
    setQuestions(updatedQuestions);
  };

  useEffect(() => {
    if (result.data) {
      setQuestions(result.data.questions);
      setPrice(result.data.price);
    }
  }, [result.data]);

  if (result.isPending) return <p>Загрузка...</p>;

  if (result.isError) return <p>Ошибка, попробуй позже</p>;

  return (
    <div className={styles.container}>
      <div className={styles.cost}>
        <h6 className={styles.head}>Цена</h6>
        <input
          type="text"
          placeholder="Введите цену"
          className={styles.input}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className={styles.add}>
        <div className={styles.head}>
          <h6>Добавить новый вопрос</h6>
        </div>
        <input
          type="text"
          placeholder="Введите вопрос"
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className={cx(global.buttontext, global.buttonbeige)}
          disabled={!input}
          onClick={() => {
            setQuestions([...questions, input]);
            setInput("");
          }}
        >
          <p className={global.label}>Добавить вопрос</p>
        </button>
      </div>
      <div className={styles.list}>
        {questions.map((item, index) => {
          return (
            <div className={styles.item} key={index}>
              <p>
                {index + 1}. {item}
              </p>
              <div className={styles.action}>
                <button
                  className={cx(global.buttonicon, global.buttonbeige)}
                  onClick={() => moveItemUp(index)}
                >
                  <IoArrowUpSharp className={global.icon} />
                </button>
                <button
                  className={cx(global.buttonicon, global.buttonbeige)}
                  onClick={() => moveItemDown(index)}
                >
                  <IoArrowDownSharp className={global.icon} />
                </button>
                <button
                  className={cx(global.buttonicon, global.buttonbeige)}
                  onClick={() => handleDelete(index)}
                >
                  <IoTrashOutline className={global.icon} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {(questions !== result?.data?.questions ||
        price !== result?.data?.price) && (
        <button
          className={cx(global.buttoncenter, global.buttongreen)}
          disabled={addQuestionsMutation.isLoading}
          onClick={() =>
            addQuestionsMutation.mutate({
              slug: direction.slug,
              name: direction.title,
              questions: questions,
              price: price,
            })
          }
        >
          {addQuestionsMutation.isLoading ? (
            <>
              <p className={global.text}>Сохранение</p>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.25, repeat: Infinity }}
                className={global.load}
              >
                <IoSyncOutline className={global.svg} />
              </motion.div>
            </>
          ) : (
            <>
              <p className={global.text}>Сохранить</p>
              <IoCheckmarkDoneSharp className={global.icon} />
            </>
          )}
        </button>
      )}
    </div>
  );
}

export default Questions;
