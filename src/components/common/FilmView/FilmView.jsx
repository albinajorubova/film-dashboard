import React from "react";
import PropTypes from "prop-types";

import s from "./FilmView.module.scss";

const FilmView = ({ film }) => {
  const { title, photo } = film;
  return (
    <div className={s.root}>
      <img src={photo} alt={title} className={s.img} />
      <div className={s.text}>
        {Object.entries(film).map(([key, value]) =>
          key !== "photo" && typeof value !== "object" ? (
            <p key={key} className={s.prop}>
              {key}: <span className={s.value}>{value}</span>
            </p>
          ) : null
        )}
      </div>
    </div>
  );
};

FilmView.propTypes = {
  film: PropTypes.object.isRequired,
};

export default FilmView;
