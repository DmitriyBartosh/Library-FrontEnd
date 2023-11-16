import React from "react";
import Editlink from "./editlink";
import Addlink from "./addlink";
import Modal from "../modal";

import * as styles from "./addwork.module.scss";

function Addwork(props) {
  const { theme, direction } = props.pageContext;
  const { html, frontmatter } = props.checklist;
  const { selected } = props;

  return (
    <Modal visible={props.visible} close={props.close}>
      <div className={styles.content}>
        <h3 className={styles.title}>Чек-лист для проверки</h3>
        <div
          className={styles.checklist}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      <div className={styles.works}>
        {props.thereIsWork ? (
          props.relatedwork.map((item, index) => {
            return (
              item.name === selected.title && (
                <Editlink data={item} key={index} />
              )
            );
          })
        ) : (
          <Addlink
            direction={direction}
            theme={theme}
            hint={frontmatter.hint}
            title={frontmatter.title}
          />
        )}
      </div>
    </Modal>
  );
}

export default Addwork;
