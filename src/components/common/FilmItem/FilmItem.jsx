import React, { memo } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import s from "./FilmItem.module.scss";

const FilmItem = memo(({ film, onClick, isSelected }) => {
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

      <div className={s.buttonView}>
        <button
          onClick={() => onClick(film)}
          className={cx(s.button, {
            [s.openEye]: isSelected,
          })}
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
  isSelected: PropTypes.bool.isRequired,
};

export default FilmItem;
