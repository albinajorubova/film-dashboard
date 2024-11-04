import React from "react";

import s from "./Button.module.scss";

const Button = ({ value, btnFunc }) => {
  return (
    <button className={s.button} onClick={btnFunc}>
      {value}
    </button>
  );
};

export default Button;
