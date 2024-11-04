import React from "react";
import { useForm } from "react-hook-form";

import s from "./Form.module.scss";

import Input from "./Input/Input";

const Form = () => {
  const { register, control, handleSubmit } = useForm();

  const DATA = [
    {
      label: "Название",
      type: "text",
      placeholder: "Название фильма",
      required: true,
    },
    {
      label: "Жанр",
      type: "select",
      options: [
        { value: "Комедия", label: "Комедия" },
        { value: "Драма", label: "Драма" },
        { value: "Фантастика", label: "Фантастика" },
        { value: "Боевик", label: "Боевик" },
        { value: "Хоррор", label: "Хоррор" },
        { value: "Триллер", label: "Триллер" },
        { value: "Детектив", label: "Детектив" },
      ],
      required: true,
    },
    {
      label: "Год",
      type: "date",
      placeholder: "ДД.ММ.ГГГГ",
      required: true,
    },
    {
      label: "Режиссер",
      type: "text",
      placeholder: "Режиссер фильма",
      required: true,
    },
    {
      label: "Описание",
      type: "textarea",
      placeholder: "Описание фильма",
      required: true,
    },
  ];

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={s.titleForm}>Добавить фильм</h1>
      <div className={s.block}>
        {DATA.map((field) => (
          <Input
            key={field.label}
            {...field}
            register={register}
            control={control}
          />
        ))}
        <div className={s.photoBtn}>
          <label className={s.label}>Добавить фото</label>
          <button type="button">добавить</button>
        </div>
      </div>

      <button type="submit">Отправить</button>
    </form>
  );
};

export default Form;
