import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import s from "./Input.module.scss";

const Input = ({
  label,
  type,
  placeholder,
  register,
  required,
  options,
  validationRules = {},
  errors,
  inputProps,
}) => {
  const inputId = `input-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const error = errors?.[label]?.message;

  if (type === "textarea") {
    return (
      <div className={s.block}>
        <label htmlFor={inputId} className={s.label}>
          {label}
          {error && <p className={s.errorText}>({error})*</p>}
        </label>
        <textarea
          id={inputId}
          className={cx(s.input, s.textarea, { [s.error]: error })}
          placeholder={placeholder}
          {...register(label, { required, ...validationRules })}
        />
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className={cx(s.block, s.arrow)}>
        <label htmlFor={inputId} className={s.label}>
          {label}
          {error && <p className={s.errorText}>({error})*</p>}
        </label>
        <select
          id={inputId}
          name={label}
          className={cx(s.input, s.select, { [s.error]: error })}
          {...register(label, validationRules)}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className={option.isPlaceholder ? s.hide : undefined}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className={s.block}>
      <label htmlFor={inputId} className={s.label}>
        {label}
        {error && <p className={s.errorText}>({error})*</p>}
      </label>
      <input
        id={inputId}
        type={type}
        className={`${s.input} ${error ? s.error : ""}`}
        placeholder={placeholder}
        {...register(label, { required, ...validationRules })}
        {...inputProps}
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool,
  control: PropTypes.object,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  validationRules: PropTypes.object,
  errors: PropTypes.object,
};

export default Input;
