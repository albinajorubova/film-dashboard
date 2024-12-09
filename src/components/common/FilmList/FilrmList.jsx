import React, { memo, useState, useEffect, useCallback } from "react";

import FilmItem from "../FilmItem/FilmItem";
import Modal from "../Modal/Modal";
import FilmView from "../FilmView/FilmView";
import Form from "../Form/Form";

const FilmList = memo(() => {
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    const filmData = localStorage.getItem("filmData");
    setFilms(filmData ? JSON.parse(filmData) : []);
  }, []);

  const openModal = useCallback((film, type, index) => {
    setSelectedFilm({ ...film, index });
    setModalType(type);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedFilm(null);
    setModalType(null);
  }, []);

  return (
    <>
      {films.length > 0 ? (
        films.map((film, index) => (
          <FilmItem
            key={index}
            index={index}
            film={film}
            onClick={openModal}
            isSelected={selectedFilm?.index}
            modalType={modalType}
          />
        ))
      ) : (
        <p>No available films.</p>
      )}

      {selectedFilm && modalType === "view" && (
        <Modal
          active={!!selectedFilm}
          closeModal={closeModal}
          content={<FilmView film={selectedFilm} closeModal={closeModal} />}
        />
      )}

      {selectedFilm && modalType === "edit" && (
        <Modal
          active={!!selectedFilm}
          closeModal={closeModal}
          content={
            <Form
              film={selectedFilm}
              index={selectedFilm.index}
              closeModal={closeModal}
              titile="Edit film"
              editForm={true}
            />
          }
        />
      )}
    </>
  );
});

export default FilmList;
