import React from "react";

import s from "./Home.module.scss";

import Button from "../../common/Button/Button";
import FilmList from "../../common/FilmList/FilmList";

const Home = () => {
  return (
    <div className={s.home}>
      <h1>Film Dashboard</h1>
      <div className={s.block}>
        <Button value={"Add"} />
      </div>
      <FilmList />
    </div>
  );
};

export default Home;
