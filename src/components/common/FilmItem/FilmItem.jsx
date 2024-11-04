import React from "react";

import img from "../../../img/sonnaya.jpg";

import s from "./FilmItem.module.scss";
import ButtonView from "../ButtonView/ButtonView";

const FilmItem = () => {
  return (
    <div className={s.block}>
      <img src={img} alt={"filmname"} className={s.image} />
      <div className={s.data}>
        <p className={s.titile}>
          title <span className={s.span}>date</span>
        </p>
        <p className={s.gener}>
          gener: <span className={s.span}>text</span>
        </p>
      </div>
      <div className={s.buttonView}>
        <ButtonView />
      </div>
    </div>
  );
};

export default FilmItem;
