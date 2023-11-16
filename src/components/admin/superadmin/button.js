import React from "react";
import cx from "classname";
import { IoAddOutline, IoCreateOutline } from "react-icons/io5";

import * as global from "../../../styles/base/global.module.scss";

function Button({ isExpert, openModal }) {
  return isExpert ? (
    <button
      className={cx(global.buttoncenter, global.buttongreen)}
      onClick={() => openModal()}
    >
      <IoCreateOutline className={global.icon} />
      <p className={global.text}>Редактировать</p>
    </button>
  ) : (
    <button
      className={cx(global.buttoncenter, global.buttonbeige)}
      onClick={() => openModal()}
    >
      <IoAddOutline className={global.icon} />
      <p className={global.text}>Добавить</p>
    </button>
  );
}

export default Button;
