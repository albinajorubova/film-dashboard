import React from "react";
import PropTypes from "prop-types";

import { Controller } from "react-hook-form";
import Select from "react-select";

import s from "./Input.module.scss";

const Input = ({
  label,
  type,
  placeholder,
  register,
  required,
  control,
  options,
}) => {
  const inputId = `input-${label.replace(/\s+/g, "-").toLowerCase()}`;

  if (type === "textarea") {
    return (
      <div className={s.block}>
        <label htmlFor={inputId} className={s.label}>
          {label}
        </label>
        <textarea
          id={inputId}
          className={s.input}
          placeholder={placeholder}
          {...register(label, { required })}
        />
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className={s.block}>
        <label htmlFor={inputId} className={s.label}>
          {label}
        </label>
        <Controller
          name={label}
          control={control}
          rules={{ required }}
          render={({ field }) => (
            <Select
              {...field}
              id={inputId}
              options={options}
              isMulti
              classNamePrefix="select"
              className={s.select}
              placeholder={placeholder}
            />
          )}
        />
      </div>
    );
  }

  return (
    <div className={s.block}>
      <label htmlFor={inputId} className={s.label}>
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        className={s.input}
        placeholder={placeholder}
        {...register(label, { required })}
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
      isPlaceholder: PropTypes.bool,
    })
  ),
};

export default Input;
