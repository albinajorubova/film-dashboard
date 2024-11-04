import React from "react";
import cx from "classnames";

import s from "./Modal.module.scss";

const Modal = ({ content, active, setActive, closeModal }) => {
  return (
    <div
      className={cx(s.modal, { [s.active]: active })}
      onClick={() => setActive(false)}
    >
      <div
        className={cx(s.content, { [s.active]: active })}
        onClick={(e) => e.stopPropagation()}
      >
        {content}
        <button className={s.button} onClick={closeModal}>
          x
        </button>
      </div>
    </div>
  );
};

export default Modal;
