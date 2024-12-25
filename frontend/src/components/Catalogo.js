import React, { useState, useEffect } from 'react';
import '../App.css';
import TMDbButton from './FilmSelection';
import { Link } from 'react-router-dom';

function Catalogo({ isAuthenticated }) {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredFilms, setFilteredFilms] = useState([]);

  useEffect(() => {
    const apiURL = 'https://ghibli.rest/films';
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud: ' + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setFilteredFilms(data.sort((a, b) => a.release_date - b.release_date));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al consumir la API:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <header>
        <h1>{loading ? 'Loading...' : 'Películas de Studio Ghibli'}</h1>
      </header>
      <div className="film-grid">
        {!loading &&
          filteredFilms.map((film) => (
            <Link
              to={`/film/${film.id}`}
              key={film.id}
              className="film-card"
              state={{ film }}
            >
              <img src={film.image} alt={film.title} className="film-image" />
              <h2>{film.title}</h2>
            </Link>
          ))}
      </div>
      {isAuthenticated && <TMDbButton />}
    </div>
  );
}

export default Catalogo;