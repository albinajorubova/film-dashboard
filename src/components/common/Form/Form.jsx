import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import s from "./Form.module.scss";

import Input from "./Input/Input";
import Button from "../Button/Button";

const DATA = [
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
];

const SCHEMA = yup.object().shape({
  Title: yup.string().required("Enter the title").min(1, "Minimum 1 character"),
  Genre: yup
    .string()
    .required("Please select a genre")
    .notOneOf([""], "Genre not selected"),
  Year: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : Number(originalValue);
    })
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
    .test("fileRequired", "You need to provide a file", (value, context) => {
      if (context.parent.isEditing) return true;
      return value && value.length > 0;
    })
    .test("fileSize", "File is too large", (value, context) => {
      if (context.parent.isEditing) return true;
      return value && value[0] && value[0].size <= 2000000;
    })
    .test("fileType", "Only JPG or PNG files are allowed", (value, context) => {
      if (context.parent.isEditing) return true;
      return value && ["image/jpeg", "image/png"].includes(value[0]?.type);
    }),
});

const Form = ({ closeModal, film, titile, index }) => {
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

  useEffect(() => {
    if (film) {
      const { Title, Year, Genre, Director, Description } = film;
      reset({
        Title: Title || "",
        Genre: Genre || "",
        Year: Year || "",
        Director: Director || "",
        Description: Description || "",
        photo: film.photo || "",
        isEditing: Boolean(film),
      });
      setPhoto(film.photo || null);
      setValue("photo", film.photo || null);
    }
  }, [film, reset, setValue]);

  const [films, setFilms] = useState([]);

  useEffect(() => {
    const filmData = localStorage.getItem("filmData");
    if (filmData) {
      setFilms(JSON.parse(filmData));
    }
  }, []);

  const saveFilms = (films) => {
    localStorage.setItem("filmData", JSON.stringify(films));
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const onSubmit = (data) => {
    const photoData = {
      ...data,
      photo: photo,
    };
    const storedFilms = [...films];
    if (film) {
      storedFilms[index] = { ...storedFilms[index], ...photoData };
    } else {
      storedFilms.push(photoData);
    }
    saveFilms(storedFilms);
    reset();
    closeModal();
    reloadPage();
  };

  const handleFileChange = useCallback(
    async (event) => {
      const file = event.target.files[0];
      setValue("Photo", event.target.files);

      try {
        await SCHEMA.validateAt("Photo", { Photo: event.target.files });
      } catch (err) {
        setError("Photo", { type: "manual", message: err.message });
        return;
      }

      getBase64(file)
        .then((base64) => {
          localStorage.setItem("fileBase64", base64);
          setPhoto(base64);
        })
        .catch((err) => {
          setError("Photo", { type: "manual", message: err.message });
        });
    },
    [setValue, setPhoto, setError]
  );

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleReset = useCallback(() => {
    reset();
    setPhoto(null);
  }, [reset]);

  const handleDelete = useCallback(() => {
    const storedFilms = [...films];
    const updatedFilms = storedFilms.filter((_, idx) => idx !== index);
    saveFilms(updatedFilms);
    closeModal();
    reloadPage();
  }, [closeModal, index, films]);

  return (
    <form className={s.root} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={s.titleForm}>{titile}</h1>
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
        <Button type="submit" value="Save" />
        {film ? (
          <Button type="reset" value="Delete" btnFunc={handleDelete} />
        ) : (
          <Button type="reset" value="Reset" btnFunc={handleReset} />
        )}
      </div>
    </form>
  );
};

Form.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default Form;
