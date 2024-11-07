import React, { memo, useCallback, useState } from "react";
import cx from "classnames";

import s from "./FilmItem.module.scss";

import Modal from "../Modal/Modal";
import FilmView from "../FilmView/FilmView";

const FilmItem = memo(() => {
  const filmData = localStorage.getItem("filmData");
  const films = filmData ? JSON.parse(filmData) : [];

  const [modalActive, setModalActive] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);

  const openModal = useCallback((film) => {
    setSelectedFilm(film);
    setModalActive(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalActive(false);
    setSelectedFilm(null);
  }, []);

  return (
    <>
      {films.length > 0 ? (
        films.map((film, index) => (
          <div className={s.block} key={index}>
            <img src={film.photo} alt="film photo" className={s.image} />

            <div className={s.data}>
              <p className={s.title}>
                {film.Title} <span className={s.span}>{film.Year}</span>
              </p>
              <p className={s.gener}>
                genre: <span className={s.span}>{film.Genre}</span>
              </p>
            </div>

            <div className={s.buttonView}>
              <button
                onClick={() => openModal(film)}
                className={cx(s.button, {
                  [s.openEye]: selectedFilm === film,
                })}
              />
            </div>
          </div>
        ))
      ) : (
        <p className={s.noFilms}>No available films.</p>
      )}

      {selectedFilm && (
        <Modal
          setActive={setModalActive}
          active={modalActive}
          closeModal={closeModal}
          content={<FilmView film={selectedFilm} closeModal={closeModal} />}
        />
      )}
    </>
  );
});

export default FilmItem;
