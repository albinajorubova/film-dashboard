import React from "react";

import s from "./Button.module.scss";

const Button = ({ value }) => {
  return <button className={s.button}>{value}</button>;
};

export default Button;
