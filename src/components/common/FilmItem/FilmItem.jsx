import React, { memo } from "react";
import PropTypes from "prop-types";

import s from "./FilmItem.module.scss";

import IconBtn from "../IconBtn/IconBtn";

const FilmItem = memo(({ film, onClick, isSelected, modalType, index }) => {
  const { Title, Year, Genre, photo } = film;

  return (
    <div className={s.root}>
      <img src={photo} alt={Title} className={s.image} />

      <div className={s.data}>
        <p className={s.title}>
          {Title} <span className={s.span}>{Year}</span>
        </p>
        <p className={s.gener}>
          Genre: <span className={s.span}>{Genre}</span>
        </p>
      </div>

      <div className={s.iconBtns}>
        <IconBtn
          onClick={() => onClick(film, "view", index)}
          isActive={modalType === "view" && isSelected === index}
          ClassName="Eye"
        />
        <IconBtn
          onClick={() => onClick(film, "edit", index)}
          isActive={modalType === "edit" && isSelected === index}
          ClassName="Edit"
        />
      </div>
    </div>
  );
});

FilmItem.propTypes = {
  film: PropTypes.shape({
    photo: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.number.isRequired,
    Genre: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.number,
  modalType: PropTypes.string,
};

export default FilmItem;
