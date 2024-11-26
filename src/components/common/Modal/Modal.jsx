import React, { memo } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import s from "./Modal.module.scss";

const Modal = memo(({ content, active, closeModal }) => {
  return (
    <div className={cx(s.root, { [s.active]: active })} onClick={closeModal}>
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
});

Modal.propTypes = {
  content: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
