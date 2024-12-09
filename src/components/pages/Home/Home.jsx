import React, { useState, useCallback } from "react";

import s from "./Home.module.scss";

import Button from "../../common/Button/Button";
import FilmList from "../../common/FilmList/FilrmList";
import Modal from "../../common/Modal/Modal";
import Form from "../../common/Form/Form";

const Home = () => {
  const [modalActive, setModalActive] = useState(false);
  const openModal = useCallback(() => {
    setModalActive(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalActive(false);
  }, []);

  return (
    <div className={s.root}>
      <h1 className={s.titile}>Film Dashboard</h1>
      <div className={s.block}>
        <Button type="button" value="Add" btnFunc={openModal} />
      </div>
      <div className={s.list}>
        <FilmList />
      </div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        closeModal={closeModal}
        content={<Form closeModal={closeModal} titile="Add film" />}
      />
    </div>
  );
};

export default Home;
