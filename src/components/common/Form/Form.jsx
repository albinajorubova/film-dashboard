import React, { useMemo, useCallback, useState } from "react";

import { useForm } from "react-hook-form";

import s from "./Form.module.scss";

import Input from "./Input/Input";
import Button from "../Button/Button";

const Form = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const DATA = useMemo(
    () => [
      {
        label: "Title",
        type: "text",
        placeholder: "Enter the movie title",
        required: true,
        validationRules: {
          required: { value: true, message: "Enter the title" },
          minLength: { value: 1, message: "Minimum 1 character" },
        },
      },
      {
        label: "Genre",
        type: "select",
        options: [
          { value: "", label: "Select genre", isPlaceholder: true },
          { value: "Comedy", label: "Comedy" },
          { value: "Drama", label: "Drama" },
          { value: "Fantasy", label: "Fantasy" },
          { value: "Action", label: "Action" },
          { value: "Horror", label: "Horror" },
          { value: "Thriller", label: "Thriller" },
          { value: "Detective", label: "Detective" },
        ],
        required: true,
        validationRules: {
          required: { value: true, message: "Please select a genre" },
          validate: (value) => value !== "" || "Genre not selected",
        },
      },
      {
        label: "Year",
        type: "number",
        placeholder: "Enter the year",
        required: true,
        validationRules: {
          required: { value: true, message: "Please specify the year" },
          min: { value: 1888, message: "Year cannot be earlier than 1888" },
          max: {
            value: new Date().getFullYear(),
            message: "Year cannot be in the future",
          },
        },
      },
      {
        label: "Director",
        type: "text",
        placeholder: "Enter the director's name",
        required: true,
        validationRules: {
          required: { value: true, message: "Enter the director's name" },
          minLength: { value: 3, message: "Minimum 3 characters" },
          pattern: {
            value: /^[A-Za-zА-Яа-я\s]+$/,
            message: "Only letters and spaces are allowed",
          },
        },
      },
      {
        label: "Description",
        type: "textarea",
        placeholder: "Enter the movie description",
        required: true,
        validationRules: {
          required: { value: true, message: "Enter a description" },
          minLength: { value: 10, message: "Minimum 10 characters" },
        },
      },
      {
        label: "Photo",
        type: "file",
        placeholder: "",
        required: true,
        validationRules: {
          required: { value: true, message: "Please upload a photo" },
          fileType: {
            value: ["image/jpeg", "image/png"],
            message: "Only JPG or PNG files are allowed",
          },
        },
      },
    ],
    []
  );

  const [photo, setPhoto] = useState(null);

  const onSubmit = (data) => {
    const photoData = {
      ...data,
      photo: photo,
    };

    const filmData = localStorage.getItem("filmData");
    const storedFilms = filmData ? JSON.parse(filmData) : [];
    storedFilms.push(photoData);
    localStorage.setItem("filmData", JSON.stringify(storedFilms));
    window.location.reload();
    reset();
    closeModal();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const urlImage = URL.createObjectURL(file);
    setPhoto(urlImage);
  };

  const handleReset = useCallback(() => {
    reset();
    setPhoto(null);
  }, [reset]);

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={s.titleForm}>Add Film</h1>
      <div className={s.block}>
        {DATA.map((field) => (
          <Input
            key={field.label}
            {...field}
            register={register}
            errors={errors}
            onChange={field.type === "file" ? handleFileChange : undefined}
            photo={photo}
          />
        ))}
      </div>
      <div className={s.btnsBlock}>
        <Button type={"submit"} value={"Save"} />
        <Button type={"reset"} value={"Reset"} onClick={handleReset} />
      </div>
    </form>
  );
};

export default Form;
