import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import cx from "classname";
import { useQuery } from "@tanstack/react-query";
import { getEntryReview } from "../../functions/entryreview";
import { useLocalStorage } from "react-use";
import { TbSitemap } from "react-icons/tb";
import {
  IoArrowForwardSharp,
  IoTimeOutline,
  IoAddSharp,
} from "react-icons/io5";
import { useStateContext } from "../../context/ContextProvider";

import Roadmap from "./roadmap";
import Main from "./main";
import Modal from "../modal";

import * as styles from "./preview.module.scss";
import * as global from "../../styles/base/global.module.scss";

function Preview() {
  const { user } = useStateContext();
  const [roadmap, setRoadmap] = useState({
    open: false,
    link: "",
  });

  const [review, setReview] = useLocalStorage("review_design", {
    answers: [],
    index: 0,
    open: false,
  });

  const hasText =
    review.answers && review.answers.some((text) => text.trim() !== "");

  const { data } = useQuery({
    queryKey: ["getEntryReview"],
    queryFn: getEntryReview,
  });

  const telegramReady = user.telegram && user.telegram.username ? true : false;
  const isPending = data && data.status === "pending";
  const isPaid = data && data.status === "paid";
  const isComplete = data && data.status === "complete";

  const roadmapUrl = data && data.answer?.roadmap;
  const annotation = data && data.answer?.annotation;

  useEffect(() => {
    if (review.open) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [review.open]);

  useEffect(() => {
    if (isComplete || isPaid) {
      setReview({
        answers: [],
        index: 0,
        open: false,
      });
    }
  }, [isComplete, isPaid]);

  return (
    <>
      <section className={styles.container}>
        <div className={cx(styles.entry, isComplete && styles.complete)}>
          <div className={styles.info}>
            <h5>DesignReview 360°</h5>
            {isComplete ? (
              <div
                dangerouslySetInnerHTML={{ __html: annotation }}
                className={global.htmltext}
              />
            ) : (
              <>
                <p>
                  Составим <span>индивидуальную дорожную карту</span> на основе
                  твоего прошлого опыта. На карте структурирован путь обучения,
                  следуя которому ты гораздо быстрее перейдешь на новый уровень
                  в графическом дизайне.
                </p>
                <h6>Кому подойдет</h6>
                <p>
                  <span>Начинающим</span> свой путь в графическом дизайне, но
                  еще не знающим с чего начать. Или{" "}
                  <span>практикующим дизайнерам</span> желающим перейти на новый
                  уровень.
                </p>
                {!telegramReady && (
                  <>
                    <h6>Прежде чем начать</h6>
                    <p>
                      Мы используем Telegram для <span>обратной связи</span> и{" "}
                      <span>уведомлений</span>. Перейди по кнопке ниже и в пару
                      шагов привяжи Telegram. После этого мы сможем присылать{" "}
                      <span>уведомления о важных этапах</span> нашей совместной
                      работы.
                    </p>
                  </>
                )}
              </>
            )}
          </div>

          {isComplete && telegramReady && (
            <button
              className={cx(global.buttonwide, global.buttongreen, styles.link)}
              onClick={() => setRoadmap({ open: true, link: roadmapUrl })}
            >
              <p className={global.text}>Открыть карту</p>
              <TbSitemap className={global.icon} />
            </button>
          )}

          {isPending && telegramReady && (
            <a
              href={data?.url}
              className={cx(global.buttonwide, global.buttongreen, styles.link)}
            >
              <p className={global.text}>Завершить оплату</p>
              <IoArrowForwardSharp className={global.icon} />
            </a>
          )}

          {isPaid && telegramReady && (
            <Link
              className={cx(global.buttonwide, styles.paid)}
              to="/entryreview"
            >
              <p className={global.text}>Делаем дорожную карту</p>
              <IoTimeOutline className={global.icon} />
            </Link>
          )}

          {!isComplete && !isPaid && !isPending && telegramReady && (
            <button
              className={cx(global.buttonwide, global.buttongreen, styles.link)}
              onClick={() => setReview({ ...review, open: true })}
            >
              {hasText ? (
                <p className={global.text}>Продолжить DesignReview 360°</p>
              ) : (
                <p className={global.text}>Начать DesignReview 360°</p>
              )}
              <IoArrowForwardSharp className={global.icon} />
            </button>
          )}

          {!telegramReady && (
            <Link
              className={cx(global.buttonwide, global.buttongreen, styles.link)}
              to="/telegram"
            >
              <p className={global.text}>Привязать Telegram</p>

              <IoAddSharp className={global.icon} />
            </Link>
          )}
        </div>
      </section>
      {roadmap.open && (
        <Roadmap
          link={roadmap.link}
          close={() => setRoadmap({ open: false, link: "" })}
        />
      )}

      <Modal
        visible={review.open}
        close={() => setReview({ ...review, open: false })}
      >
        <Main review={review} setReview={setReview} />
      </Modal>
    </>
  );
}

export default Preview;
