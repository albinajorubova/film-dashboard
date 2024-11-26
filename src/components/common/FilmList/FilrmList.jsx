import React, { memo, useState, useEffect, useCallback } from "react";

import FilmItem from "../FilmItem/FilmItem";
import Modal from "../Modal/Modal";
import FilmView from "../FilmView/FilmView";

const FilmList = memo(() => {
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);

  useEffect(() => {
    const filmData = localStorage.getItem("filmData");
    setFilms(filmData ? JSON.parse(filmData) : []);
  }, []);

  const openModal = useCallback((film) => {
    setSelectedFilm(film);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedFilm(null);
  }, []);

  return (
    <>
      {films.length > 0 ? (
        films.map((film, index) => (
          <FilmItem
            key={index}
            film={film}
            onClick={openModal}
            isSelected={selectedFilm === film}
          />
        ))
      ) : (
        <p>No available films.</p>
      )}

      {selectedFilm && (
        <Modal
          active={!!selectedFilm}
          closeModal={closeModal}
          content={<FilmView film={selectedFilm} closeModal={closeModal} />}
        />
      )}
    </>
  );
});

export default FilmList;
