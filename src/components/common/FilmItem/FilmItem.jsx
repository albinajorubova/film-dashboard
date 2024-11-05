import React, { memo } from "react";

import img from "../../../img/sonnaya.jpg";

import s from "./FilmItem.module.scss";

const FilmItem = memo(() => {
  const filmData = localStorage.getItem("filmData");
  const films = filmData ? JSON.parse(filmData) : [];
  console.log(films);
  return (
    <>
      {films.length > 0 ? (
        films.map((film, index) => (
          <div className={s.block} key={index}>
            <img src={img} alt={"filmname"} className={s.image} />
            <div className={s.data}>
              <p className={s.title}>
                {film.Title} <span className={s.span}>{film.Year}</span>
              </p>
              <p className={s.gener}>
                genre: <span className={s.span}>{film.Genre}</span>
              </p>
            </div>
            <div className={s.buttonView}>
              <button className={s.button} />
            </div>
          </div>
        ))
      ) : (
        <p className={s.noFilms}>No available films.</p>
      )}
    </>
  );
});

export default FilmItem;
