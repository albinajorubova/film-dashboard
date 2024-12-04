import React, { memo } from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import s from "./IconBtn.module.scss";

const IconBtn = memo(({ onClick, isActive, ClassName }) => {
  return (
    <button
      onClick={onClick}
      className={cx(s.root, s[`default${ClassName}`], {
        [s[`active${ClassName}`]]: isActive,
      })}
    />
  );
});

IconBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  isActive: PropTypes.bool,
  activeClass: PropTypes.string,
  defaultClass: PropTypes.string,
};

export default IconBtn;
