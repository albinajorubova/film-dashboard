import React, { useMemo, useCallback, useState } from "react";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import s from "./Form.module.scss";

import Input from "./Input/Input";
import Button from "../Button/Button";

const Form = ({ closeModal }) => {
  const SCHEMA = yup.object().shape({
    Title: yup
      .string()
      .required("Enter the title")
      .min(1, "Minimum 1 character"),
    Genre: yup
      .string()
      .required("Please select a genre")
      .notOneOf([""], "Genre not selected"),
    Year: yup
      .number()
      .transform((value, originalValue) =>
        originalValue.trim() === "" ? undefined : value
      )
      .required("Please specify the year")
      .min(1888, "Year cannot be earlier than 1888")
      .max(new Date().getFullYear(), "Year cannot be in the future"),
    Director: yup
      .string()
      .required("Enter the director's name")
      .min(3, "Minimum 3 characters")
      .matches(/^[A-Za-zА-Яа-я\s]+$/, "Only letters and spaces are allowed"),
    Description: yup
      .string()
      .required("Enter a description")
      .min(10, "Minimum 10 characters"),
    Photo: yup
      .mixed()
      .required("You need to provide a file")
      .test("fileSize", "File is too large", (value) => {
        return value && value[0] && value[0].size <= 20000000;
      })
      .test("fileType", "Only JPG or PNG files are allowed", (value) => {
        return value && ["image/jpeg", "image/png"].includes(value[0]?.type);
      }),
  });

  const DATA = useMemo(
    () => [
      {
        label: "Title",
        type: "text",
        placeholder: "Enter the movie title",
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
      },
      {
        label: "Year",
        type: "number",
        placeholder: "Enter the year",
      },
      {
        label: "Director",
        type: "text",
        placeholder: "Enter the director's name",
      },
      {
        label: "Description",
        type: "textarea",
        placeholder: "Enter the movie description",
      },
      {
        label: "Photo",
        type: "file",
      },
    ],
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
  } = useForm({
    resolver: yupResolver(SCHEMA),
  });

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

  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files[0];
      setValue("Photo", event.target.files);

      SCHEMA.validateAt("Photo", { Photo: event.target.files })
        .then(() => {
          setPhoto(URL.createObjectURL(file));
        })
        .catch((err) => {
          setError("Photo", { type: "manual", message: err.message });
        });
    },
    [setValue, setPhoto, setError]
  );

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
