import React, { useState, useCallback } from "react";

import s from "./Home.module.scss";

import Button from "../../common/Button/Button";
import FilmList from "../../common/FilmList/FilmList";
import Modal from "../../common/Modal/Modal";
import Form from "../../common/Form/Form";

const Home = () => {
  const [modalActive, setModalActive] = useState(false);
  const openModal = useCallback(() => {
    setModalActive(true);
  }, []);

  return (
    <div className={s.home}>
      <h1 className={s.titile}>Film Dashboard</h1>
      <div className={s.block}>
        <Button type={"button"} value={"Add"} btnFunc={openModal} />
      </div>
      <FilmList />
      <Modal
        active={modalActive}
        setActive={setModalActive}
        closeModal={() => {
          setModalActive(false);
        }}
        content={<Form closeModal={() => setModalActive(false)} />}
      />
    </div>
  );
};

export default Home;
