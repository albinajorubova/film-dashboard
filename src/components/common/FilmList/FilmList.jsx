import React from "react";

import s from "./FilmList.module.scss";

import FilmItem from "../FilmItem/FilmItem";

const FilmList = () => {
  return (
    <div className={s.block}>
      <FilmItem />
    </div>
  );
};

export default FilmList;
