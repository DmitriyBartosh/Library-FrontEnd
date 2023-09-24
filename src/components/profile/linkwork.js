import React, { useState } from "react";
import {
  IoOpenOutline,
  IoCloseOutline,
  IoCreateOutline,
  IoCheckmarkSharp,
  IoSyncOutline,
} from "react-icons/io5";
import { useStaticQuery, graphql } from "gatsby";
import {
  useMutation,
  useQueryClient,
  useIsFetching,
} from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import cx from "classname";
import { editWork } from "../../functions/works";
import * as styles from "./linkwork.module.scss";
import * as global from "../../styles/base/global.module.scss";

function Linkwork({ data }) {
  const [edited, setEdited] = useState(false);
  const [link, setLink] = useState(data.link);

  const queryClient = useQueryClient();
  const isFetchingWorks = useIsFetching({ queryKey: ["getAllWorks"] });

  const editWorkMutation = useMutation({
    mutationFn: editWork,
    onSuccess: () => {
      setEdited(false);
      queryClient.invalidateQueries({ queryKey: ["getAllWorks"] });
    },
  });

  const directionQuery = useStaticQuery(graphql`
    query {
      allDirectionsJson {
        edges {
          node {
            slug
            title
            works {
              title
              slug
            }
          }
        }
      }
    }
  `);

  const directions = directionQuery.allDirectionsJson.edges;

  const direction = directions.find(
    (item) => item.node.slug === data.direction
  ).node;

  const directionName = direction.title;
  const themeName = direction.works.find(
    (item) => item.slug === data.theme
  ).title;

  const isDifferent = !(data.link === link);
  const isLoading = editWorkMutation.isLoading || isFetchingWorks;

  const closeEdit = () => {
    setLink(data.link);
    setEdited(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <p className={styles.title}>
          {directionName} / {themeName}
        </p>
        <p className={styles.text}>{data.name}</p>
      </div>
      <div className={styles.block}>
        <div className={cx(styles.editlink, edited && styles.edited)}>
          <div className={styles.link}>
            {!edited && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.title}
              >
                Ссылка на работу
              </motion.p>
            )}
            <motion.input
              layout="position"
              placeholder="Ссылка"
              disabled={!edited}
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          {edited ? (
            isDifferent ? (
              <button
                className={cx(
                  global.buttoncenter,
                  styles.save,
                  isDifferent && styles.active
                )}
                disabled={!isDifferent || isLoading}
                onClick={() =>
                  editWorkMutation.mutate({ id: data.id, link: link })
                }
              >
                {isLoading ? (
                  <>
                    <p>Сохраняем</p>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.25, repeat: Infinity }}
                      className={global.load}
                      key="loading_save"
                    >
                      <IoSyncOutline />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <p className={global.text}>Сохранить</p>
                    <IoCheckmarkSharp className={global.icon} />
                  </>
                )}
              </button>
            ) : (
              <button
                className={cx(global.buttoncenter, styles.back)}
                onClick={() => closeEdit()}
              >
                <p className={global.text}>Закрыть</p>
                <IoCloseOutline className={global.icon} />
              </button>
            )
          ) : (
            <button
              className={cx(global.buttoncenter, styles.edit)}
              onClick={() => setEdited(true)}
            >
              <p className={global.text}>Изменить</p>
              <IoCreateOutline className={global.icon} />
            </button>
          )}
        </div>
      </div>
      <a
        href={data.link}
        target="_blank"
        className={cx(global.buttoncenter, styles.open)}
      >
        <p className={global.text}>Открыть</p>
        <IoOpenOutline className={global.icon} />
      </a>
    </div>
  );
}

export default Linkwork;
