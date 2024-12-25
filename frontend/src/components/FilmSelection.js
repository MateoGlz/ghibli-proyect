// FilmSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FilmSelection = () => {
  const navigate = useNavigate();

  const goToCatalogo = () => {
    navigate('../Catalogo'); // Redirige a la ruta '/catalogo' para Studio Ghibli
  };

  const goToContemporaneas = () => {
    navigate('../FilmDetail'); 
  };

  return (
    <div className="film-selection">
      <h2>Sección de Películas</h2>
      <button onClick={goToCatalogo} className="tmdb-button">
        Studio Ghibli
      </button>
      <button onClick={goToContemporaneas} className="tmdb-button">
        Contemporáneas
      </button>
    </div>
  );
};

export default FilmSelection;
