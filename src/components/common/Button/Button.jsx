import React from "react";

import cx from "classnames";

import s from "./Button.module.scss";

const Button = ({ value, btnFunc, type }) => {
  return (
    <button
      className={cx(s.button, {
        [s.submit]: type === "submit",
        [s.reset]: type === "reset",
      })}
      onClick={btnFunc}
      type={type}
    >
      {value}
    </button>
  );
};

export default Button;
