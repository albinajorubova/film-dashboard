import React from "react";

import s from "./FilmView.module.scss";

const FilmView = ({ film }) => {
  return (
    <div className={s.block}>
      <img src={film.photo} alt={film.title} className={s.img} />
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

export default FilmView;
