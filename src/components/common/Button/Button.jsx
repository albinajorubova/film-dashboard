import React from "react";
import PropTypes from "prop-types";

import s from "./Button.module.scss";

const Button = ({ value, btnFunc, type }) => {
  return (
    <button className={s.root} onClick={btnFunc} type={type}>
      {value}
    </button>
  );
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  btnFunc: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default Button;
